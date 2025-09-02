import React, { useEffect, useState } from "react";
import { CLAIM_URL, TrustBadges, TopBar, CTA, Countdown } from "./shared.jsx";

const SYMBOLS = ["🍒","🔔","💎","7️⃣","⭐","🍀"];
const randSym = ()=> SYMBOLS[Math.floor(Math.random()*SYMBOLS.length)];
function Reel({ running, final }){ const [sym,setSym]=useState(randSym()); useEffect(()=>{ if(!running){setSym(final);return} const id=setInterval(()=>setSym(randSym()),90); return()=>clearInterval(id)},[running,final]); return <div className="w-24 h-28 rounded-xl bg-white border shadow flex items-center justify-center text-5xl">{sym}</div> }

export default function App() {
  const [spins,setSpins]=useState(0);
  const [running,setRunning]=useState(false);
  const [finals,setFinals]=useState(["🍒","🍒","🍒"]);
  const [won,setWon]=useState(false);

  const play=()=>{ if(running) return; setRunning(true); setSpins(s=>s+1);
    const winOn=Math.floor(Math.random()*3)+1; const isWin=spins+1>=winOn;
    const target=isWin?["7️⃣","7️⃣","7️⃣"]:[randSym(),randSym(),randSym()];
    setFinals(target);
    setTimeout(()=>{ setRunning(false); if(isWin) setWon(true); },1400)
  };

  return (
    <div className="min-h-screen">
      <TopBar/>
      <main className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase">PLAY OUR SLOT — UNLOCK REAL BONUSES INSTANTLY!</h1>
          <p className="text-gray-900 text-lg font-bold mb-4">Win in the demo to unlock a <span className="font-black text-rose-700"> BONUS</span> + <span className="font-black text-rose-700">100 FREE SPINS</span>.</p>
          <div className="flex items-center gap-3 bg-gradient-to-br from-amber-50 to-rose-50 border rounded-3xl p-4 w-[min(96vw,520px)]">
            <div className="flex gap-3">
              <Reel running={running} final={finals[0]}/>
              <Reel running={running} final={finals[1]}/>
              <Reel running={running} final={finals[2]}/>
            </div>
            <div className="ml-auto">
              <CTA onClick={play} disabled={running}>{running?'SPINNING…':'PLAY NOW & WIN BONUS'}</CTA>
            </div>
          </div>
          <div className="mt-4"><Countdown minutes={10}/></div>
          {won && <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-bold">🎉 You unlocked a  bonus + 100 spins! <a className="underline" href={CLAIM_URL}>Register & Claim</a></div>}
          <section id="terms" className="mt-6 text-xs text-gray-500">18+ only. UKGC licensed. Please gamble responsibly — BeGambleAware.org</section>
        </div>
        <div className="space-y-3"><TrustBadges/></div>
      </main>
    </div>
  )
}
