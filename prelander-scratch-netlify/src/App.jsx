import React, { useEffect, useRef, useState } from "react";
import { CLAIM_URL, TrustBadges, TopBar, CTA, OutlineCTA, Countdown } from "./shared.jsx";

export default function App() {
  const canvasRef = useRef(null);
  const [revealed,setRevealed]=useState(false);
  const [percent,setPercent]=useState(0);
  const [prize] = useState(()=>["150 FREE SPINS"," BONUS"," BONUS","75 FREE SPINS","100% MATCH"][Math.floor(Math.random()*5)]);

  useEffect(()=>{
    const cvs=canvasRef.current; if(!cvs) return;
    const ctx=cvs.getContext('2d');
    const draw=()=>{ctx.clearRect(0,0,cvs.width,cvs.height);const g=ctx.createLinearGradient(0,0,cvs.width,cvs.height);g.addColorStop(0,'#d4d4d8');g.addColorStop(1,'#9ca3af');ctx.fillStyle=g;ctx.fillRect(0,0,cvs.width,cvs.height);for(let i=0;i<400;i++){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillRect(Math.random()*cvs.width,Math.random()*cvs.height,1,1)}};
    draw();
    let drawing=false;
    const scratch=(x,y)=>{ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();ctx.globalCompositeOperation='source-over';};
    const getPos=e=>{const r=cvs.getBoundingClientRect();if(e.touches){const t=e.touches[0];return{x:t.clientX-r.left,y:t.clientY-r.top}}return{x:e.clientX-r.left,y:e.clientY-r.top}};
    const update=()=>{const data=ctx.getImageData(0,0,cvs.width,cvs.height).data;let c=0,t=0;const step=12;for(let y=0;y<cvs.height;y+=step)for(let x=0;x<cvs.width;x+=step){t++;if(data[(y*cvs.width+x)*4+3]<8)c++;}const pct=c/t;setPercent(pct);if(pct>0.75)setRevealed(true)};
    const down=e=>{drawing=true;const p=getPos(e);scratch(p.x,p.y)};
    const move=e=>{if(!drawing) return;const p=getPos(e);scratch(p.x,p.y);update();};
    const up=()=>{drawing=false;update();};
    cvs.addEventListener('mousedown',down);window.addEventListener('mousemove',move);window.addEventListener('mouseup',up);
    cvs.addEventListener('touchstart',down,{passive:true});window.addEventListener('touchmove',move,{passive:true});window.addEventListener('touchend',up);
    return()=>{cvs.removeEventListener('mousedown',down);window.removeEventListener('mousemove',move);window.removeEventListener('mouseup',up);cvs.removeEventListener('touchstart',down);window.removeEventListener('touchmove',move);window.removeEventListener('touchend',up)};
  },[]);

  return (
    <div className="min-h-screen">
      <TopBar/>
      <main className="max-w-6xl mx-auto px-4 grid md:grid-cols-[1.1fr_.9fr] gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase">SCRATCH & WIN A GUARANTEED BONUS — LIMITED TIME!</h1>
          <p className="text-gray-900 text-lg font-bold mt-2">Scratch to reveal your prize — up to <span className="font-black text-rose-700"> BONUS</span> or <span className="font-black text-rose-700">150 FREE SPINS</span>.</p>
          <div className="relative mt-4 rounded-3xl border p-4 bg-gradient-to-br from-white to-gray-50">
            <div className="text-center py-10">
              <div className="text-5xl font-black text-emerald-600">{prize}</div>
              <div className="text-sm text-gray-600 mt-2 font-semibold uppercase">Reveal 75% to unlock</div>
            </div>
            {!revealed && <canvas ref={canvasRef} width={420} height={220} className="absolute inset-4 rounded-2xl" /> }
          </div>
          <div className="mt-4 flex items-center gap-4">
            <a href={CLAIM_URL}><CTA disabled={!revealed}>{revealed? 'CLAIM YOUR BONUS NOW':'SCRATCH TO UNLOCK'}</CTA></a>
            <div className="text-sm font-bold">Revealed: {(percent*100|0)}%</div>
          </div>
          <div className="mt-4"><Countdown minutes={8}/></div>
          <section id="terms" className="mt-6 text-xs text-gray-500">18+ only. UKGC licensed. Please gamble responsibly — BeGambleAware.org</section>
        </div>
        <div className="space-y-3">
          <TrustBadges/>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-900 font-bold">
            {[" BONUS","150 FREE SPINS"," BONUS","100% MATCH"].map((p,i)=><div key={i} className="px-3 py-2 bg-gray-50 rounded-xl border">{p}</div>)}
          </div>
        </div>
      </main>
    </div>
  )
}
