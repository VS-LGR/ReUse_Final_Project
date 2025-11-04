import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://reuse-app.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReUse - Plataforma de Trocas Sustentáveis",
    template: "%s | ReUse"
  },
  description: "Conecte-se com outros usuários para trocar itens e promover a sustentabilidade. Economize dinheiro e ajude o meio ambiente através de trocas conscientes.",
  keywords: [
    "trocas sustentáveis",
    "economia circular",
    "reutilização",
    "meio ambiente",
    "sustentabilidade",
    "trocas de produtos",
    "compartilhamento",
    "reuso",
    "consumo consciente",
    "plataforma de trocas",
    "trocar produtos",
    "economia colaborativa"
  ],
  authors: [{ name: "ReUse Team" }],
  creator: "ReUse",
  publisher: "ReUse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "ReUse",
    title: "ReUse - Plataforma de Trocas Sustentáveis",
    description: "Conecte-se com outros usuários para trocar itens e promover a sustentabilidade. Economize dinheiro e ajude o meio ambiente através de trocas conscientes.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ReUse - Plataforma de Trocas Sustentáveis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReUse - Plataforma de Trocas Sustentáveis",
    description: "Conecte-se com outros usuários para trocar itens e promover a sustentabilidade. Economize dinheiro e ajude o meio ambiente através de trocas conscientes.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@reuse_app",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "sustainability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
