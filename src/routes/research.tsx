import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, PageHero } from "@/components/site";

export const Route = createFileRoute("/research")({
  head: () => {
    const title = "Research — Lagun Lab";
    const description = "Research areas at Lagun Lab: cognitive dynamics, computational and quantitative cognition, and theory testing with open science.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "website" }, { property: "og:url", content: "/research" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/research" }],
    };
  },
  component: Research,
});

const areas = [
  { id: "cognitive-dynamics", title: "Cognitive Dynamics", question: "How do cognitive states become behavior?", label: "Key questions",
    items: ["How does action begin?", "What produces persistence?", "What causes disengagement?", "How does recent behavior influence later behavior?", "How does attention interact with effort?"] },
  { id: "computational-quantitative-cognition", title: "Computational & Quantitative Cognition", question: "How can latent cognitive processes be represented and tested mathematically?", label: "Methods",
    items: ["Formal modeling", "Simulation", "Behavioral time-series analysis", "Statistical inference", "Secondary-data analysis", "Predictive modeling"] },
  { id: "theory-testing-open-science", title: "Theory Testing & Open Science", question: "What evidence would distinguish one explanation from another?", label: "Methods",
    items: ["Preregistration", "Construct validation", "Model comparison", "Replication", "Robustness analysis", "Reproducibility"] },
];

function Research() {
  return (
    <main>
      <PageHero eyebrow="RESEARCH / SCIENTIFIC DIRECTION" title="Research">
        Lagun Lab studies how cognition becomes action, combining questions about behavioral transitions with formal, computational, and transparent empirical methods.
      </PageHero>
      {areas.map((a, i) => (
        <section key={a.id} id={a.id} className="page-section border-b border-border">
          <div className="grid-12">
            <p className="eyebrow col-span-12 md:col-span-3">0{i + 1} / AREA</p>
            <div className="col-span-12 md:col-span-9">
              <h2 className="text-3xl font-medium lg:text-4xl">{a.title}</h2>
              <p className="mt-4 max-w-2xl text-xl leading-8 text-foreground">{a.question}</p>
              <p className="eyebrow mt-8">{a.label}</p>
              <ul className="mt-3 grid gap-px border border-border bg-border sm:grid-cols-2">
                {a.items.map((q) => <li key={q} className="bg-background px-5 py-4">{q}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <ArrowLink to="/projects">Related projects</ArrowLink>
                <span className="text-sm text-muted-foreground">No formal Lagun Lab projects are registered in this area yet.</span>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="page-section bg-secondary/50">
        <div className="grid-12">
          <p className="eyebrow col-span-12 md:col-span-3">FEATURED RESEARCH PROGRAM</p>
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-3xl font-medium lg:text-4xl">Cognitive Drive Architecture</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8">A proposed framework, undergoing theoretical development and empirical evaluation, on the conditions under which cognitive intention becomes sustained action.</p>
            <div className="mt-6"><ArrowLink to="/research/cognitive-drive-architecture">Explore CDA</ArrowLink></div>
          </div>
        </div>
      </section>
    </main>
  );
}
