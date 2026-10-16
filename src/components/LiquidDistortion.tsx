"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotionPreference } from "@/lib/use-media-query";

const VERTEX = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = vec2(aPosition.x * 0.5 + 0.5, 0.5 - aPosition.y * 0.5);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uStrength;
uniform float uAspect;
uniform float uRadius;
uniform vec2 uCoverScale;
void main() {
  vec2 delta = vUv - uMouse;
  delta.x *= uAspect;
  float falloff = exp(-dot(delta, delta) / (uRadius * uRadius));
  vec2 bulge = delta * falloff * 0.3 * uStrength;
  bulge.x /= uAspect;
  vec2 drag = uVelocity * falloff * uStrength;
  vec2 uv = vUv - bulge - drag;
  uv = (uv - 0.5) * uCoverScale + 0.5;
  gl_FragColor = texture2D(uTexture, clamp(uv, 0.0, 1.0));
}`;

const RADIUS = 0.28;
const MAX_DRAG = 0.09;
const DRAG_GAIN = 0.022;
const SPRING = 9;

type Renderer = {
  gl: WebGLRenderingContext;
  uniforms: Record<"mouse" | "velocity" | "strength" | "aspect" | "radius" | "cover", WebGLUniformLocation | null>;
  imageAspect: number;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function createRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): Renderer | null {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false });
  if (!gl) return null;
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  return {
    gl,
    imageAspect: image.naturalWidth / image.naturalHeight,
    uniforms: {
      mouse: uniform("uMouse"),
      velocity: uniform("uVelocity"),
      strength: uniform("uStrength"),
      aspect: uniform("uAspect"),
      radius: uniform("uRadius"),
      cover: uniform("uCoverScale"),
    },
  };
}

function LiquidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const source = host?.querySelector<HTMLImageElement>("img");
    if (!canvas || !host || !source) return;

    let renderer: Renderer | null = null;
    let loading: Promise<void> | null = null;
    let frame = 0;
    let last = 0;
    let hovering = false;
    let pointer = { x: 0, y: 0 };
    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    const velocity = { x: 0, y: 0 };
    let strength = 0;
    let strengthVelocity = 0;

    const release = () => {
      renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext();
      renderer = null;
      loading = null;
    };

    const resize = () => {
      if (!renderer) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(host.clientWidth * dpr));
      const height = Math.max(1, Math.round(host.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const { gl, uniforms, imageAspect } = renderer;
      const aspect = width / height;
      gl.viewport(0, 0, width, height);
      gl.uniform1f(uniforms.aspect, aspect);
      gl.uniform1f(uniforms.radius, RADIUS);
      gl.uniform2f(uniforms.cover, aspect > imageAspect ? 1 : aspect / imageAspect, aspect > imageAspect ? imageAspect / aspect : 1);
    };

    const ensureRenderer = () => {
      if (renderer || loading) return loading;
      const src = source.currentSrc || source.src;
      if (!src || (source.complete && source.naturalWidth === 0)) return null;
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = src;
      loading = image
        .decode()
        .then(() => {
          if (!loading) return;
          renderer = createRenderer(canvas, image);
          resize();
          schedule();
        })
        .catch(() => {
          loading = null;
        });
      return loading;
    };

    const updateTarget = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return false;
      target.x = (pointer.x - rect.left) / rect.width;
      target.y = (pointer.y - rect.top) / rect.height;
      return target.x >= 0 && target.x <= 1 && target.y >= 0 && target.y <= 1;
    };

    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min((now - (last || now)) / 1000 || 1 / 60, 1 / 30);
      last = now;

      const follow = 1 - Math.exp(-dt * 14);
      const previous = { x: mouse.x, y: mouse.y };
      mouse.x += (target.x - mouse.x) * follow;
      mouse.y += (target.y - mouse.y) * follow;

      const smoothing = 1 - Math.exp(-dt * 8);
      velocity.x += (((mouse.x - previous.x) / dt) * DRAG_GAIN - velocity.x) * smoothing;
      velocity.y += (((mouse.y - previous.y) / dt) * DRAG_GAIN - velocity.y) * smoothing;
      const speed = Math.hypot(velocity.x, velocity.y);
      if (speed > MAX_DRAG) {
        velocity.x *= MAX_DRAG / speed;
        velocity.y *= MAX_DRAG / speed;
      }

      const goal = hovering ? 1 : 0;
      strengthVelocity += (SPRING * SPRING * (goal - strength) - 2 * SPRING * strengthVelocity) * dt;
      strength += strengthVelocity * dt;

      if (renderer) {
        const { gl, uniforms } = renderer;
        gl.uniform2f(uniforms.mouse, mouse.x, mouse.y);
        gl.uniform2f(uniforms.velocity, velocity.x, velocity.y);
        gl.uniform1f(uniforms.strength, Math.max(0, strength));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        canvas.dataset.active = "true";
      }

      const settled =
        Math.abs(goal - strength) < 0.002 &&
        Math.abs(strengthVelocity) < 0.002 &&
        Math.hypot(target.x - mouse.x, target.y - mouse.y) < 0.0005 &&
        speed < 0.0005;

      if (!settled || !renderer) {
        schedule();
      } else if (!hovering) {
        delete canvas.dataset.active;
        last = 0;
      } else {
        last = 0;
      }
    };

    function schedule() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    const enter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer = { x: event.clientX, y: event.clientY };
      updateTarget();
      if (!hovering && strength < 0.01) {
        mouse.x = target.x;
        mouse.y = target.y;
        velocity.x = velocity.y = 0;
      }
      hovering = true;
      ensureRenderer();
      schedule();
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (!hovering) return enter(event);
      pointer = { x: event.clientX, y: event.clientY };
      updateTarget();
      schedule();
    };

    const leave = () => {
      hovering = false;
      schedule();
    };

    const scroll = () => {
      if (!hovering) return;
      if (!updateTarget()) leave();
      schedule();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      renderer = null;
      loading = null;
      delete canvas.dataset.active;
    });

    return () => {
      observer.disconnect();
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      release();
    };
  }, []);

  return <canvas ref={ref} className="liquid-canvas" aria-hidden="true" />;
}

export default function LiquidDistortion() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useReducedMotionPreference();
  return finePointer && !reduceMotion ? <LiquidCanvas /> : null;
}
