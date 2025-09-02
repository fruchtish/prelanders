import React, { useRef } from "react";
import { TopBar, OutlineCTA } from "./shared.jsx";

const block=(title,sub,cta)=>`<!doctype html><html><body style="font-family:Arial"><h1>${title}</h1><p>${sub}</p><p><a href="https://fbr23.com/global3">${cta}</a></p><small>18+ • UKGC • BeGambleAware</small></body></html>`;
const text=(title,sub)=>`${title}\n\n${sub}\n\nClaim: https://fbr23.com/global3`;

function Email({title,html,txt}){ 
  const h=useRef(null), t=useRef(null); 
  const copy=(r)=>{(r==='h'?h.current:t.current).select(); document.execCommand('copy');}; 
  return (
    <div className="border rounded-2xl p-4 bg-white/70">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>
        <div className="flex gap-2">
          <OutlineCTA onClick={()=>copy('h')}>Copy HTML</OutlineCTA>
          <OutlineCTA onClick={()=>copy('t')}>Copy Text</OutlineCTA>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-3">
        <textarea ref={h} className="w-full h-56 border rounded-lg p-2 text-xs font-mono" defaultValue={html}/>
        <textarea ref={t} className="w-full h-56 border rounded-lg p-2 text-xs font-mono" defaultValue={txt}/>
      </div>
    </div>
  ) 
}

export default function App(){
  const wheelHTML=block("Spin the Wheel — Bonus Guaranteed","Every spin wins. Up to  bonus or 200 free spins.","Spin & Claim NOW");
  const wheelTEXT=text("Spin the Wheel — Bonus Guaranteed","Every spin wins. Up to  bonus or 200 free spins.");
  const scratchHTML=block("Scratch Card Ready — Reveal Your Bonus","Scratch the foil to reveal your guaranteed reward.","Scratch & Claim NOW");
  const scratchTEXT=text("Scratch Card Ready — Reveal Your Bonus","Scratch the foil to reveal your guaranteed reward.");
  const slotHTML=block("Spin Free — Unlock a Real Bonus","Win coins in the demo to unlock  bonus + 100 spins.","Play & Unlock BONUS");
  const slotTEXT=text("Spin Free — Unlock a Real Bonus","Win coins in the demo to unlock  bonus + 100 spins.");

  return (
    <div className="min-h-screen">
      <TopBar/>
      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <Email title="Wheel — Newsletter" html={wheelHTML} txt={wheelTEXT}/>
        <Email title="Scratch — Newsletter" html={scratchHTML} txt={scratchTEXT}/>
        <Email title="Slot — Newsletter" html={slotHTML} txt={slotTEXT}/>
      </main>
    </div>
  )
}
