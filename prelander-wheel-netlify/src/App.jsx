import React, { useMemo, useState } from "react";
import { CLAIM_URL, TrustBadges, TopBar, CTA, OutlineCTA, Countdown } from "./shared.jsx";

export default function App() {
  const prizes = ["50 FREE SPINS","100% MATCH"," BONUS","200 FREE SPINS"," BONUS","SPIN + SPINS COMBO","75 FREE SPINS","UP TO  BONUS"];
  const [spinning,setSpinning]=useState(false);
  const [angle,setAngle]=useState(0);
  const [result,setResult]=useState(null);
  const seg=360/prizes.length;

  const spin=()=>{
    if(spinning) return;
    const idx=Math.random()<0.25?prizes.length-1:Math.floor(Math.random()*prizes.length);
    const center=idx*seg+seg/2; const turns=6+Math.floor(Math.random()*4);
    setResult(prizes[idx]); setSpinning(true);
    requestAnimationFrame(()=>setAngle(turns*360 + (360-center)));
  };
  const wheelStyle={ transition:spinning?'transform 4s cubic-bezier(.22,.61,.36,1)':'transform .2s', transform:
otate(deg) };
  const bgConic = useMemo(()=> 'conic-gradient(#fde047 0deg 45deg,#fb7185 45deg 90deg,#60a5fa 90deg 135deg,#34d399 135deg 180deg,#fca5a5 180deg 225deg,#a78bfa 225deg 270deg,#f59e0b 270deg 315deg,#22d3ee 315deg 360deg)',[]);

  return (
    <div className="min-h-screen">
      <TopBar/>
      <main className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2"><div className="w-0 h-0 border-l-8 border-r-8 border-b-[16px] border-l-transparent border-r-transparent border-b-rose-600"/></div>
            <div className="relative size-72 md:size-96 rounded-full shadow-2xl border-8 border-white" style={{ background: bgConic }}>
              <div className="absolute inset-0 rounded-full" style={wheelStyle} onTransitionEnd={()=>setSpinning(false)}/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="size-16 rounded-full bg-white shadow-xl border flex items-center justify-center font-black">WIN</div></div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-3">
            <CTA onClick={spin} disabled={spinning}>{spinning? 'SPINNING…':'SPIN NOW — GUARANTEED BONUS'}</CTA>
            <Countdown minutes={10}/>
          </div>
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase">SPIN THE WHEEL — BONUS GUARANTEED!</h1>
          <p className="mt-3 text-gray-800 text-lg font-semibold">Everyone wins — unlock up to <span className="font-black text-rose-700"> BONUS</span> or <span className="font-black text-rose-700">200 FREE SPINS</span>. <span className="font-extrabold">Offer ends TONIGHT.</span></p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-gray-800 mt-4 font-bold">{prizes.map((p,i)=><li key={i} className="px-3 py-2 bg-gray-50 rounded-xl border">{p}</li>)}</ul>
          <a href={CLAIM_URL} className="inline-block mt-4"><OutlineCTA>CLAIM YOUR BONUS NOW</OutlineCTA></a>
          <section id="terms" className="mt-6 text-xs text-gray-500">18+ only. UKGC licensed. Please gamble responsibly — BeGambleAware.org</section>
          {result && <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-bold">🎉 You’ve won: {result} — <a className="underline" href={CLAIM_URL}>Claim now</a></div>}
        </div>
      </main>
    </div>
  )
}
