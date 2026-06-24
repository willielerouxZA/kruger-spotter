import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kruger Spotter",
  description: "Family animal spotting game for Kruger National Park",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script dangerouslySetInnerHTML={{ __html: `if("serviceWorker"in navigator)navigator.serviceWorker.register("/sw.js")` }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
