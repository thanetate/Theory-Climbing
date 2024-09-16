// app/layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "../components/header/Menu";
import Footer from "../components/footer/footer";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Theory Climbing",
  description: "Theory Climbing offers high-quality climbing apparel and gear designed for enthusiasts and professionals. Discover durable, stylish, and preformance-focused clothing for your climbing adventures.",
  keywords: "climbing apparel, climbing gear, climbing clothing, premium climbing wear, Theory Climbing, climbing gear for enthusiasts, durable climbing clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}