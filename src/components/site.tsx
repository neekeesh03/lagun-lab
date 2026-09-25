import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Network, X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  ["Research", "/research"], ["Projects", "/projects"], ["People", "/people"],
  ["Publications", "/publications"], ["Join", "/join"], ["About", "/about"],
] as const;

export function SiteHeader() {
  return <header className="border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
    <div className="site-width flex min-h-18 items-center justify-between gap-6">
      <Link to="/" className="text-lg font-semibold text-primary">LAGUN LAB</Link>
      <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
        {nav.map(([label,to]) => <Link key={to} to={to} activeProps={{className:"text-primary"}} className="text-sm font-medium hover:text-primary">{label}</Link>)}
        <Link to="/projects" className="border-l border-border pl-7 text-sm font-medium text-primary">Current Projects <ArrowRight className="ml-1 inline size-3" /></Link>
      </nav>
      <details className="group relative lg:hidden">
        <summary className="flex size-10 cursor-pointer list-none items-center justify-center border border-border" aria-label="Open navigation"><Menu className="size-5 group-open:hidden"/><X className="hidden size-5 group-open:block"/></summary>
        <nav className="absolute right-0 top-12 w-64 border border-border bg-background p-3 shadow-sm" aria-label="Mobile navigation">
          {nav.map(([label,to]) => <Link key={to} to={to} className="block border-b border-border px-3 py-3 text-sm font-medium last:border-0">{label}</Link>)}
        </nav>
      </details>
    </div>
  </header>
}

export function SiteFooter() {
  return <footer className="bg-foreground py-16 text-background">
    <div className="site-width grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5"><p className="text-xl font-semibold">LAGUN LAB</p><p className="mt-5 max-w-md text-sm leading-6 text-background/70">Lagun Lab is an independent, distributed research organization administratively based in Kathmandu, Nepal.</p><p className="mt-3 text-xs text-background/55">The Lab operates remotely and is not a constituent unit of a university.</p></div>
      <FooterGroup title="Explore" links={nav}/>
      <FooterGroup title="Standards" links={[["Research Integrity","/policies"],["Authorship & Contribution","/policies"],["Affiliation Policy","/policies"],["Open Science","/open-science"],["Research Ethics","/policies"],["Code of Conduct","/policies"]]}/>
      <div className="lg:col-span-2"><p className="footer-title">Contact</p><p className="text-sm text-background/70">research@[domain]</p><p className="mt-5 text-xs text-background/50">GitHub · Zenodo · LinkedIn links will be added once verified.</p></div>
    </div>
    <div className="site-width mt-14 border-t border-background/15 pt-6 text-xs text-background/45">© Lagun Lab · Kathmandu, Nepal</div>
  </footer>
}
function FooterGroup({title,links}:{title:string;links:readonly (readonly [string,string])[]}) { return <div className="lg:col-span-2"><p className="footer-title">{title}</p><ul className="space-y-2">{links.map(([label,to])=><li key={label}><Link to={to} className="text-sm text-background/70 hover:text-background">{label}</Link></li>)}</ul></div> }

export function PageHero({eyebrow,title,children}:{eyebrow:string;title:string;children:ReactNode}) { return <section className="page-section border-b border-border"><div className="grid-12"><div className="col-span-12 lg:col-span-8"><p className="eyebrow">{eyebrow}</p><h1 className="display-title">{title}</h1><div className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div></div></div></section> }
export function SectionHeader({index,label,title}:{index:string;label:string;title:string}) { return <div className="mb-10 grid-12"><p className="eyebrow col-span-12 md:col-span-3">{index} / {label}</p><h2 className="col-span-12 text-3xl font-medium md:col-span-9 lg:text-4xl">{title}</h2></div> }
export function ArrowLink({to,children}:{to:string;children:ReactNode}) { return <Link to={to} className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline">{children}<ArrowRight className="size-4"/></Link> }
export function EmptyState({title,body}:{title:string;body:string}) { return <div className="border-y border-border py-12"><p className="font-medium">{title}</p><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{body}</p></div> }
export function ScientificTrace() { const points=[28,35,31,49,43,64,52,72,61,78,57,69]; return <figure className="border border-border bg-secondary p-6" aria-label="Conceptual trace showing changes between cognitive and behavioral states"><div className="flex h-52 items-end gap-2">{points.map((n,i)=><span key={i} className={`flex-1 border-t ${i===5||i===9?"border-highlight bg-highlight/15":"border-primary bg-primary/15"}`} style={{height:`${n}%`}} />)}</div><figcaption className="mt-5 flex justify-between border-t border-border pt-4 text-xs text-muted-foreground"><span>INTENTION</span><span>CONCEPTUAL STATE TRACE</span><span>ACTION</span></figcaption></figure> }
export function ProgressLine({current="Idea"}:{current?:string}) { const stages=["Idea","Protocol","Registered","Data","Analysis","Manuscript","Published"]; const idx=stages.indexOf(current); return <ol className="grid gap-2 sm:grid-cols-7" aria-label={`Project progress, current stage: ${current}`}>{stages.map((s,i)=><li key={s} className={`border-t-2 pt-2 text-xs ${i<=idx?"border-primary text-foreground":"border-border text-muted-foreground"}`}><span className="sr-only">{i===idx?"Current: ":""}</span>{s}</li>)}</ol> }
export function StatusPill({children}:{children:ReactNode}) { return <span className="inline-flex border border-primary/30 bg-primary/5 px-2 py-1 text-xs font-medium text-primary">{children}</span> }
export function NetworkMark() { return <Network className="size-8 text-primary" aria-hidden="true"/> }
export { Button };
