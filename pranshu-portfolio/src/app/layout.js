// src/app/layout.js
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="pranshuTheme">
      <body className="antialiased pt-16">
        <Header />
        {children}
      </body>
    </html>
  );
}
