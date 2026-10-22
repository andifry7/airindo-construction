import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: { default: "Airindo Construction", template: "%s | Airindo Construction" },
  description: "Solusi konstruksi dan engineering terintegrasi untuk kebutuhan industri dan energi.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
