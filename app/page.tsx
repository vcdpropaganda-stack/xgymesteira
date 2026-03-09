import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Body Shape na XGYM | Agende sua sessão pelo WhatsApp",
  description:
    "Descubra a experiência Body Shape na XGYM, entenda os benefícios da esteira encapsulada e reserve sua sessão direto pelo WhatsApp.",
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

export default function Home() {
  return <LandingPage />;
}
