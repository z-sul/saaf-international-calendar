import "./globals.css";

export const metadata = {
  title: "البرنامج الزمني الخارجي | الاتحاد السعودي للسهام",
  description:
    "البرنامج الزمني للبطولات والمعسكرات والمشاركات الخارجية للاتحاد السعودي للسهام للموسم الرياضي 2026 / 2027.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
