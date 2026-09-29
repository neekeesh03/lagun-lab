import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { PageHero } from "@/components/site";
import { people, publications } from "@/data/content";

export const Route = createFileRoute("/people/$slug")({
  loader: ({ params }) => {
    const person = people.find((p) => p.slug === params.slug);
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.name} — Lagun Lab` : "Profile unavailable — Lagun Lab";
    const description = loaderData?.bio ?? "This Lagun Lab profile is unavailable.";
    return {
      meta: [
        { title }, { name: "description", content: description },
        { property: "og:title", content: title }, { property: "og:description", content: description },
        { property: "og:type", content: "profile" }, { property: "og:url", content: `/people/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
      links: [{ rel: "canonical", href: `/people/${params.slug}` }],
    };
  },
  component: Person,
  notFoundComponent: ProfileMissing,
});

function ProfileMissing() {
  return <main><PageHero eyebrow="PEOPLE / NOT FOUND" title="Profile unavailable">This profile is not publicly listed.</PageHero></main>;
}

function Person() {
  const p = Route.useLoaderData();
  const pubs = publications.filter((x) => p.publicationIds.includes(x.id));
  const lab = pubs.filter((x) => x.relationshipToLab === "lagun-lab");
  const foundational = pubs.filter((x) => x.relationshipToLab === "foundational-founder-work");
  const links = [["Google Scholar", p.scholar], ["ORCID", p.orcid], ["ResearchGate", p.researchGate], ["Homepage", p.website], ["LinkedIn", p.linkedin], ["GitHub", p.github]].filter((l): l is [string, string] => !!l[1]);
  const m = p.scholarlyMetrics;
  return (
    <main>
      <PageHero eyebrow={`${p.category.toUpperCase()} / PROFILE`} title={p.name}>{p.role}, Lagun Lab</PageHero>
      <section className="page-section">
        <div className="grid-12">
          <aside className="col-span-12 space-y-8 md:col-span-4">
            <div className="flex aspect-square max-w-64 items-center justify-center bg-secondary text-5xl font-medium text-primary" aria-hidden="true">
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            {m && (
              <section className="border-t border-border pt-5" aria-labelledby="metrics">
                <h2 id="metrics" className="eyebrow">Scholarly profile</h2>
                <dl className="mt-4 grid grid-cols-2 gap-px border border-border bg-border">
                  {[["Citations", m.citations], ["h-index", m.hIndex], ["i10-index", m.i10Index], ["Works listed", m.worksListed]].map(([k, v]) => (
                    <div key={k} className="bg-background p-4"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-1 text-2xl font-medium">{v}</dd></div>
                  ))}
                </dl>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">Google Scholar snapshot · {m.updatedAt}. Personal metrics, updated manually; not Lagun Lab institutional metrics.</p>
                {p.scholar && <a href={p.scholar} className="mt-3 inline-block font-medium text-primary hover:underline">Google Scholar →</a>}
              </section>
            )}
            {links.length > 0 && (
              <section className="border-t border-border pt-5"><h2 className="eyebrow">Links</h2>
                <ul className="mt-3 space-y-1">{links.map(([k, v]) => <li key={k}><a href={v} className="text-primary hover:underline">{k} →</a></li>)}</ul>
              </section>
            )}
          </aside>
          <div className="col-span-12 space-y-10 md:col-span-8">
            <Block title="Biography"><p className="leading-7">{p.bio}</p></Block>
            <Block title="Research interests"><ul className="flex flex-wrap gap-2">{p.researchInterests.map((r) => <li key={r} className="border border-border px-3 py-1 text-sm">{r}</li>)}</ul></Block>
            {p.methods.length > 0 && <Block title="Methods"><p className="leading-7">{p.methods.join(" · ")}</p></Block>}
            <Block title="Current Lagun Lab projects"><p className="text-muted-foreground">No public projects have been registered yet. Initial Lagun Lab research projects are currently being organized.</p></Block>
            {lab.length > 0 && <Block title="Lagun Lab publications"><PubList items={lab} /></Block>}
            {foundational.length > 0 && (
              <Block title="Foundational research">
                <p className="mb-3 text-sm text-muted-foreground">Completed before Lagun Lab became a formal research affiliation; not presented as Lagun Lab output.</p>
                <PubList items={foundational} />
                <Link to="/publications" search={{ filter: "foundational" } as never} className="mt-4 inline-block font-medium text-primary hover:underline">View all publications →</Link>
              </Block>
            )}
            {p.externalAffiliation && <Block title="External affiliation"><p>{p.externalAffiliation} (separate from Lagun Lab)</p></Block>}
          </div>
        </div>
      </section>
    </main>
  );
}

function PubList({ items }: { items: typeof publications }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((x) => (
        <li key={x.id} className="py-4">
          <p className="font-medium">{x.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {x.authors.join(", ")} · {x.venue}{x.volume ? `, ${x.volume}` : ""}{x.issue ? `(${x.issue})` : ""}{x.pages ? `, ${x.pages}` : ""} · {x.year} · {x.type}
            {x.citations ? ` · Cited by ${x.citations}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return <section className="border-t border-border pt-5"><h2 className="eyebrow mb-4">{title}</h2>{children}</section>;
}
