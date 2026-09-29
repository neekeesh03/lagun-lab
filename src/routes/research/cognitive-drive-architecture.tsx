import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site";
import { publications } from "@/data/content";

export const Route = createFileRoute("/research/cognitive-drive-architecture")({
  head: () => {
    const title = "Cognitive Drive Architecture — Lagun Lab";
    const description = "Cognitive Drive Architecture: a proposed framework on the conditions under which cognitive intention becomes sustained action, undergoing theoretical development and empirical evaluation.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "article" }, { property: "og:url", content: "/research/cognitive-drive-architecture" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/research/cognitive-drive-architecture" }],
    };
  },
  component: CDA,
});

type Tag = "PROPOSAL" | "HYPOTHESIS" | "EMPIRICAL RESULT" | "INTERPRETATION" | "OPEN QUESTION";
const sections: Array<{ t: string; tag?: Tag; d: string }> = [
  { t: "Overview", tag: "PROPOSAL", d: "CDA is a proposed framework undergoing theoretical development and empirical evaluation. It is not an established field, and its central claims, including Lagun’s Law, are not presented as conclusively validated." },
  { t: "Scientific problem", tag: "OPEN QUESTION", d: "People can understand a task, intend to act, and be able to act, yet still fail to begin or to persist. Under what conditions does an intended action begin, continue, change, or stop?" },
  { t: "Core constructs", tag: "PROPOSAL", d: "Construct definitions are being refined and will be documented with proposed operational measures before empirical claims depend on them." },
  { t: "Formal architecture", tag: "PROPOSAL", d: "The formal model specifies proposed relationships among constructs, boundary conditions, and competing predictions. Notation and assumptions are published alongside equations." },
  { t: "Predictions", tag: "HYPOTHESIS", d: "Predictions are separated into confirmatory hypotheses and exploratory expectations, and each identifies observations that would count against the proposal." },
  { t: "Measurement", d: "Measures are evaluated for construct validity, reliability, temporal resolution, and suitability for behavioral dynamics." },
  { t: "Evidence", tag: "EMPIRICAL RESULT", d: "No Lagun Lab empirical result on CDA is reported yet. Related foundational work by the founder is listed below and is not a Lab result." },
  { t: "Competing explanations", tag: "INTERPRETATION", d: "CDA is compared against established and alternative accounts of motivation, effort, and action control. Competing theories are not presumed incorrect." },
  { t: "Limitations", d: "Conceptual, measurement, and generalizability limits are documented alongside planned tests." },
  { t: "Active tests", d: "No formal Lagun Lab tests of CDA are registered yet." },
  { t: "Code & materials", d: "Code, data, protocols, and preregistrations will be linked when publicly available." },
];

function CDA() {
  const related = publications.filter((p) => p.tags.some((t) => ["Cognitive Drive Architecture", "Action initiation", "Threshold models"].includes(t)));
  return (
    <main>
      <PageHero eyebrow="RESEARCH PROGRAM / CDA" title="Cognitive Drive Architecture">
        A research program on the conditions under which cognitive intention becomes sustained action.
      </PageHero>
      <section className="page-section">
        <div className="mx-auto max-w-3xl">
          {sections.map((s, i) => (
            <section key={s.t} className="grid gap-4 border-t border-border py-7 md:grid-cols-[3rem_1fr]">
              <span className="text-xs text-highlight">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h2 className="text-2xl font-medium">{s.t}</h2>
                  {s.tag && <span className="border border-border px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted-foreground">{s.tag}</span>}
                </div>
                <p className="mt-3 leading-7 text-muted-foreground">{s.d}</p>
              </div>
            </section>
          ))}
          <section className="grid gap-4 border-t border-border py-7 md:grid-cols-[3rem_1fr]">
            <span className="text-xs text-highlight">{String(sections.length + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-2xl font-medium">Publications</h2>
              <p className="mt-3 text-sm text-muted-foreground">Foundational work by the founder, completed before Lagun Lab became a formal research affiliation.</p>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {related.map((p) => (
                  <li key={p.id} className="py-4">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.authors.join(", ")} · {p.venue} · {p.year} · {p.type}</p>
                  </li>
                ))}
              </ul>
              <Link to="/publications" className="mt-4 inline-block font-medium text-primary hover:underline">View all publications →</Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
