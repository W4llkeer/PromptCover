"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Fingerprint, ScanLine, ShieldCheck, Siren } from "lucide-react";
import { appSpec } from "@/lib/domain-spec";
import { contractAddress } from "@/lib/deployment";

export function PromptCoverLanding() {
  return (
    <main className="pc-landing" data-landing="promptcover-containment-chamber" data-palette="20-promptcover-colorhunt-combination">
      <header className="pc-header">
        <a href="./" className="pc-brand"><ShieldCheck/><b>PromptCover</b><span>AI RISK MUTUAL</span></a>
        <ConnectButton showBalance={false}/>
      </header>
      <section className="pc-hero">
        <article className="pc-copy"><p>{appSpec.kicker}</p><h1>Coverage for the<br/><span>trust boundary.</span></h1><p>{appSpec.description}</p></article>
        <div className="pc-chamber" role="img" aria-label="Nested policy trust zones and an incident trace">
          <div className="pc-membrane pc-m1"><span>POLICY</span></div><div className="pc-membrane pc-m2"><span>AGENT</span></div><div className="pc-membrane pc-m3"><span>TOOL</span></div>
          <a className="pc-core" href="./app/" aria-label="Unlock the mutual vault"><Fingerprint size={44}/><b>TRUST CORE</b><small>ENTER VAULT</small></a>
          <div className="pc-trace"><i/><i/><i/><i/></div><span className="pc-breach"><Siren size={15}/> INJECTION TRACE</span>
        </div>
        <aside className="pc-serial"><ScanLine/><div><span>POLICY SERIAL</span><b>{contractAddress.slice(0,8)}...{contractAddress.slice(-6)}</b></div></aside>
      </section>
      <section className="pc-layers" id="layers"><header><span>THREE CONTROL MEMBRANES</span><h2>Capital enters once. Evidence crosses every boundary.</h2></header><ol>{appSpec.steps.map(([number,title,copy],index)=><li key={number}><span>{String(index+1).padStart(2,"0")}</span><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></section>
    </main>
  );
}
