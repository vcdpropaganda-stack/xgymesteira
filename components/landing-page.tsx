"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  CarFront,
  ChevronUp,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  MessageCircleQuestion,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  Zap
} from "lucide-react";
import { siUber, siWaze } from "simple-icons";
import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=5511994045454&text=ola%20quero%20agendar%20um%20horraio%20na%20esteira%20bodytech";
const APP_BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_APP_URL || WHATSAPP_URL;
const PHONE_URL = "tel:+5511994045454";
const PHONE_LABEL = "(11) 99404-5454";
const XGYM_ADDRESS =
  "R. Prof. João Batista Curado, 40 - Vila Virgínia, Jundiaí - SP, 13209-020";
const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=R.%20Prof.%20Jo%C3%A3o%20Batista%20Curado%2C%2040%20-%20Vila%20Virg%C3%ADnia%2C%20Jundia%C3%AD%20-%20SP%2C%2013209-020&travelmode=driving";
const WAZE_URL =
  "https://waze.com/ul?q=R.%20Prof.%20Jo%C3%A3o%20Batista%20Curado%2C%2040%20-%20Vila%20Virg%C3%ADnia%2C%20Jundia%C3%AD%20-%20SP%2C%2013209-020&navigate=yes&utm_source=xgym-body-shape";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=R.%20Prof.%20Jo%C3%A3o%20Batista%20Curado%2C%2040%20-%20Vila%20Virg%C3%ADnia%2C%20Jundia%C3%AD%20-%20SP%2C%2013209-020&z=16&output=embed";
const UBER_URL =
  "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[nickname]=XGYM%20Jundia%C3%AD&dropoff[formatted_address]=R.%20Prof.%20Jo%C3%A3o%20Batista%20Curado%2C%2040%20-%20Vila%20Virg%C3%ADnia%2C%20Jundia%C3%AD%20-%20SP%2C%2013209-020";
const HERO_IMAGE_URL =
  "https://s2-glamour.glbimg.com/job41fcQGd8aF7vUcRTzcRRO0HU=/0x0:1300x1109/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_ba3db981e6d14e54bb84be31c923b00c/internal_photos/bs/2023/y/4/ziK9nkTHSAW2VYcPLrDw/esteira.jpg";
const VIDEO_CARD_IMAGE_URL = "/video-card-cover.jpg";
const REEL_EMBED_URL =
  "https://www.instagram.com/reel/DURU-Qgkk10/embed/captioned/";

const heroStats = [
  { value: "30 min", label: "Máximo resultado, metade do tempo", icon: Clock3 },
  { value: "Tecnologia", label: "Vácuo + Infravermelho", icon: MessageCircle },
  { value: "VIP", label: "Sala privativa só para você", icon: ShieldCheck }
];

const featureCards = [
  {
    title: "Reserve seu Horário VIP",
    text: "Esqueça a burocracia. Chame no WhatsApp ou use o app, escolha a melhor hora para você e garanta sua sala privativa."
  },
  {
    title: "A Tecnologia Trabalha por Você",
    text: "Você faz uma caminhada em ritmo confortável. Enquanto isso, o vácuo e o infravermelho multiplicam a queima calórica e estimulam a circulação nas pernas e abdômen."
  },
  {
    title: "Saia Desinchada e Acelerada",
    text: "O efeito 'Underpressure' age como uma drenagem linfática profunda. Você sai da sessão mais leve e com o metabolismo ativado para o resto do dia."
  }
];

const benefitCards = [
  {
    icon: Zap,
    text: "Tempo é Dinheiro: Apenas 30 minutos na sua agenda. Você entra, treina, e volta para a sua rotina rapidamente."
  },
  {
    icon: Clock3,
    text: "Zero Condicionamento Exigido: Ideal até para quem está sedentário ou não gosta do ambiente de musculação pesada."
  },
  {
    icon: Sparkles,
    text: "Foco em Celulite e Flacidez: A combinação de vácuo e infravermelho atua exatamente nas áreas onde o treino comum demora muito mais para dar resultado."
  },
  {
    icon: MessageCircleQuestion,
    text: "Atendimento Premium Jundiaí: Você é tratada como VIP do momento que entra até a hora que sai. Suporte total pelo WhatsApp."
  }
];

