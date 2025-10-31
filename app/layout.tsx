import "./globals.css";

export const metadata = {
  title: "Mini LMS Prototype",
  description: "Video learning platform built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
