export default function ConceptMark({ className = "" }: { className?: string }) {
  return <span className={className ? `concept-mark ${className}` : "concept-mark"}>Concept</span>;
}