const officialGallery = [
  {
    title: "Privacidade Absoluta",
    text: "Treine no seu ritmo, ouvindo sua música ou assistindo sua série, sem olhares curiosos. O ambiente é climatizado e exclusivo para você.",
    image:
      "https://vacuactiv.com/wp-content/uploads/2025/08/bodyshape-treadmill-side-view.jpg"
  },
  {
    title: "Pressão Negativa (Vácuo)",
    text: "O vácuo estimula intensamente a circulação sanguínea de baixo para cima, agindo como uma drenagem linfática que ataca diretamente a retenção de líquidos e a celulite.",
    image:
      "https://vacuactiv.com/wp-content/uploads/2025/08/bodyshape-underpressure.jpg"
  },
  {
    title: "Módulo Infravermelho",
    text: "O aquecimento profundo aumenta a temperatura corporal e a vasodilatação. Isso acelera a queima de gordura e promove a renovação celular, melhorando a firmeza da pele.",
    image:
      "https://vacuactiv.com/wp-content/uploads/2025/08/bodyshape-infrared-ir.jpg"
  }
];

const realCases = [
  {
    name: "Mariana C.",
    title: "Achei que 30 minutos não fariam diferença",
    text: '"Achei que 30 minutos não fariam diferença, mas saio suando e me sentindo super desinchada. O ambiente VIP é um bônus incrível para quem tem vergonha de academia!"'
  },
  {
    name: "Fernanda L.",
    title: "Odiava esteira convencional",
    text: '"Odiava esteira convencional. Com a Body Shape, o tempo voa. Senti meu metabolismo acelerar e a retenção de líquido sumiu logo nas primeiras sessões."'
  },
  {
    name: "Beatriz L.",
    title: "O melhor investimento para a minha agenda lotada",
    text: '"O melhor investimento para a minha agenda lotada. O atendimento é impecável e o infravermelho deixa a pele com um aspecto maravilhoso."'
  }
];

const faqs = [
  {
    question: "Tenho claustrofobia. Vou me sentir presa?",
    answer:
      "De forma alguma! A cápsula da esteira isola apenas da cintura para baixo. Seu tronco, braços e cabeça ficam 100% livres, e você tem o controle total para abrir o equipamento a qualquer momento."
  },
  {
    question: "Preciso de roupa específica para usar?",
    answer:
      "Recomendamos usar um top ou camiseta e um short de ginástica curto, além de um tênis limpo. É importante que a pele das pernas fique exposta para receber os benefícios diretos do infravermelho e do vácuo."
  },
  {
    question: "Quem não tem condicionamento físico pode fazer?",
    answer:
      "Com certeza! O exercício é uma caminhada em velocidade controlada por você. A mágica acontece pela tecnologia da máquina, e não pelo seu desgaste físico extremo. É o começo perfeito para sair do sedentarismo."
  },
  {
    question: "Qual o valor da sessão?",
    answer:
      "Temos pacotes avulsos e planos mensais que cabem na sua rotina e no seu bolso. Chame nossa equipe no WhatsApp e pergunte sobre a Condição Especial para Primeira Sessão!"
  }
];

function DeviceScene() {
  return (
      <div className="device-scene photo-scene">
      <div className="device-orbit device-orbit--one" />
      <div className="device-orbit device-orbit--two" />
      <div className="photo-frame">
        <Image
          src={HERO_IMAGE_URL}
          alt="Esteira Body Shape"
          fill
          className="photo-frame__image"
          sizes="(max-width: 720px) 92vw, (max-width: 1120px) 70vw, 46vw"
          priority
        />
      </div>
      <div className="floating-chip floating-chip--left">Body Shape</div>
      <div className="floating-chip floating-chip--right">XGYM</div>
      <div className="floating-chip floating-chip--bottom">Garanta sua sessão experimental</div>
    </div>
  );
}

function IconBadge({
  icon: Icon
}: {
  icon: LucideIcon;
}) {
  return (
    <span className="icon-badge" aria-hidden="true">
      <Icon size={18} strokeWidth={2.2} />
    </span>
  );
}

function BrandIcon({
  path,
  label
}: {
  path: string;
  label: string;
}) {
  return (
    <span className="brand-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" role="img">
        <title>{label}</title>
        <path d={path} />
      </svg>
    </span>
  );
}

