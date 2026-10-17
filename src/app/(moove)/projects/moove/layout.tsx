import MooveNavbar from "@/components/projects/MooveNavbar";
import MooveFooter from "@/components/projects/MooveFooter";

export default function MooveLayout({ children }: LayoutProps<"/projects/moove">) {
  return (
    <>
      <MooveNavbar />
      {children}
      <MooveFooter />
    </>
  );
}
