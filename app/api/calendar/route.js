import { externalEvents } from "../../data/events";
import { buildCalendar, calendarResponse } from "../../lib/ics";

export async function GET() {
  const confirmedEvents = externalEvents.filter(
    (event) => event.startDate && event.endDate
  );

  return calendarResponse(buildCalendar(confirmedEvents));
}