export function LandingPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isBookingChooserOpen, setIsBookingChooserOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unitTapCount, setUnitTapCount] = useState(0);
  const galleryTrackRef = useRef<HTMLDivElement | null>(null);
  const galleryCardRefs = useRef<Array<HTMLElement | null>>([]);
  const benefitTrackRef = useRef<HTMLDivElement | null>(null);
  const benefitCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const unitTapCountRef = useRef(0);
  const unitTapTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const track = galleryTrackRef.current;
    if (!track) return;

    const updateActiveCard = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      galleryCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveGalleryIndex(closestIndex);
    };

    updateActiveCard();
    track.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    return () => {
      track.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, []);

  useEffect(() => {
    const track = benefitTrackRef.current;
    if (!track) return;

    const updateActiveCard = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      benefitCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveBenefitIndex(closestIndex);
    };

    updateActiveCard();
    track.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);

    return () => {
      track.removeEventListener("scroll", updateActiveCard);
      window.removeEventListener("resize", updateActiveCard);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (unitTapTimeoutRef.current) {
        window.clearTimeout(unitTapTimeoutRef.current);
      }
    };
  }, []);

  const scrollToGalleryCard = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, officialGallery.length - 1));
    const nextCard = galleryCardRefs.current[nextIndex];
    if (!nextCard) return;

    nextCard.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
    setActiveGalleryIndex(nextIndex);
  };

  const scrollToBenefitCard = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, benefitCards.length - 1));
    const nextCard = benefitCardRefs.current[nextIndex];
    if (!nextCard) return;

    nextCard.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
    setActiveBenefitIndex(nextIndex);
  };

  const handleScrollToTop = () => {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUnitEasterEgg = () => {
    unitTapCountRef.current += 1;

    if (unitTapTimeoutRef.current) {
      window.clearTimeout(unitTapTimeoutRef.current);
    }

    unitTapTimeoutRef.current = window.setTimeout(() => {
      unitTapCountRef.current = 0;
      setUnitTapCount(0);
      unitTapTimeoutRef.current = null;
    }, 2200);

    setUnitTapCount(unitTapCountRef.current);

    if (unitTapCountRef.current >= 5) {
      unitTapCountRef.current = 0;
      setUnitTapCount(0);
      if (unitTapTimeoutRef.current) {
        window.clearTimeout(unitTapTimeoutRef.current);
        unitTapTimeoutRef.current = null;
      }
      window.dispatchEvent(new CustomEvent("xgym:open-gtm-config"));
    }
  };

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="brand-lockup" href="/">
          <span className="brand-logo">
            <Image
              src="https://xgymct.com.br/wp-content/uploads/2025/03/Logo-xgym1.webp"
              alt="XGYM"
              width={180}
              height={54}
              priority
              className="brand-logo__image"
            />
          </span>
        </Link>

        <nav className="topbar-links" aria-label="Navegação principal">
          <a href="#como-funciona">Como funciona</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#faq">FAQ</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Garantir Minha Sessão Experimental
          </a>
        </nav>

        <div className="topbar-actions">
          <button
            className="topbar-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={18} strokeWidth={2.4} />
            Menu
          </button>
          <button
            className="btn btn-primary topbar-action topbar-action--primary"
            type="button"
            onClick={() => setIsBookingChooserOpen(true)}
          >
            <span className="cta-label cta-label--full">Garantir Minha Sessão Experimental</span>
            <span className="cta-label cta-label--short">Garantir Sessão</span>
          </button>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <button className="mobile-menu__backdrop" type="button" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="mobile-menu__panel">
            <div className="mobile-menu__header">
              <span className="eyebrow">XGYM Jundiaí</span>
              <button
                className="mobile-menu__close"
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>

            <nav className="mobile-menu__nav" aria-label="Navegação mobile">
              <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)}>
                Como funciona
              </a>
              <a href="#galeria-oficial" onClick={() => setIsMobileMenuOpen(false)}>
                Fotos da Body Shape
              </a>
              <a href="#beneficios" onClick={() => setIsMobileMenuOpen(false)}>
                Benefícios
              </a>
              <a href="#localizacao" onClick={() => setIsMobileMenuOpen(false)}>
                Endereço e rota
              </a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
                FAQ
              </a>
            </nav>

            <div className="mobile-menu__actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBookingChooserOpen(true);
                }}
              >
                <span className="cta-label cta-label--full">Garantir Minha Sessão Experimental</span>
                <span className="cta-label cta-label--short">Garantir Sessão</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="hero-section">
        <div className="hero-backdrop" />
          <div className="hero-grid">
            <div className="hero-copy hero-copy--reveal">
            <span className="eyebrow">XGYM Jundiaí • SP</span>
            <h1 className="hero-title">Queime Calorias e Reduza Medidas em Apenas 30 Minutos.</h1>
            <p className="hero-text">
              Conheça a Body Shape: a tecnologia europeia que combina caminhada, vácuo e infravermelho para acelerar seu metabolismo e combater a celulite. Ambiente 100% privativo na XGYM Jundiaí.
            </p>

            <div className="location-card">
              <strong>XGYM Jundiaí • SP</strong>
              <span>Ambiente 100% privativo para sua sessão Body Shape.</span>
            </div>

            <div className="hero-actions">
              <Link className="btn btn-primary" href={WHATSAPP_URL} target="_blank">
                <span className="cta-label cta-label--full">Garantir Minha Sessão Experimental</span>
                <span className="cta-label cta-label--short">Garantir Sessão</span>
              </Link>
              <Link className="btn btn-secondary" href="#como-funciona">
                Como funciona
              </Link>
            </div>

            <div className="hero-stat-grid">
              {heroStats.map((stat) => (
                <div className="hero-stat-card" key={stat.label}>
                  <IconBadge icon={stat.icon} />
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            </div>

          <div className="hero-media-stack">
            <DeviceScene />
            <button
              className="hero-video-card"
              type="button"
              onClick={() => setIsVideoOpen(true)}
              aria-label="Clique para assistir ao vídeo de apresentação da Body Shape"
              style={{ ["--video-card-image" as string]: `url(${VIDEO_CARD_IMAGE_URL})` }}
            >
              <span className="hero-video-card__title">
                Clique para assistir
              </span>
              <span className="hero-video-card__text">
                Conheça a experiência da Body Shape na XGYM.
              </span>
              <span className="hero-video-card__play">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <polygon points="8 5 19 12 8 19 8 5" />
                </svg>
              </span>
            </button>
          </div>

          <div className="hero-mobile-media-panel">
            <div className="hero-mobile-stats">
              {heroStats.map((stat) => (
                <div className="hero-stat-card" key={`mobile-${stat.label}`}>
                  <IconBadge icon={stat.icon} />
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="como-funciona">
        <div className="section-heading">
          <span className="eyebrow">Como funciona</span>
          <h2 className="section-title">O Segredo por Trás dos 30 Minutos que Equivalem a Horas de Treino.</h2>
          <p className="section-text">
            Esqueça as academias lotadas. A Body Shape foi desenhada para entregar resultados rápidos de forma inteligente e sem impacto excessivo.
          </p>
        </div>

        <div className="feature-grid">
          {featureCards.map((card, index) => (
            <article className="glass-card reveal-up" key={card.title}>
              <span className="card-index">0{index + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="galeria-oficial">
        <div className="section-heading">
          <span className="eyebrow">Fotos da Body Shape</span>
          <h2 className="section-title">Tecnologia de Ponta Focada no Seu Resultado.</h2>
          <p className="section-text">
            Entenda por que a Body Shape entrega o que a esteira comum não consegue.
          </p>
        </div>

        <div className="gallery-coverflow">
          <div className="gallery-coverflow__controls">
            <button
              className="gallery-coverflow__arrow"
              type="button"
              onClick={() => scrollToGalleryCard(activeGalleryIndex - 1)}
              aria-label="Foto anterior"
            >
              &larr;
            </button>
            <div className="gallery-coverflow__dots" aria-label="Navegação da galeria">
              {officialGallery.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={
                    index === activeGalleryIndex
                      ? "gallery-coverflow__dot is-active"
                      : "gallery-coverflow__dot"
                  }
                  aria-label={`Ir para ${item.title}`}
                  onClick={() => scrollToGalleryCard(index)}
                />
              ))}
            </div>
            <button
              className="gallery-coverflow__arrow"
              type="button"
              onClick={() => scrollToGalleryCard(activeGalleryIndex + 1)}
              aria-label="Próxima foto"
            >
              &rarr;
            </button>
          </div>

          <div className="photo-grid" ref={galleryTrackRef}>
            <div className="gallery-spacer" aria-hidden="true" />
            {officialGallery.map((item, index) => (
              <article
                className={
                  index === activeGalleryIndex
                    ? "photo-card reveal-up is-active"
                    : "photo-card reveal-up"
                }
                key={item.title}
                ref={(node) => {
                  galleryCardRefs.current[index] = node;
                }}
              >
                <div className="photo-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="photo-card__image"
                    sizes="(max-width: 720px) 100vw, (max-width: 1120px) 50vw, 33vw"
                  />
                </div>
                <div className="photo-card__content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
            <div className="gallery-spacer" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="content-section section-split" id="beneficios">
        <div className="section-heading">
          <span className="eyebrow">Por que escolher</span>
          <h2 className="section-title">Por que a Body Shape é a Escolha Inteligente para a Sua Rotina?</h2>
          <p className="section-text">
            Feito para quem tem agenda cheia, mas não abre mão da saúde e da estética.
          </p>
        </div>

        <div className="benefit-layout">
          <div className="benefit-carousel">
            <div className="benefit-carousel__controls">
              <button
                className="benefit-carousel__arrow"
                type="button"
                onClick={() => scrollToBenefitCard(activeBenefitIndex - 1)}
                aria-label="Benefício anterior"
              >
                &larr;
              </button>
              <div className="benefit-carousel__dots" aria-label="Navegação dos benefícios">
                {benefitCards.map((benefit, index) => (
                  <button
                    key={benefit.text}
                    type="button"
                    className={
                      index === activeBenefitIndex
                        ? "benefit-carousel__dot is-active"
                        : "benefit-carousel__dot"
                    }
                    aria-label={`Ir para benefício ${index + 1}`}
                    onClick={() => scrollToBenefitCard(index)}
                  />
                ))}
              </div>
              <button
                className="benefit-carousel__arrow"
                type="button"
                onClick={() => scrollToBenefitCard(activeBenefitIndex + 1)}
                aria-label="Próximo benefício"
              >
                &rarr;
              </button>
            </div>
            <div className="benefit-list" ref={benefitTrackRef}>
            {benefitCards.map((benefit, index) => (
              <div
                className="benefit-row reveal-left"
                key={benefit.text}
                ref={(node) => {
                  benefitCardRefs.current[index] = node;
                }}
              >
                <span className="benefit-bullet benefit-bullet--icon" aria-hidden="true">
                  <benefit.icon size={16} strokeWidth={2.3} />
                </span>
                <p>{benefit.text}</p>
              </div>
            ))}
            </div>
          </div>

          <aside className="experience-card reveal-up">
            <span className="experience-card__label">Unidade XGYM</span>
            <h3>Atendimento premium em Jundiaí.</h3>
            <p>
              Sessão privativa, suporte rápido e atendimento pensado para quem busca resultado com conforto e exclusividade.
            </p>
            <div className="experience-card__stack">
              <div>
                <strong>Unidade</strong>
                <span>XGYM Jundiaí • SP</span>
              </div>
              <div>
                <strong>Experiência</strong>
                <span>Sala privativa só para você</span>
              </div>
              <div>
                <strong>Suporte</strong>
                <span>Atendimento premium pelo WhatsApp</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-section" id="localizacao">
        <div className="section-heading">
          <span className="eyebrow">Como chegar</span>
          <h2 className="section-title">Endereço da XGYM para chegar sem erro.</h2>
          <p className="section-text">
            Se você preferir, já pode abrir a rota no mapa ou tentar abrir a Uber com o
            destino da unidade preenchido.
          </p>
        </div>

        <div className="location-panel">
          <div className="location-layout">
            <div className="location-copy">
              <div className="location-lead">
                <span className="eyebrow">XGYM Jundiaí</span>
                <h3 className="location-title">Chegue sem erro e fale direto com a unidade.</h3>
                <p className="location-description">
                  Endereço fácil de localizar, telefone direto e opções rápidas para abrir rota, chamar um carro ou falar com a unidade.
                </p>
              </div>

              <div className="location-grid">
                <div className="location-detail">
                  <IconBadge icon={MapPin} />
                  <div>
                    <strong>Endereço</strong>
                    <p>{XGYM_ADDRESS}</p>
                  </div>
                </div>

                <div className="location-detail">
                  <IconBadge icon={Phone} />
                  <div>
                    <strong>Telefone</strong>
                    <p>
                      <Link href={PHONE_URL}>{PHONE_LABEL}</Link>
                    </p>
                  </div>
                </div>

                <div className="location-detail">
                  <IconBadge icon={MessageCircle} />
                  <div>
                    <strong>WhatsApp</strong>
                    <p>Fale com a unidade para tirar dúvidas rápidas antes ou depois do agendamento.</p>
                  </div>
                </div>
              </div>

              <div className="location-actions">
                <Link className="btn btn-secondary location-action" href={WAZE_URL} target="_blank">
                  <BrandIcon path={siWaze.path} label="Waze" />
                  Abrir no Waze
                </Link>
                <Link className="btn btn-primary location-action" href={UBER_URL} target="_blank" rel="noreferrer">
                  <BrandIcon path={siUber.path} label="Uber" />
                  Ir de Uber
                </Link>
              </div>
            </div>

            <div className="location-map">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                title="Mapa da unidade XGYM Jundiaí"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="location-map__overlay">
                <span className="location-map__chip">
                  <MapPin size={14} strokeWidth={2.4} />
                  XGYM Jundiaí
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section" id="casos-reais">
        <div className="section-heading">
          <span className="eyebrow">O que falam da XGYM</span>
          <h2 className="section-title">O Que Dizem Nossas Alunas</h2>
          <p className="section-text">Resultados reais de quem trocou o treino monótono pela inteligência da Body Shape na XGYM.</p>
        </div>

        <div className="feature-grid">
          {realCases.map((caseItem) => (
            <article className="glass-card reveal-up" key={caseItem.name}>
              <span className="card-index">{caseItem.name}</span>
              <div className="review-stars" aria-label="Avaliação de 5 estrelas">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <h3>{caseItem.title}</h3>
              <p>{caseItem.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section faq-section" id="faq">
        <div className="section-heading">
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2 className="section-title">
            Dúvidas Comuns <span className="section-title__aside">(Sem Letrinhas Miúdas)</span>
          </h2>
          <p className="section-text">
            Ainda está na dúvida? Nós respondemos o que a maioria das pessoas pergunta antes de começar.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details className="faq-item reveal-up" key={item.question} open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-section closing-cta">
        <div className="closing-panel">
          <div className="closing-panel__content">
            <span className="eyebrow">Pronto para começar?</span>
            <h2 className="section-title">Dê o Primeiro Passo Rumo ao Seu Novo Corpo.</h2>
            <p className="section-text">
              Sua sessão VIP na Body Shape XGYM Jundiaí está a uma mensagem de distância. Pare de adiar seus resultados.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href={WHATSAPP_URL} target="_blank">
                <span className="cta-label cta-label--full">Garantir Minha Sessão Experimental</span>
                <span className="cta-label cta-label--short">Garantir Sessão</span>
              </Link>
            </div>
            <p className="section-text">Atendimento direto com a unidade XGYM Jundiaí • SP</p>
          </div>

          <aside className="closing-panel__aside">
            <div className="closing-detail">
              <IconBadge icon={Clock3} />
              <div>
                <strong>Resposta rápida</strong>
                <p>Use o app ou fale com a unidade para confirmar disponibilidade com rapidez.</p>
              </div>
            </div>
            <div className="closing-detail">
              <IconBadge icon={MapPin} />
              <div>
                <strong>Endereço</strong>
                <p>{XGYM_ADDRESS}</p>
              </div>
            </div>
            <div className="closing-detail">
              <IconBadge icon={CarFront} />
              <div>
                <strong>Chegue como quiser</strong>
                <p>Abra a rota no mapa ou tente abrir a Uber já com o destino preenchido.</p>
              </div>
            </div>
            <div className="closing-panel__links">
              <Link className="btn btn-secondary location-action" href={WAZE_URL} target="_blank">
                <BrandIcon path={siWaze.path} label="Waze" />
                Abrir no Waze
              </Link>
              <Link className="btn btn-secondary location-action" href={UBER_URL} target="_blank" rel="noreferrer">
                <BrandIcon path={siUber.path} label="Uber" />
                Ir de Uber
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <button
            className={unitTapCount >= 4 ? "eyebrow eyebrow-button eyebrow-button--armed" : "eyebrow eyebrow-button"}
            type="button"
            onClick={handleUnitEasterEgg}
          >
            Unidade
          </button>
          <p>XGYM Jundiaí • SP</p>
        </div>
        <div className="footer-notes">
          <p>Agende sua sessão pelo app ou pelo WhatsApp e escolha o melhor horário com a XGYM.</p>
          <p>Se precisar de ajuda, fale direto com a unidade.</p>
        </div>
        <div className="footer-credit">
          <p>Desenvolvido por</p>
          <Link href="https://vocedigitalpropaganda.com.br" target="_blank" rel="noreferrer">
            Voce Digital Propaganda
          </Link>
        </div>
      </footer>

      <Link className="fab-whatsapp" href={WHATSAPP_URL} target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M12.031 0C5.383 0 0 5.383 0 12.031c0 2.124.551 4.192 1.597 6.014L.203 24l6.096-1.597C8.106 23.332 10.046 23.86 12.031 23.86c6.648 0 12.031-5.383 12.031-12.031S18.679 0 12.031 0zm0 21.84c-1.782 0-3.527-.478-5.056-1.385l-.362-.214-3.754.985.998-3.662-.235-.374a9.96 9.96 0 0 1-1.545-5.368c0-5.523 4.493-10.016 10.016-10.016 5.522 0 10.015 4.493 10.015 10.016 0 5.523-4.493 10.016-10.015 10.016zm5.5-7.514c-.302-.151-1.782-.88-2.059-.981-.277-.101-.478-.151-.68.151-.201.302-.78 1.006-.956 1.208-.176.201-.352.226-.654.075-1.583-.787-2.651-1.371-3.655-2.613-.257-.319.255-.296.843-1.465.075-.151.038-.277-.019-.378-.057-.101-.68-1.637-.932-2.241-.246-.59-.495-.51-.68-.52h-.578c-.201 0-.528.075-.805.378-.277.302-1.057 1.031-1.057 2.515 0 1.484 1.082 2.918 1.233 3.119.151.201 2.125 3.245 5.145 4.549.719.31 1.28.495 1.717.634.721.229 1.378.196 1.895.119.578-.086 1.782-.729 2.033-1.433.252-.704.252-1.308.176-1.433-.075-.126-.277-.201-.578-.352z" />
        </svg>
      </Link>
      <button className="fab-top" type="button" onClick={handleScrollToTop} aria-label="Voltar ao início">
        <ChevronUp size={28} strokeWidth={2.6} />
      </button>

      {isVideoOpen ? (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Video de apresentacao da Body Shape"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="video-modal__dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="video-modal__close"
              type="button"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Fechar video"
            >
              Fechar
            </button>
            <div className="video-modal__frame">
              <iframe
                src={REEL_EMBED_URL}
                title="Joao apresentando a esteira Body Shape"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}

      {isBookingChooserOpen ? (
        <div
          className="booking-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Escolha como deseja agendar"
          onClick={() => setIsBookingChooserOpen(false)}
        >
          <button className="booking-modal__backdrop" type="button" aria-label="Fechar seletor de agendamento" />
          <div className="booking-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button
              className="booking-modal__close"
              type="button"
              onClick={() => setIsBookingChooserOpen(false)}
              aria-label="Fechar seletor de agendamento"
            >
              <X size={18} strokeWidth={2.4} />
            </button>
            <div className="booking-modal__body">
              <span className="eyebrow">Escolha seu canal</span>
              <h3 className="booking-modal__title">Como você quer agendar?</h3>
              <p className="booking-modal__text">
                Continue pelo app ou fale direto com a unidade no WhatsApp.
              </p>
              <div className="booking-modal__actions">
                <Link
                  className="btn btn-primary booking-modal__action"
                  href={APP_BOOKING_URL}
                  target="_blank"
                  onClick={() => setIsBookingChooserOpen(false)}
                >
                  Continuar no app
                </Link>
                <Link
                  className="btn btn-secondary booking-modal__action"
                  href={WHATSAPP_URL}
                  target="_blank"
                  onClick={() => setIsBookingChooserOpen(false)}
                >
                  Falar no WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
