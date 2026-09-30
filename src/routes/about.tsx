import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, NetworkMark, PageHero } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => {
    const title = "About — Lagun Lab";
    const description = "About Lagun Lab, an independent, distributed research organization studying cognitive and behavioral dynamics, administratively based in Kathmandu, Nepal.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "website" }, { property: "og:url", content: "/about" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: "/about" }],
    };
  },
  component: About,
});

const sections: Array<[string, string]> = [
  ["Mission", "To develop, test, and improve rigorous explanations of cognitive and behavioral dynamics through collaborative, transparent, and reproducible research."],
  ["What we study", "How cognition becomes action: action initiation, effort and persistence, cognitive control, behavioral dynamics, and the quantitative methods needed to test explanations of these processes."],
  ["Research model", "Distributed research allows contributors to participate across institutions and locations while working through shared research protocols, project structures, and scientific standards."],
  ["Organizational status", "Lagun Lab is administratively based in Kathmandu, Nepal. The Lab operates remotely and currently maintains no dedicated physical laboratory facilities. It is independently organized and is not formally affiliated with a university."],
  ["Canonical scholarly affiliation", "Lagun Lab, Kathmandu, Nepal"],
];

function About() {
  return (
    <main>
      <PageHero eyebrow="ABOUT / ORGANIZATION" title="About Lagun Lab">
        Lagun Lab is an independent, distributed research organization studying cognitive and behavioral dynamics through theoretical, computational, and quantitative methods.
      </PageHero>
      <section className="page-section">
        <div className="grid-12">
          <aside className="col-span-12 md:col-span-3">
            <NetworkMark />
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Distributed internationally<br />Administratively based in<br /><strong className="text-foreground">Kathmandu, Nepal</strong></p>
          </aside>
          <div className="col-span-12 md:col-span-9">
            {sections.map(([t, d]) => (
              <section className="grid gap-3 border-t border-border py-6 md:grid-cols-[14rem_1fr]" key={t}>
                <h2 className="font-medium">{t}</h2>
                <p className="max-w-2xl leading-7 text-muted-foreground">{d}</p>
              </section>
            ))}
            <section className="grid gap-3 border-t border-border py-6 md:grid-cols-[14rem_1fr]">
              <h2 className="font-medium">Founder</h2>
              <div>
                <p className="leading-7 text-muted-foreground">Nikesh Lagun, Founder & Research Lead.</p>
                <div className="mt-2"><ArrowLink to="/people/$slug" params={{ slug: "nikesh-lagun" }}>View profile</ArrowLink></div>
              </div>
            </section>
            <section className="grid gap-3 border-t border-border py-6 md:grid-cols-[14rem_1fr]">
              <h2 className="font-medium">Founded</h2>
              <p className="max-w-2xl leading-7 text-muted-foreground">2026</p>
            </section>
            <section className="grid gap-3 border-y border-border py-6 md:grid-cols-[14rem_1fr]">
              <h2 className="font-medium">Contact</h2>
              <div><ArrowLink to="/contact">Contact the Lab</ArrowLink></div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
