import React, { useEffect, useRef, useState } from "react";
const CLAIM_URL = "https://fbr23.com/global3";
const TrustBadges = () => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-700 font-semibold">
    <span className="px-2 py-1 rounded-full bg-gray-100 border">18+</span>
    <span className="px-2 py-1 rounded-full bg-gray-100 border">UKGC Licensed</span>
    <a className="px-2 py-1 rounded-full bg-gray-100 border hover:bg-gray-50" href="https://www.begambleaware.org/" target="_blank" rel="noreferrer">BeGambleAware</a>
    <a href="#terms" className="underline">T&Cs apply</a>
  </div>
);
const TopBar = () => (
  <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-rose-500" />
      <div className="font-black">LuckyArcade<span className="text-rose-600">.io</span></div>
    </div>
    <TrustBadges />
  </div>
);
const CTA = ({ children, ...rest }) => (<button {...rest} className="px-7 py-3.5 rounded-2xl shadow-xl text-white font-extrabold uppercase tracking-wider bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 hover:to-amber-600">{children}</button>);
const OutlineCTA = ({ children, ...rest }) => (<button {...rest} className="px-5 py-2.5 rounded-xl border font-bold uppercase tracking-wide hover:bg-gray-50">{children}</button>);
const Countdown = ({ minutes = 10 }) => { const [t, setT] = useState(minutes * 60); useEffect(() => { const id = setInterval(() => setT((s) => Math.max(0, s - 1)), 1000); return () => clearInterval(id); }, []); const mm = String(Math.floor(t / 60)).padStart(2, "0"); const ss = String(t % 60).padStart(2, "0"); const pct = Math.max(0, t / (minutes * 60)) * 100; return (<div className="w-full"><div className="text-sm font-bold mb-1 uppercase">Offer Expires In: <span className="text-rose-600">{mm}:{ss}</span></div><div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-600 to-amber-500" style={{ width: `${pct}%` }} /></div></div>); };
export { CLAIM_URL, TrustBadges, TopBar, CTA, OutlineCTA, Countdown };
