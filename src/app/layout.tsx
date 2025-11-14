import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suhruth Madarapu | Machine Learning Developer",
  description: "Machine Learning Developer specializing in audio deepfake detection, GPU-accelerated computing, and AI systems. Python, TensorFlow, CUDA expertise.",
  keywords: ["machine learning", "deep learning", "AI", "Python", "TensorFlow", "GPU", "CUDA", "audio deepfake", "developer"],
  authors: [{ name: "Suhruth Madarapu" }],
  creator: "Suhruth Madarapu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suhruth-portfolio.vercel.app",
    siteName: "Suhruth Madarapu | ML Developer",
    title: "Suhruth Madarapu | Machine Learning Developer",
    description: "Machine Learning Developer specializing in audio deepfake detection, GPU-accelerated computing, and AI systems.",
    images: [
      {
        url: "/DSC_2447.JPG",
        width: 1200,
        height: 630,
        alt: "Suhruth Madarapu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suhruth Madarapu | ML Developer",
    description: "Machine Learning Developer specializing in audio deepfake detection, GPU-accelerated computing, and AI systems.",
    images: ["/DSC_2447.JPG"],
    creator: "@suhruth_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/DSC_2447.JPG',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased touch-manipulation`}
      >
        {children}
      </body>
    </html>
  );
}
