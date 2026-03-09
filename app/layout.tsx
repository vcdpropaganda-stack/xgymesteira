import type { Metadata } from "next";
import { GTMManager } from "@/components/gtm-manager";
import "./globals.css";

export const metadata: Metadata = {
  title: "XGYM Body Shape | Agende sua sessão pelo WhatsApp",
  description:
    "Landing page oficial da experiência Body Shape na XGYM. Entenda como funciona, descubra os benefícios e agende sua sessão pelo WhatsApp.",
  metadataBase: new URL("https://xgym.example.com"),
  icons: {
    icon: [
      {
        url: "https://xgymct.com.br/wp-content/uploads/2025/03/Logo-xgym1.webp",
        type: "image/webp"
      }
    ],
    shortcut: [
      {
        url: "https://xgymct.com.br/wp-content/uploads/2025/03/Logo-xgym1.webp",
        type: "image/webp"
      }
    ],
    apple: [
      {
        url: "https://xgymct.com.br/wp-content/uploads/2025/03/Logo-xgym1.webp",
        type: "image/webp"
      }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <GTMManager />
      </body>
    </html>
  );
}
