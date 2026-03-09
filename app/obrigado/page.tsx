import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obrigado | XGYM Body Shape",
  description:
    "Sua solicitação foi recebida. Finalize o contato pelo WhatsApp da unidade.",
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

export default function ObrigadoPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-shell">
        <span className="eyebrow">XGYM Body Shape</span>
        <h1>Solicitação enviada.</h1>
        <p>
          Seu próximo passo é concluir o agendamento pelo WhatsApp da unidade.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/">
            Voltar para a landing
          </Link>
        </div>
      </div>
    </main>
  );
}
