import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bloggið mitt",
  description: "Blogg byggt á Next.js og Sanity CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="is"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="site-wrapper">
          <header className="site-header">
            <nav>
              <Link href="/" className="nav-logo">
               Bloggið okkar
              </Link>
              <ul className="nav-links">
                <li>
                  <Link href="/">Heim</Link>
                </li>
                <li>
                  <Link href="/posts">Greinar</Link>
                </li>
              </ul>
            </nav>
          </header>

          <main style={{ flex: 1 }}>{children}</main>

          <footer className="site-footer">
            <p>
              Byggt með{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Next.js
              </a>{" "}
              og{" "}
              <a
                href="https://sanity.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sanity CMS
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
