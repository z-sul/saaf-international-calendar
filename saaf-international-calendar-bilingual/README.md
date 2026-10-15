# Saudi Archery Federation – International Calendar (Arabic / English)

Next.js 14 project for the international championships calendar.

## Deploy
Upload all folders/files to the existing `z-sul/saaf-international-calendar` GitHub repository (replace the old project files). Vercel should redeploy automatically if connected.

## Calendar downloads
- Arabic: `/api/calendar?lang=ar`
- English: `/api/calendar?lang=en`
- Old link `/api/calendar` still downloads Arabic for backwards compatibility.

Events with missing dates are displayed on the site but not included in `.ics` downloads. Translation labels should be reviewed against the official competition names before publication.
