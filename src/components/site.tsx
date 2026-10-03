import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/lagun-lab-logo.png.asset.json";

const logo = logoAsset.url;

const nav = [
  ["Research", "/research"], ["Projects", "/projects"], ["People", "/people"],
  ["Publications", "/publications"], ["Join", "/join"], ["About", "/about"],
] as const;

export function SiteHeader() {
  return <header className="border-b border-border bg-background/95 sticky top-0 z-50 backdrop-blur-sm">
    <div className="site-width flex min-h-18 items-center justify-between gap-6">
      <Link to="/" className="flex items-center gap-3"><img src={logo} alt="Lagun Lab logo" className="size-9"/><span className="text-lg font-semibold text-primary">LAGUN LAB</span></Link>
      <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
        {nav.map(([label,to]) => <Link key={to} to={to} activeProps={{className:"text-primary"}} className="text-[15px] font-medium hover:text-primary">{label}</Link>)}
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
      <div className="lg:col-span-5"><p className="text-xl font-semibold">LAGUN LAB</p><p className="mt-5 max-w-md text-[15px] leading-6 text-background/70">Independent, distributed research organization studying cognitive and behavioral dynamics.</p><p className="mt-4 text-[13px] leading-5 text-background/55">Kathmandu, Nepal · The Lab operates remotely and is not a constituent unit of a university.</p></div>
      <FooterGroup title="Explore" links={nav}/>
      <FooterGroup title="Standards" links={[["Research Integrity","/policies"],["Authorship & Contribution","/policies"],["Affiliation Policy","/policies"],["Open Science","/open-science"],["Research Ethics","/policies"],["Code of Conduct","/policies"]]}/>
      <div className="lg:col-span-2"><p className="footer-title">Contact</p><p className="text-sm text-background/70"><a href="mailto:lagunnikesh2064@gmail.com" className="hover:text-background">lagunnikesh2064@gmail.com</a></p><p className="mt-5 text-xs text-background/50">GitHub · Zenodo · LinkedIn links will be added once verified.</p></div>
    </div>
    <div className="site-width mt-14 border-t border-background/15 pt-6 text-xs text-background/45">© 2026 Lagun Lab · Lagun Lab is independently organized and is not a constituent unit of a university.</div>
  </footer>
}
function FooterGroup({title,links}:{title:string;links:readonly (readonly [string,string])[]}) { return <div className="lg:col-span-2"><p className="footer-title">{title}</p><ul className="space-y-2">{links.map(([label,to])=><li key={label}><Link to={to} className="text-sm text-background/70 hover:text-background">{label}</Link></li>)}</ul></div> }

export function PageHero({eyebrow,title,children}:{eyebrow:string;title:string;children:ReactNode}) { return <section className="page-section border-b border-border"><div className="grid-12"><div className="col-span-12 lg:col-span-8"><p className="eyebrow">{eyebrow}</p><h1 className="display-title">{title}</h1><div className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{children}</div></div></div></section> }
export function SectionHeader({index,label,title}:{index:string;label:string;title:string}) { return <div className="mb-10 grid-12"><p className="eyebrow col-span-12 md:col-span-3">{index} / {label}</p><h2 className="col-span-12 text-3xl font-medium md:col-span-9 lg:text-4xl">{title}</h2></div> }
export function ArrowLink({to,children,params,search,hash}:{to:string;children:ReactNode;params?:Record<string,string>;search?:Record<string,string>;hash?:string}) { return <Link to={to} {...(params?{params}:{})} {...(search?{search}:{})} {...(hash?{hash}:{})} className="inline-flex items-center gap-2 font-medium text-primary underline-offset-4 hover:underline">{children}<ArrowRight className="size-4"/></Link> }
export function EmptyState({title,body}:{title:string;body:string}) { return <div className="border-y border-border py-12"><p className="font-medium">{title}</p><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{body}</p></div> }
export function ScientificTrace() { return <figure className="border border-border bg-secondary p-6" aria-label="Conceptual behavioral-state schematic from intention to sustained action"><div className="mb-9 flex items-center justify-between text-[11px] font-semibold uppercase text-muted-foreground"><span>Behavioral state schematic</span><span>Conceptual model</span></div><div className="relative grid grid-cols-3 gap-3 before:absolute before:left-[14%] before:right-[14%] before:top-5 before:border-t before:border-primary/45"><State index="S₀" label="Intention" level="low"/><State index="S₁" label="Initiation" level="mid"/><State index="S₂" label="Sustained action" level="high"/></div><div className="mt-10 border-t border-primary/25 pt-4 text-xs leading-5 text-muted-foreground">A schematic transition between proposed behavioral states—not empirical data.</div></figure> }
function State({index,label,level}:{index:string;label:string;level:"low"|"mid"|"high"}) { const heights={low:"h-8",mid:"h-16",high:"h-24"};return <div className="relative z-10 flex min-w-0 flex-col items-center text-center"><span className="flex size-10 items-center justify-center border border-primary bg-secondary text-xs font-semibold text-primary">{index}</span><div className={`mt-5 w-px bg-primary/60 ${heights[level]}`}/><strong className="mt-3 text-[11px] font-semibold uppercase leading-4">{label}</strong></div> }
export function ProgressLine({current="Idea"}:{current?:string}) { const stages=["Idea","Protocol","Registered","Data","Analysis","Manuscript","Published"]; const idx=stages.indexOf(current); return <ol className="grid gap-2 sm:grid-cols-7" aria-label={`Project progress, current stage: ${current}`}>{stages.map((s,i)=><li key={s} className={`border-t-2 pt-2 text-xs ${i<=idx?"border-primary text-foreground":"border-border text-muted-foreground"}`}><span className="sr-only">{i===idx?"Current: ":""}</span>{s}</li>)}</ol> }
export function StatusPill({children}:{children:ReactNode}) { return <span className="inline-flex border border-primary/30 bg-primary/5 px-2 py-1 text-xs font-medium text-primary">{children}</span> }
export function NetworkMark() { return <Network className="size-8 text-primary" aria-hidden="true"/> }
export { Button };
