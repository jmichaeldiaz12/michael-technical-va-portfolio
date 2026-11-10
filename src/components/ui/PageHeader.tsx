import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

export default function PageHeader({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-head-y">
      <Container>
        <h1 className="t-page max-w-3xl">{title}</h1>
        {lead && <div className="t-lead mt-6 space-y-4">{lead}</div>}
        {children}
      </Container>
    </section>
  );
}
