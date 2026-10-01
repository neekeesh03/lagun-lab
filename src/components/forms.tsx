import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const email = "lagunnikesh2064@gmail.com";
const baseSchema=z.object({name:z.string().trim().min(2).max(100),email:z.string().trim().email().max(255),message:z.string().trim().min(20).max(4000)});
function Field({label,name,type="text",required=true}:{label:string;name:string;type?:string;required?:boolean}) { return <label className="form-field"><span>{label}{required && " *"}</span><Input name={name} type={type} required={required} maxLength={255}/></label> }
function Area({label,name,required=true}:{label:string;name:string;required?:boolean}) { return <label className="form-field"><span>{label}{required && " *"}</span><Textarea name={name} required={required} maxLength={4000} rows={5}/></label> }
function FormNotice(){return <p className="border-l-2 border-highlight pl-4 text-sm leading-6 text-muted-foreground">Online delivery will be enabled when the institutional email is verified. Until then, this form prepares a message for <strong className="text-foreground">{email}</strong>; it does not create a membership record.</p>}
export function JoinForms({initial="apply"}:{initial?:"apply"|"collaborate"}={}){ const [tab,setTab]=useState<"apply"|"collaborate">(initial); useEffect(()=>setTab(initial),[initial]); return <div><div className="mb-10 flex border-b border-border" role="tablist"><Button variant="ghost" className={tab==="apply"?"border-b-2 border-primary text-primary":""} onClick={()=>setTab("apply")}>Research application</Button><Button variant="ghost" className={tab==="collaborate"?"border-b-2 border-primary text-primary":""} onClick={()=>setTab("collaborate")}>Collaboration proposal</Button></div>{tab==="apply"?<ApplicationForm/>:<CollaborationForm/>}</div> }
type Draft={subject:string;body:string};
const labels:Record<string,string>={name:"Name",email:"Email",country:"Country",institution:"Institution",position:"Position",orcid:"ORCID",scholar:"Google Scholar",github:"GitHub",website:"Website",interests:"Research interests",skills:"Methods / technical skills",experience:"Research experience",message:"Message",project:"Project of interest",contribution:"Contribution",availability:"Weekly availability",cv:"CV link",sample:"Sample link",area:"Proposed research area",resources:"Funding or resources",timeline:"Timeline",supporting:"Supporting URL"};
function useEmailForm(kind:string){
  const [draft,setDraft]=useState<Draft|null>(null);const [error,setError]=useState<string|null>(null);
  function onSubmit(e:FormEvent<HTMLFormElement>){e.preventDefault();const fd=new FormData(e.currentTarget);const parsed=baseSchema.safeParse({name:fd.get("name"),email:fd.get("email"),message:fd.get("message")});
    if(!parsed.success){const f=String(parsed.error.issues[0]?.path[0]);setError(f==="message"?"Please write at least 20 characters in your main message.":f==="email"?"Please enter a valid email address.":"Please enter your name.");setDraft(null);return}
    setError(null);
    const body=Array.from(fd.entries()).filter(([,v])=>typeof v==="string"&&v.trim()).map(([k,v])=>`${labels[k]??k}: ${String(v).trim()}`).join("\n\n");
    setDraft({subject:`Lagun Lab — ${kind} from ${parsed.data.name}`,body});}
  return {draft,error,onSubmit};
}
function DraftPanel({draft,error}:{draft:Draft|null;error:string|null}){
  const [copied,setCopied]=useState(false);
  if(error) return <p role="alert" className="col-span-full border-l-2 border-destructive pl-4 text-sm text-destructive">{error}</p>;
  if(!draft) return null;
  const q=`subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  const gmail=`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  return <div role="status" className="col-span-full space-y-3 border border-border bg-secondary/40 p-5 text-sm">
    <p className="font-medium text-foreground">Your message is ready but not sent yet. Choose how to send it to {email}:</p>
    <div className="flex flex-wrap gap-3">
      <Button asChild size="sm"><a href={gmail} target="_blank" rel="noopener noreferrer">Open in Gmail</a></Button>
      <Button asChild size="sm" variant="outline"><a href={`mailto:${email}?${q}`} target="_blank" rel="noopener noreferrer">Open in email app</a></Button>
      <Button type="button" size="sm" variant="outline" onClick={async()=>{try{await navigator.clipboard.writeText(`To: ${email}\nSubject: ${draft.subject}\n\n${draft.body}`);setCopied(true)}catch{setCopied(false)}}}>{copied?"Copied":"Copy message"}</Button>
    </div>
    <p className="text-muted-foreground">Attach your CV or samples in the email if you have not included links.</p>
  </div>;
}
function ApplicationForm(){const {draft,error,onSubmit}=useEmailForm("research application");return <form onSubmit={onSubmit} className="form-grid"><FormNotice/><Field label="Full name" name="name"/><Field label="Email" name="email" type="email"/><Field label="Country" name="country"/><Field label="Current institution / independent researcher" name="institution"/><Field label="Current position" name="position"/><Field label="ORCID" name="orcid" required={false}/><Field label="Google Scholar" name="scholar" required={false}/><Field label="GitHub" name="github" required={false}/><Field label="Personal website" name="website" required={false}/><Area label="Research interests" name="interests"/><Area label="Methods / technical skills" name="skills"/><Area label="Research experience" name="experience"/><Area label="Why are you interested in Lagun Lab? (at least 20 characters)" name="message"/><Area label="Which current project interests you?" name="project" required={false}/><Area label="What type of research would you like to contribute to?" name="contribution"/><Field label="Approximate weekly availability" name="availability"/><Field label="CV link (Google Drive, Dropbox, website)" name="cv" type="url" required={false}/><Field label="Optional writing, code, or research sample link" name="sample" type="url" required={false}/><label className="col-span-full flex items-start gap-3 text-sm"><input type="checkbox" required className="mt-1 accent-primary"/><span>I consent to Lagun Lab using this information to evaluate research fit. Submission does not guarantee a role.</span></label><Button type="submit" className="w-fit">Prepare application email</Button><DraftPanel draft={draft} error={error}/></form>}
function CollaborationForm(){const {draft,error,onSubmit}=useEmailForm("collaboration proposal");return <form onSubmit={onSubmit} className="form-grid"><FormNotice/><Field label="Name" name="name"/><Field label="Institution" name="institution"/><Field label="Position" name="position"/><Field label="Email" name="email" type="email"/><Field label="Proposed research area" name="area"/><Area label="Collaboration idea (at least 20 characters)" name="message"/><Field label="Relevant project" name="project" required={false}/><Area label="Expected contribution" name="contribution"/><Area label="Potential funding or resources" name="resources" required={false}/><Field label="Timeline" name="timeline"/><Field label="Supporting URL or document" name="supporting" required={false}/><Button type="submit" className="w-fit">Prepare collaboration email</Button><DraftPanel draft={draft} error={error}/></form>}
