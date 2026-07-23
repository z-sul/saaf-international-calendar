function escapeICS(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function compactDate(dateString) {
  return dateString.replaceAll("-", "");
}

function nextDay(dateString) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

function foldLine(line) {
  const limit = 70;
  if (line.length <= limit) return line;

  const parts = [];
  let remaining = line;

  while (remaining.length > limit) {
    parts.push(remaining.slice(0, limit));
    remaining = remaining.slice(limit);
  }

  parts.push(remaining);
  return parts.join("\r\n ");
}

export function buildCalendar(events) {
  const orderedEvents = [...events].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );

  const eventBlocks = orderedEvents
    .map((event) => {
      const lines = [
        "BEGIN:VEVENT",
        `UID:${escapeICS(event.id)}@saaf.events`,
        `DTSTAMP:${new Date()
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}Z$/, "Z")}`,
        `DTSTART;VALUE=DATE:${compactDate(event.startDate)}`,
        `DTEND;VALUE=DATE:${compactDate(nextDay(event.endDate))}`,
        `SUMMARY:${escapeICS(event.title)}`,
        `DESCRIPTION:${escapeICS(
          "مشاركة خارجية للاتحاد السعودي للسهام"
        )}`,
        `LOCATION:${escapeICS(event.location || "")}`,
        "STATUS:CONFIRMED",
        "TRANSP:TRANSPARENT",
        "END:VEVENT",
      ];

      return lines.map(foldLine).join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Saudi Archery Federation//External Program//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:البرنامج الزمني الخارجي للاتحاد السعودي للسهام",
    "X-WR-CALDESC:البطولات والمعسكرات والمشاركات الخارجية للموسم الرياضي 2026 / 2027",
    "X-WR-TIMEZONE:Asia/Riyadh",
    "X-APPLE-CALENDAR-COLOR:#176B3A",
    eventBlocks,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function calendarResponse(calendar) {
  return new Response(calendar, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="saaf-external-program-2026-2027.ics"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
