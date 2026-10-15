function escapeICS(value="") {return String(value).replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");}
function nextDay(s){const d=new Date(`${s}T00:00:00Z`);d.setUTCDate(d.getUTCDate()+1);return d.toISOString().slice(0,10).replaceAll("-","");}
function fold(line){const bytes=new TextEncoder();let output="",current="",length=0;for(const ch of line){const n=bytes.encode(ch).length;if(length+n>73){output+=current+"\r\n ";current="";length=1;}current+=ch;length+=n;}return output+current;}
export function buildCalendar(events,lang="ar"){
 const en=lang==="en";
 const blocks=[...events].sort((a,b)=>a.startDate.localeCompare(b.startDate)).map(e=>[
 "BEGIN:VEVENT",`UID:${escapeICS(e.id)}@saaf.events`,`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z")}`,
 `DTSTART;VALUE=DATE:${e.startDate.replaceAll("-","")}`,`DTEND;VALUE=DATE:${nextDay(e.endDate)}`,
 `SUMMARY:${escapeICS(en?e.titleEn:e.title)}`,`DESCRIPTION:${escapeICS(en?"International participation – Saudi Archery Federation":"مشاركة خارجية للاتحاد السعودي للسهام")}`,
 `LOCATION:${escapeICS(en?e.locationEn:e.location)}`, "STATUS:CONFIRMED","TRANSP:TRANSPARENT","END:VEVENT"].map(fold).join("\r\n")).join("\r\n");
 return ["BEGIN:VCALENDAR","VERSION:2.0",`PRODID:-//Saudi Archery Federation//International Calendar//${en?"EN":"AR"}`,"CALSCALE:GREGORIAN","METHOD:PUBLISH",`X-WR-CALNAME:${en?"Saudi Archery Federation – International Championships":"البرنامج الزمني الخارجي للاتحاد السعودي للسهام"}`,`X-WR-CALDESC:${en?"International championships and camps 2026–2027":"البطولات والمعسكرات والمشاركات الخارجية للموسم الرياضي 2026 / 2027"}`,"X-WR-TIMEZONE:Asia/Riyadh","X-APPLE-CALENDAR-COLOR:#176B3A",blocks,"END:VCALENDAR"].map(fold).join("\r\n");
}
export function calendarResponse(calendar,lang="ar") {return new Response(calendar,{status:200,headers:{"Content-Type":"text/calendar; charset=utf-8","Content-Disposition":`attachment; filename="saaf-international-2026-2027-${lang}.ics"`,"Cache-Control":"no-cache, no-store, must-revalidate","Access-Control-Allow-Origin":"*"}});}
