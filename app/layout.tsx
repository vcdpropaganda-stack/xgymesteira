import type { Metadata } from "next";
import Script from "next/script";
import { GTMManager } from "@/components/gtm-manager";
import "./globals.css";

const GTM_ID = "GTM-N645NPMW";

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
      <head>
        <Script id="xgym-gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <GTMManager />
      </body>
    </html>
  );
}
