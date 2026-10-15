"use client";
import { useState } from "react";
import { externalEvents } from "./data/events";
const labels = {
 ar: { season:"الموسم الرياضي 2026 / 2027", title:"البرنامج الزمني الخارجي للاتحاد السعودي للسهام", intro:"البطولات والمعسكرات والمشاركات الدولية للاتحاد السعودي للسهام. يتم تحديث المواعيد عند اعتمادها.", count:"مشاركة خارجية", confirmed:"موعد معتمد", events:"المشاركات الخارجية", arabic:"تحميل التقويم بالعربية", english:"تحميل التقويم بالإنجليزية", pending:"الموعد يحدد لاحقًا", from:"من", to:"إلى", federation:"الاتحاد السعودي للسهام", choose:"لغة العرض" },
 en: { season:"Sports Season 2026 / 2027", title:"Saudi Archery Federation International Championships Calendar", intro:"International championships, training camps and overseas events for the Saudi Archery Federation. Dates are updated as they are confirmed.", count:"International Events", confirmed:"Confirmed Dates", events:"International Events", arabic:"Download Arabic Calendar", english:"Download English Calendar", pending:"Date to be confirmed", from:"From", to:"to", federation:"Saudi Archery Federation", choose:"Display Language" }
};
function formatDate(date,lang) {return new Intl.DateTimeFormat(lang==="ar"?"ar-SA-u-ca-gregory":"en-GB",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(`${date}T12:00:00Z`));}
export default function HomePage(){
 const [lang,setLang]=useState("ar");const t=labels[lang];const confirmedCount=externalEvents.filter(e=>e.startDate&&e.endDate).length;
 return <main dir={lang==="ar"?"rtl":"ltr"} style={{minHeight:"100vh",background:"radial-gradient(circle at top,rgba(23,107,58,.12),transparent 32%),linear-gradient(180deg,#eef5f1 0%,#ffffff 100%)",padding:"28px 16px",color:"#12251a"}}>
 <section style={{maxWidth:940,margin:"0 auto"}}>
 <header style={{background:"white",border:"1px solid #dfe8e2",borderRadius:28,padding:"38px 24px",textAlign:"center",boxShadow:"0 20px 60px rgba(20,70,40,.10)"}}>
 <div style={{display:"flex",justifyContent:"flex-end",gap:8,alignItems:"center",flexWrap:"wrap"}}><span style={{color:"#647269",fontSize:14}}>{t.choose}:</span>{["ar","en"].map(code=><button key={code} onClick={()=>setLang(code)} aria-pressed={lang===code} style={{border:"1px solid #176b3a",borderRadius:10,padding:"9px 16px",cursor:"pointer",background:lang===code?"#176b3a":"white",color:lang===code?"white":"#176b3a",fontWeight:700}}>{code.toUpperCase()}</button>)}</div>
 <img src="/logo.png" alt={t.federation} style={{width:210,maxWidth:"60vw",height:"auto",display:"block",margin:"0 auto"}}/>
 <div style={{display:"inline-block",marginTop:18,padding:"8px 16px",background:"#edf6ef",color:"#176b3a",borderRadius:99,fontWeight:700,fontSize:14}}>{t.season}</div>
 <h1 style={{margin:"18px auto 0",fontSize:"clamp(28px,5vw,48px)",lineHeight:1.4,fontWeight:800,maxWidth:780}}>{t.title}</h1>
 <p style={{maxWidth:700,margin:"20px auto 0",color:"#647269",fontSize:18,lineHeight:1.9}}>{t.intro}</p>
 <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:28}}>
 <a href="/api/calendar?lang=ar" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"15px 22px",borderRadius:14,background:lang==="ar"?"#176b3a":"#e8f2eb",color:lang==="ar"?"white":"#176b3a",textDecoration:"none",fontSize:16,fontWeight:800}}>↓ {t.arabic}</a>
 <a href="/api/calendar?lang=en" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"15px 22px",borderRadius:14,background:lang==="en"?"#176b3a":"#e8f2eb",color:lang==="en"?"white":"#176b3a",textDecoration:"none",fontSize:16,fontWeight:800}}>↓ {t.english}</a>
 </div></header>
 <section style={{marginTop:20,background:"white",border:"1px solid #dfe8e2",borderRadius:22,padding:"28px 22px",boxShadow:"0 14px 36px rgba(0,0,0,.05)"}}>
 <div style={{display:"flex",justifyContent:"center",gap:46,flexWrap:"wrap",textAlign:"center",marginBottom:28}}>{[[externalEvents.length,t.count],[confirmedCount,t.confirmed]].map(([num,label])=><div key={label}><div style={{fontSize:42,fontWeight:800,color:"#176b3a"}}>{num}</div><div style={{fontSize:17,fontWeight:700}}>{label}</div></div>)}</div>
 <h2 style={{textAlign:"center",fontSize:27,margin:"0 0 22px"}}>{t.events}</h2>
 <div style={{display:"grid",gap:12}}>{externalEvents.map(e=><article key={e.id} style={{padding:19,border:"1px solid #e3e9e5",borderRadius:15,background:"#f8faf8"}}><h3 style={{margin:"0 0 8px",fontSize:20}}>{lang==="ar"?e.title:e.titleEn}</h3><div style={{color:"#607067",lineHeight:1.9}}>{e.startDate&&e.endDate?`${t.from} ${formatDate(e.startDate,lang)} ${t.to} ${formatDate(e.endDate,lang)}`:t.pending}{` — ${lang==="ar"?e.location:e.locationEn}`}</div></article>)}</div>
 </section><footer style={{textAlign:"center",padding:"28px 10px 4px",color:"#758178"}}>© {t.federation}</footer></section></main>;
}
