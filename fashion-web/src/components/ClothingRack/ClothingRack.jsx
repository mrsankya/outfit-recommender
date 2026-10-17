// src/components/ClothingRack/ClothingRack.jsx
// "On The Rail" — ported from Joonsite Liquid to React
// All original logic faithfully recreated: hover-flip, focus modal,
// mobile slider + dots, caption swap, top-gap compensation, aspect fitting.

import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ClothingRack.css';

// ── Default rod image (transparent rail PNG) ──────────────────────────────
const ROD_IMG =
  'https://static.joonsite.com/storage/42826/media/2610071101546924.webp';

// ── Outfit products — side / front / back views ───────────────────────────
const RACK_PRODUCTS = [
  {
    id: 1,
    name: 'Cryptic Celestis Hoodie',
    subtitle: 'Oversized hoodie · Washed black',
    price: '₹2,899',
    side:  'https://static.joonsite.com/storage/42826/media/2610071101516777.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071101472773.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071101430110.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 2,
    name: 'Midnight Navy Blazer',
    subtitle: 'Tailored wool blend · Navy',
    price: '₹4,999',
    side:  'https://static.joonsite.com/storage/42826/media/2610071515248388.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071514560224.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071514492742.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 3,
    name: 'Heather Grey Hoodie',
    subtitle: 'Classic fit · Grey melange',
    price: '₹2,599',
    side:  'https://static.joonsite.com/storage/42826/media/2610071514447647.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071514403809.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071514388245.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 4,
    name: 'Jet Black Tee',
    subtitle: 'Athletic fit · Black',
    price: '₹1,299',
    side:  'https://static.joonsite.com/storage/42826/media/2610071516549024.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071515314737.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071515554298.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 5,
    name: 'Forest Green Hoodie',
    subtitle: 'Oversized fit · Bottle green',
    price: '₹2,799',
    side:  'https://static.joonsite.com/storage/42826/media/2610071517049148.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071516592552.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071517017451.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 6,
    name: 'Classic Cream Crewneck',
    subtitle: 'Heavyweight fleece · Cream',
    price: '₹2,299',
    side:  'https://static.joonsite.com/storage/42826/media/2610071517384792.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071517318112.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071517292954.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 7,
    name: 'Rosewood Crewneck',
    subtitle: 'Heavyweight fleece · Dusty pink',
    price: '₹2,399',
    side:  'https://static.joonsite.com/storage/42826/media/2610071514272856.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071514351513.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071514369515.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 8,
    name: 'Outdoor Graphic Tee',
    subtitle: 'Relaxed fit · Off-white',
    price: '₹1,499',
    side:  'https://static.joonsite.com/storage/42826/media/2610071517558243.png',
    front: 'https://static.joonsite.com/storage/42826/media/2610071517510556.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071517430836.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 9,
    name: 'Sunset Orange Tee',
    subtitle: 'Relaxed fit · Apricot',
    price: '₹1,399',
    side:  'https://static.joonsite.com/storage/42826/media/2610071516260505.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071516100782.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071516137018.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 10,
    name: 'Royal Heritage Silk Kurta',
    subtitle: 'Chanderi silk · Marigold saffron',
    price: '₹3,499',
    side:  'https://static.joonsite.com/storage/42826/media/2610071514447647.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071514403809.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071514388245.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
  {
    id: 11,
    name: 'Embroidered Velvet Sherwani',
    subtitle: 'Zari embroidery · Midnight teal',
    price: '₹7,999',
    side:  'https://static.joonsite.com/storage/42826/media/2610071515248388.webp',
    front: 'https://static.joonsite.com/storage/42826/media/2610071514560224.webp',
    back:  'https://static.joonsite.com/storage/42826/media/2610071514492742.webp',
    btnLabel: 'View in the shop',
    btnUrl:   '#',
  },
];

// ── Config (mirrors Liquid section.settings defaults) ─────────────────────
const CFG = {
  hoverSpeed:    650,   // ms
  hoverGap:      18,    // px each side when hovered
  garmentH:      300,   // px desktop
  garmentHMob:   170,   // px mobile (<750)
  garmentHSlide: 230,   // px mobile slider (<600)
  itemGap:       8,     // px
  turnSpeed:     700,   // ms focus flip
  slideInterval: 3000,  // ms auto-slide
  accentColor:   'var(--accent)',
  defaultCaption:'Crafted in heavyweight fleece. Cut oversized. Made to last.',
};

// ─────────────────────────────────────────────────────────────────────────────
export default function ClothingRack() {
  const rackRef      = useRef(null);
  const focusRef     = useRef(null);
  const fstageRef    = useRef(null);
  const capRef       = useRef(null);
  const dotsRef      = useRef(null);

  // All mutable state lives in a ref-bag so we never re-render inside RAF loops
  const R = useRef({
    states: [],
    curHover: null,
    running: false, lastTs: 0,
    capCur: '', capTimer: null,
    // focus
    fGarment: null, fAng: 0, fAngT: 0,
    fAnim: null, fLast: 0, fDrag: false,
    fDragX: 0, fDragA: 0, prevOverflow: '',
    fCloseTimer: null,
    // slider
    slOn: false, slTimer: null,
    slClones: [], slSetW: 0,
    slDots: [], slHold: 0,
    slMQ: null,
  }).current;

  // ── helpers ──────────────────────────────────────────────────────────────
  function ss(x){ return x*x*(3-2*x); }

  function blend(views, v){
    for (let i=0;i<views.length;i++){
      const {el,pos:p}=views[i];
      const prev = i>0 ? views[i-1].pos : null;
      const next = i<views.length-1 ? views[i+1].pos : null;
      let w=0;
      if(v===p) w=1;
      else if(v<p&&prev!==null&&v>prev) w=(v-prev)/(p-prev);
      else if(v>p&&next!==null&&v<next) w=(next-v)/(next-p);
      else if(v<=p&&prev===null) w=1;
      else if(v>=p&&next===null) w=1;
      el.style.opacity=Math.max(0,Math.min(1,w));
    }
  }

  // top-gap compensator (same as original)
  const gapCache={}, gapHost={}, gapHostQ={};
  function gapOrigin(src){ try{return new URL(src,location.href).origin;}catch(e){return '';} }
  function applyTopGap(im,frac){ if(frac>0.004) im.style.transform='translateY(-'+(frac*100).toFixed(2)+'%)'; }
  function measureTopGap(im){
    const src=im.currentSrc||im.src; if(!src) return;
    const org=gapOrigin(src);
    if(gapHost[org]==='bad') return;
    if(gapHost[org]==='wait'&&gapCache[src]===undefined){
      (gapHostQ[org]=gapHostQ[org]||[]).push(im); return;
    }
    if(gapCache[src]!==undefined){
      if(gapCache[src]!==null) applyTopGap(im,gapCache[src]);
      else (gapCache['_q_'+src]=gapCache['_q_'+src]||[]).push(im);
      return;
    }
    if(gapHost[org]===undefined) gapHost[org]='wait';
    gapCache[src]=null; gapCache['_q_'+src]=[im];
    const probe=new Image(); probe.crossOrigin='anonymous';
    probe.onload=function(){
      let frac=0;
      try{
        const w=Math.min(160,probe.naturalWidth||1);
        const s=w/(probe.naturalWidth||1);
        const h=Math.max(1,Math.round((probe.naturalHeight||1)*s));
        const c=document.createElement('canvas'); c.width=w; c.height=h;
        const x=c.getContext('2d',{willReadFrequently:true});
        x.drawImage(probe,0,0,w,h);
        const d=x.getImageData(0,0,w,h).data;
        let row=0,found=false;
        for(;row<h&&!found;row++)
          for(let i=row*w*4+3;i<(row+1)*w*4;i+=4)
            if(d[i]>12){found=true;break;}
        if(found) frac=(row-1)/h;
      }catch(e){ frac=0; }
      gapCache[src]=Math.max(0,frac);
      (gapCache['_q_'+src]||[]).forEach(el=>applyTopGap(el,gapCache[src]));
      delete gapCache['_q_'+src];
      if(gapHost[org]==='wait'){
        gapHost[org]='ok';
        (gapHostQ[org]||[]).forEach(measureTopGap);
        delete gapHostQ[org];
      }
    };
    probe.onerror=function(){
      gapCache[src]=0; delete gapCache['_q_'+src];
      if(gapHost[org]==='wait'){ gapHost[org]='bad'; delete gapHostQ[org]; }
    };
    probe.src=src;
  }

  // ── RAF animation loop ────────────────────────────────────────────────────
  function loop(ts){
    if(!R.lastTs) R.lastTs=ts;
    const dt=Math.min(64,ts-R.lastTs); R.lastTs=ts;
    const k=1-Math.exp(-dt/(CFG.hoverSpeed*0.3));
    let busy=false;
    R.states.forEach(s=>{
      const d=s.t-s.p;
      if(Math.abs(d)>0.02){ s.p+=d*k; busy=true; }
      else if(s.p!==s.t){ s.p=s.t; busy=true; }
      else return;
      const e=ss(s.p);
      s.it.style.setProperty('--rk-p',e.toFixed(4));
      s.it.classList.toggle('rk-live',e>0.02);
      // flip mode: only side (pos=0) and front (pos=1)
      const sideV=s.views.find(v=>v.pos===0);
      const frontV=s.views.find(v=>v.pos===1);
      const sideOp=Math.max(0,Math.min(1,(0.56-e)/0.12));
      const frontOp=Math.max(0,Math.min(1,(e-0.44)/0.12));
      if(sideV){
        sideV.el.style.opacity=sideOp;
        const ang=Math.min(1,e*2)*-84;
        sideV.el.style.transform=e<=0?'none':`perspective(900px) rotateY(${ang.toFixed(2)}deg)`;
      }
      if(frontV){
        frontV.el.style.opacity=frontOp;
        frontV.el.style.transform=e>=1?'none':`scale(${(0.92+0.08*e).toFixed(4)})`;
      }
      s.g.style.transform='none';
    });
    if(busy){ requestAnimationFrame(loop); } else { R.running=false; R.lastTs=0; }
  }
  function kick(){ if(!R.running){ R.running=true; requestAnimationFrame(loop); } }

  // ── caption ───────────────────────────────────────────────────────────────
  function setCaption(txt){
    const el=capRef.current; if(!el) return;
    const key=txt===null?'':txt;
    if(R.capCur===key) return;
    R.capCur=key;
    el.classList.add('rk-cap-swap');
    if(R.capTimer) clearTimeout(R.capTimer);
    R.capTimer=setTimeout(()=>{
      el.textContent=txt===null?CFG.defaultCaption:txt;
      el.classList.remove('rk-cap-swap');
    },160);
  }

  // ── hover ─────────────────────────────────────────────────────────────────
  function setHover(s){
    if(R.curHover===s) return;
    if(R.curHover){ R.curHover.t=0; applyWidth(R.curHover,0); }
    R.curHover=s;
    if(R.curHover){ R.curHover.t=1; applyWidth(R.curHover,1); setCaption(R.curHover.name||null); }
    else setCaption(null);
    kick();
  }

  // ── widths & heights ──────────────────────────────────────────────────────
  function aspectAt(s,e){ return 0.33+0.65*e; } // simplified: flip mode has 2 views
  function applyWidth(s,e){
    const hpx=s.hpx||s.g.getBoundingClientRect().height||CFG.garmentH;
    s.it.style.width=Math.round(hpx*aspectAt(s,e))+'px';
  }
  function measureHeights(){
    R.states.forEach(s=>{ s.hpx=s.g.getBoundingClientRect().height||0; });
  }
  function initWidths(){
    measureHeights();
    R.states.forEach(s=>applyWidth(s,s.t));
    if(R.slOn) slSyncWidths();
  }

  // ── focus overlay ─────────────────────────────────────────────────────────
  function fApply(){
    if(R.fGarment) R.fGarment.style.transform=`rotateY(${R.fAng.toFixed(2)}deg)`;
  }
  function fblendLoop(ts){
    if(!R.fLast) R.fLast=ts;
    const dt=Math.min(80,ts-R.fLast); R.fLast=ts;
    const d=R.fAngT-R.fAng;
    const k=1-Math.exp(-dt/(CFG.turnSpeed*0.22));
    if(Math.abs(d)<0.4){ R.fAng=R.fAngT; } else { R.fAng+=d*k; }
    fApply();
    if(R.fAng!==R.fAngT){ R.fAnim=requestAnimationFrame(fblendLoop); }
    else{
      if(R.fAng===-180){ R.fAng=R.fAngT=180; fApply(); }
      R.fAnim=null; R.fLast=0;
    }
  }
  function fgo(target){
    R.fAngT=target;
    const fo=focusRef.current; if(!fo) return;
    fo.querySelector('[data-rk-tab="front"]')?.classList.toggle('rk-tab-on',target===0);
    fo.querySelector('[data-rk-tab="back"]')?.classList.toggle('rk-tab-on',target===180);
    if(!R.fAnim) R.fAnim=requestAnimationFrame(fblendLoop);
  }
  function fEndDrag(){
    if(!R.fDrag) return; R.fDrag=false;
    fstageRef.current?.classList.remove('rk-dragging');
    const t=Math.abs(R.fAng)<90?0:(R.fAng>0?180:-180);
    R.fAngT=t;
    const fo=focusRef.current;
    fo?.querySelector('[data-rk-tab="front"]')?.classList.toggle('rk-tab-on',t===0);
    fo?.querySelector('[data-rk-tab="back"]')?.classList.toggle('rk-tab-on',t!==0);
    if(!R.fAnim) R.fAnim=requestAnimationFrame(fblendLoop);
  }

  function openFocus(s){
    const fo=focusRef.current; const fs=fstageRef.current;
    if(!fo||!fs) return;
    // build a mini version inside focus stage using real img elements
    fs.innerHTML='';
    // garment wrapper
    const wrap=document.createElement('div');
    wrap.className='rk-focus-garment';
    wrap.style.cssText='position:relative;width:100%;height:100%;transform-style:preserve-3d;';

    const mkView=(src,alt,extra)=>{
      const div=document.createElement('div');
      div.style.cssText=`position:absolute;inset:0;display:flex;align-items:flex-start;
        justify-content:center;backface-visibility:hidden;-webkit-backface-visibility:hidden;${extra}`;
      const img=document.createElement('img');
      img.src=src; img.alt=alt; img.style.cssText='height:100%;width:auto;max-width:none;filter:drop-shadow(0 8px 18px rgba(0,0,0,.22));';
      div.appendChild(img); return div;
    };
    const frontDiv=mkView(s.front,s.name+' front','');
    const backDiv =mkView(s.back, s.name+' back', 'transform:rotateY(180deg);');
    wrap.appendChild(frontDiv);
    wrap.appendChild(backDiv);
    fs.appendChild(wrap);
    R.fGarment=wrap; R.fAng=0; R.fAngT=0;

    // fill meta
    fo.querySelector('[data-rk-fname]').textContent=s.name;
    const fsubEl=fo.querySelector('[data-rk-fsub]');
    fsubEl.textContent=s.subtitle||''; fsubEl.style.display=s.subtitle?'':'none';
    const fpriceEl=fo.querySelector('[data-rk-fprice]');
    fpriceEl.textContent=s.price||''; fpriceEl.style.display=s.price?'':'none';
    const fidxEl=fo.querySelector('[data-rk-fidx]');
    if(fidxEl){
      const n=String(s.idx||1).padStart(2,'0');
      const tot=String(RACK_PRODUCTS.length).padStart(2,'0');
      fidxEl.textContent=`${n} / ${tot}`;
    }
    fo.querySelector('[data-rk-factionname]').textContent=s.name;
    const lbl=fo.querySelector('[data-rk-factionlabel]');
    if(lbl) lbl.textContent=s.btnLabel||'';
    const btn=fo.querySelector('[data-rk-factionbtn]');
    if(btn){ btn.href=s.btnUrl||'#'; }
    const bar=fo.querySelector('[data-rk-factionbar]');
    bar?.classList.toggle('rk-no-btn',!s.btnLabel);

    fo.querySelector('[data-rk-tab="front"]')?.classList.add('rk-tab-on');
    fo.querySelector('[data-rk-tab="back"]')?.classList.remove('rk-tab-on');

    fo.classList.add('rk-focus-open');
    fo.setAttribute('aria-hidden','false');
    requestAnimationFrame(()=>fo.classList.add('rk-focus-in'));
    try{ R.prevOverflow=document.body.style.overflow; document.body.style.overflow='hidden'; }catch(e){}
    if(!R.fAnim) R.fAnim=requestAnimationFrame(fblendLoop);
  }

  function closeFocus(){
    const fo=focusRef.current; if(!fo) return;
    if(R.fAnim){ cancelAnimationFrame(R.fAnim); R.fAnim=null; R.fLast=0; }
    R.fDrag=false; fstageRef.current?.classList.remove('rk-dragging');
    fo.classList.remove('rk-focus-in');
    fo.setAttribute('aria-hidden','true');
    if(R.fCloseTimer) clearTimeout(R.fCloseTimer);
    R.fCloseTimer=setTimeout(()=>{ fo.classList.remove('rk-focus-open'); R.fCloseTimer=null; },280);
    try{ document.body.style.overflow=''; }catch(e){}
  }

  // ── slider (mobile <600) ──────────────────────────────────────────────────
  function slAll(){ return [...(rackRef.current?.querySelectorAll('[data-rk-item]')||[]),...R.slClones]; }
  function slNearest(){
    const rack=rackRef.current; if(!rack) return 0;
    const center=rack.scrollLeft+rack.clientWidth/2;
    let best=0,bd=1e9;
    slAll().forEach((el,i)=>{
      const c=el.offsetLeft+el.offsetWidth/2;
      const d=Math.abs(c-center);
      if(d<bd){bd=d;best=i;}
    });
    return best;
  }
  function slGoto(i,smooth=true){
    const rack=rackRef.current; if(!rack) return;
    const el=slAll()[i]; if(!el) return;
    rack.scrollTo({left:el.offsetLeft-(rack.clientWidth-el.offsetWidth)/2,behavior:smooth?'smooth':'auto'});
  }
  function slNorm(){
    if(R.slSetW<=0||!R.slClones.length) return;
    const rack=rackRef.current; if(!rack) return;
    if(rack.scrollLeft>=R.slSetW) rack.scrollLeft=rack.scrollLeft-R.slSetW;
    else if(slNearest()>=RACK_PRODUCTS.length) rack.scrollLeft=Math.max(0,rack.scrollLeft-R.slSetW);
  }
  function slDotsUpdate(){
    if(!R.slDots.length||!dotsRef.current) return;
    const i=slNearest()%RACK_PRODUCTS.length;
    R.slDots.forEach((d,k)=>d.classList.toggle('rk-dot-on',k===i));
  }
  function slSyncWidths(){
    const items=[...(rackRef.current?.querySelectorAll('[data-rk-item]')||[])];
    R.slClones.forEach((c,k)=>{
      const it=items[k%items.length];
      if(it) c.style.width=it.style.width||getComputedStyle(it).width;
    });
    if(R.slClones.length&&items.length){
      R.slSetW=R.slClones[0].offsetLeft-items[0].offsetLeft;
    }
  }
  function slPause(ms=4000){ R.slHold=Date.now()+ms; }
  function slTick(){
    if(!R.slOn) return;
    if(R.slHold>Date.now()) return;
    const fo=focusRef.current;
    if(fo&&fo.classList.contains('rk-focus-open')) return;
    let idx=slNearest();
    if(R.slSetW>0&&idx>=RACK_PRODUCTS.length){
      idx-=RACK_PRODUCTS.length;
      const el=slAll()[idx]; const rack=rackRef.current;
      if(el&&rack) rack.scrollLeft=Math.max(0,el.offsetLeft-(rack.clientWidth-el.offsetWidth)/2);
    }
    slGoto(idx+1);
  }

  function slSetup(){
    const rack=rackRef.current; if(!rack||R.slOn||RACK_PRODUCTS.length<2) return;
    R.slOn=true;
    const items=[...rack.querySelectorAll('[data-rk-item]')];
    items.forEach((it,k)=>{
      const c=it.cloneNode(true);
      c.setAttribute('data-rk-clone','1');
      c.removeAttribute('data-rk-item');
      c.addEventListener('click',e=>{ e.preventDefault(); slPause(); openFocus(RACK_PRODUCTS[k]); });
      rack.appendChild(c);
      R.slClones.push(c);
    });
    slSyncWidths();
    // dots
    const dw=dotsRef.current; if(dw){
      dw.innerHTML='';
      R.slDots=RACK_PRODUCTS.map((_,k)=>{
        const b=document.createElement('button');
        b.type='button'; b.className='rk-dot'+(k===0?' rk-dot-on':'');
        b.setAttribute('aria-label',`Go to product ${k+1}`);
        b.addEventListener('click',()=>{ slPause(); slNorm(); slGoto(k); });
        dw.appendChild(b); return b;
      });
      let dOn=false;
      const dScrub=x=>{ const r=dw.getBoundingClientRect(); const f=Math.max(0,Math.min(0.999,(x-r.left)/r.width)); slGoto(Math.floor(f*RACK_PRODUCTS.length)); };
      dw.addEventListener('pointerdown',ev=>{ dOn=true; slPause(6000); slNorm(); dw.classList.add('rk-dots-drag'); try{dw.setPointerCapture(ev.pointerId);}catch(e){} dScrub(ev.clientX); ev.preventDefault(); });
      dw.addEventListener('pointermove',ev=>{ if(dOn) dScrub(ev.clientX); });
      const dEnd=()=>{ dOn=false; dw.classList.remove('rk-dots-drag'); slPause(); };
      dw.addEventListener('pointerup',dEnd); dw.addEventListener('pointercancel',dEnd);
    }
    rack.addEventListener('scroll',slDotsUpdate,{passive:true});
    rack.addEventListener('touchstart',()=>slPause(),{passive:true});
    rack.addEventListener('touchend',()=>{ slPause(); setTimeout(slNorm,450); },{passive:true});
    slGoto(0,false); slDotsUpdate();
    R.slTimer=setInterval(slTick,CFG.slideInterval);
  }
  function slTeardown(){
    if(!R.slOn) return; R.slOn=false;
    if(R.slTimer){ clearInterval(R.slTimer); R.slTimer=null; }
    R.slClones.forEach(c=>c.parentNode?.removeChild(c));
    R.slClones=[]; R.slSetW=0;
    if(dotsRef.current) dotsRef.current.innerHTML='';
    R.slDots=[];
    if(rackRef.current) rackRef.current.scrollLeft=0;
    initWidths();
  }
  function slCheck(){
    const mq=R.slMQ;
    if(mq&&mq.matches){ if(!R.slOn){initWidths();slSetup();}else slSyncWidths(); }
    else slTeardown();
  }

  // ── mount / unmount ───────────────────────────────────────────────────────
  useEffect(()=>{
    const rack=rackRef.current; if(!rack) return;
    const items=[...rack.querySelectorAll('[data-rk-item]')];

    // build state objects
    R.states=items.map((it,idx)=>{
      const g=it.querySelector('.rk-garment');
      const views=[...it.querySelectorAll('.rk-view')].map(el=>({
        el, pos:parseFloat(el.dataset.rkPos)
      })).sort((a,b)=>a.pos-b.pos);
      blend(views,0);
      return { it, g, views, p:0, t:0, hpx:0, name:RACK_PRODUCTS[idx]?.name||'' };
    });

    // fine-pointer hover
    const fineHover=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const onMove=ev=>{
      const {clientX:x,clientY:y}=ev;
      if(R.curHover){
        const cr=R.curHover.it.getBoundingClientRect();
        if(x>=cr.left-20&&x<=cr.right+20&&y>=cr.top-10&&y<=cr.bottom+40) return;
      }
      let best=null,bd=1e9;
      R.states.forEach(s=>{
        const r=s.it.getBoundingClientRect();
        if(y<r.top-10||y>r.bottom+40) return;
        if(x<r.left-2||x>r.right+2) return;
        const d=Math.abs(x-(r.left+r.right)/2);
        if(d<bd){bd=d;best=s;}
      });
      setHover(best||null);
    };
    const onLeave=()=>setHover(null);
    if(fineHover){ rack.addEventListener('mousemove',onMove); rack.addEventListener('mouseleave',onLeave); }

    // click → open focus
    items.forEach((it,idx)=>{
      it.addEventListener('click',e=>{ e.preventDefault(); openFocus(RACK_PRODUCTS[idx]); });
    });

    // focus stage drag
    const fs=fstageRef.current;
    if(fs){
      const onPD=ev=>{
        if(!R.fGarment) return;
        R.fDrag=true; R.fDragX=ev.clientX; R.fDragA=R.fAng;
        if(R.fAnim){cancelAnimationFrame(R.fAnim);R.fAnim=null;R.fLast=0;}
        try{fs.setPointerCapture(ev.pointerId);}catch(e){}
        fs.classList.add('rk-dragging'); ev.preventDefault();
      };
      const onPM=ev=>{ if(!R.fDrag) return; let a=R.fDragA+(ev.clientX-R.fDragX)*0.45; a=Math.max(-220,Math.min(220,a)); R.fAng=R.fAngT=a; fApply(); };
      fs.addEventListener('pointerdown',onPD);
      fs.addEventListener('pointermove',onPM);
      fs.addEventListener('pointerup',fEndDrag);
      fs.addEventListener('pointercancel',fEndDrag);
      fs.addEventListener('lostpointercapture',fEndDrag);
    }

    // focus close
    const fo=focusRef.current;
    fo?.querySelector('.rk-focus-close')?.addEventListener('click',e=>{ e.preventDefault();e.stopPropagation();closeFocus(); });
    fo?.addEventListener('click',e=>{ if(e.target===fo) closeFocus(); });
    fo?.querySelector('[data-rk-tab="front"]')?.addEventListener('click',()=>fgo(0));
    fo?.querySelector('[data-rk-tab="back"]')?.addEventListener('click',()=>fgo(180));

    const onKey=e=>{ if(e.key==='Escape'&&fo?.classList.contains('rk-focus-open')) closeFocus(); };
    document.addEventListener('keydown',onKey);

    // top-gap + image preload
    rack.querySelectorAll('img').forEach(im=>{
      im.addEventListener('load',()=>{ initWidths(); measureTopGap(im); },{once:true});
      if(im.complete&&im.naturalWidth>0) measureTopGap(im);
    });
    initWidths();
    window.addEventListener('load',initWidths);
    window.addEventListener('resize',initWidths);

    // mobile slider
    R.slMQ=window.matchMedia('(max-width:599.98px)');
    slCheck();
    if(R.slMQ.addEventListener) R.slMQ.addEventListener('change',slCheck);
    else if(R.slMQ.addListener) R.slMQ.addListener(slCheck);
    window.addEventListener('resize',()=>{ if(R.slOn) slSyncWidths(); });

    return ()=>{
      try{ document.body.style.overflow=''; }catch(e){}
      if(fineHover){ rack.removeEventListener('mousemove',onMove); rack.removeEventListener('mouseleave',onLeave); }
      document.removeEventListener('keydown',onKey);
      window.removeEventListener('load',initWidths);
      window.removeEventListener('resize',initWidths);
      slTeardown();
      if(R.fAnim) cancelAnimationFrame(R.fAnim);
      if(R.running){ R.running=false; }
      if(R.capTimer) clearTimeout(R.capTimer);
      if(R.fCloseTimer) clearTimeout(R.fCloseTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <section className="rk-sec">
      <div className="rk-wrap">

        {/* Rail caption */}
        <div className="rk-railcap">
          <span>NEW COLLECTION</span>
          <span className="rk-railcap-sep"></span>
          <span className="rk-railcap-dim">PREMIUM STREETWEAR</span>
        </div>

        {/* Rod + Rack */}
        <div className="rk-stage">
          <div className="rk-rod">
            <img className="rk-rod-photo" src={ROD_IMG} alt="" loading="eager" decoding="async" />
          </div>

          <div className="rk-rack" ref={rackRef}>
            {RACK_PRODUCTS.map((p,idx)=>(
              <div
                key={p.id}
                className="rk-item"
                data-rk-item=""
                data-name={p.name}
                data-sub={p.subtitle}
                data-price={p.price}
                data-btn-label={p.btnLabel}
                data-btn-url={p.btnUrl}
                data-idx={idx+1}
              >
                <div className="rk-garment">
                  {/* side view */}
                  <div className="rk-view" data-rk-pos="0">
                    <img src={p.side} alt={`${p.name} side`} loading="eager" decoding="async" />
                  </div>
                  {/* front view */}
                  <div className="rk-view" data-rk-pos="1">
                    <img src={p.front} alt={`${p.name} front`} loading="eager" decoding="async" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile dots */}
        <div className="rk-dots" ref={dotsRef} aria-hidden="true"></div>

        {/* Caption */}
        <div className="rk-caption">
          <div className="rk-cap-name" ref={capRef}>{CFG.defaultCaption}</div>
          <div className="rk-cta-w">
            <Link to="/recommend" className="rk-cta rk-cta-primary">
              <span>Shop the Collection</span>
            </Link>
            <Link to="/wardrobe" className="rk-cta rk-cta-secondary">
              <span>My Wardrobe</span>
            </Link>
          </div>
        </div>

        {/* Focus overlay */}
        <div className="rk-focus" ref={focusRef} aria-hidden="true">
          <button className="rk-focus-close" type="button">
            <span>Close</span>
            <span className="rk-x" aria-hidden="true"></span>
          </button>
          <div className="rk-focus-stagewrap">
            <div className="rk-focus-stage" ref={fstageRef}></div>
          </div>
          <div className="rk-focus-meta">
            <div className="rk-focus-idx" data-rk-fidx></div>
            <div className="rk-focus-name" data-rk-fname></div>
            <div className="rk-focus-sub"  data-rk-fsub></div>
            <div className="rk-focus-price" data-rk-fprice></div>
            <div className="rk-focus-tabs">
              <button className="rk-tab rk-tab-front rk-tab-on" type="button" data-rk-tab="front">Front</button>
              <button className="rk-tab rk-tab-back"  type="button" data-rk-tab="back">Back</button>
            </div>
            <div className="rk-focus-action" data-rk-factionbar>
              <div className="rk-focus-action-name" data-rk-factionname></div>
              <a className="rk-focus-action-btn" data-rk-factionbtn href="#" target="_self">
                <span data-rk-factionlabel></span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
