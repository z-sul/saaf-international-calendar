import { externalEvents } from "../../data/events";
import { buildCalendar, calendarResponse } from "../../lib/ics";
export async function GET(request) {
 const lang=new URL(request.url).searchParams.get("lang")==="en"?"en":"ar";
 const confirmedEvents=externalEvents.filter(event=>event.startDate&&event.endDate);
 return calendarResponse(buildCalendar(confirmedEvents,lang),lang);
}
