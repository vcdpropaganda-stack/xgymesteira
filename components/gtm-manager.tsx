"use client";

import { useEffect, useMemo, useState } from "react";

const OPEN_EVENT = "xgym:open-gtm-config";
const ADMIN_PASSWORD = "vcd007";

function sanitizeGtmId(value: string) {
  const normalized = value.trim().toUpperCase();
  return /^GTM-[A-Z0-9]+$/.test(normalized) ? normalized : "";
}

function removeExistingGtm() {
  document.getElementById("xgym-gtm-script")?.remove();
  document.getElementById("xgym-gtm-iframe")?.remove();
}

function injectGtm(gtmId: string) {
  if (!gtmId || typeof document === "undefined") return;

  removeExistingGtm();

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": Date.now(),
    event: "gtm.js"
  });

  const script = document.createElement("script");
  script.id = "xgym-gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  noscript.id = "xgym-gtm-iframe";
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  document.body.prepend(noscript);
}

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

export function GTMManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedId, setSavedId] = useState("");
  const [password, setPassword] = useState("");
  const [gtmId, setGtmId] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const loadServerGtm = async () => {
      try {
        const response = await fetch("/api/gtm", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as { gtmId?: string };
        const persistedId = sanitizeGtmId(data.gtmId || "");

        if (persistedId) {
          setSavedId(persistedId);
          setGtmId(persistedId);
          injectGtm(persistedId);
        }
      } catch {
        // Intencional: a landing continua funcional mesmo sem o GTM persistido.
      }
    };

    loadServerGtm();
  }, []);

  useEffect(() => {
    const openModal = () => {
      setIsOpen(true);
      setFeedback("");
      setPassword("");
      setIsUnlocked(false);
    };

    window.addEventListener(OPEN_EVENT, openModal);

    return () => {
      window.removeEventListener(OPEN_EVENT, openModal);
    };
  }, []);

  const hasConfiguredId = useMemo(() => Boolean(savedId), [savedId]);

  const handleUnlock = () => {
    if (password !== ADMIN_PASSWORD) {
      setFeedback("Senha incorreta.");
      return;
    }

    setIsUnlocked(true);
    setFeedback(savedId ? `GTM atual: ${savedId}` : "Nenhum GTM cadastrado ainda.");
  };

  const handleSave = async () => {
    const sanitizedId = sanitizeGtmId(gtmId);

    if (!sanitizedId) {
      setFeedback("Informe um ID válido no formato GTM-XXXXXXX.");
      return;
    }

    setIsBusy(true);

    try {
      const response = await fetch("/api/gtm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: ADMIN_PASSWORD,
          gtmId: sanitizedId
        })
      });

      if (!response.ok) {
        setFeedback("Não foi possível salvar o GTM no servidor.");
        return;
      }

      injectGtm(sanitizedId);
      setSavedId(sanitizedId);
      setGtmId(sanitizedId);
      setFeedback(`GTM ${sanitizedId} ativado no site.`);
    } catch {
      setFeedback("Falha ao conectar com o servidor do site.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleRemove = async () => {
    setIsBusy(true);

    try {
      const response = await fetch("/api/gtm", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: ADMIN_PASSWORD
        })
      });

      if (!response.ok) {
        setFeedback("Não foi possível remover o GTM do servidor.");
        return;
      }

      removeExistingGtm();
      setSavedId("");
      setGtmId("");
      setFeedback("Configuração do GTM removida do site.");
    } catch {
      setFeedback("Falha ao conectar com o servidor do site.");
    } finally {
      setIsBusy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="gtm-modal" role="dialog" aria-modal="true" aria-label="Configurar Google Tag Manager">
      <div className="gtm-modal__backdrop" onClick={() => setIsOpen(false)} />
      <div className="gtm-modal__panel">
        <button className="gtm-modal__close" type="button" onClick={() => setIsOpen(false)} aria-label="Fechar">
          Fechar
        </button>

        <div className="gtm-modal__body">
          <span className="eyebrow">Configuração oculta</span>
          <h2 className="gtm-modal__title">Google Tag Manager</h2>

          {!isUnlocked ? (
            <>
              <p className="gtm-modal__text">Digite a senha para cadastrar ou trocar o ID do Tag Manager.</p>
              <input
                className="gtm-modal__input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"
              />
              <button className="btn btn-primary gtm-modal__action" type="button" onClick={handleUnlock}>
                Entrar
              </button>
            </>
          ) : (
            <>
              <p className="gtm-modal__text">
                Cadastre o ID no formato <strong>GTM-XXXXXXX</strong>. Ele fica salvo neste navegador e é carregado em
                todo o site.
              </p>
              <input
                className="gtm-modal__input"
                type="text"
                value={gtmId}
                onChange={(event) => setGtmId(event.target.value)}
                placeholder="GTM-XXXXXXX"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
              />
              <div className="gtm-modal__actions">
                <button className="btn btn-primary gtm-modal__action" type="button" onClick={handleSave} disabled={isBusy}>
                  {isBusy ? "Salvando..." : "Salvar GTM"}
                </button>
                {hasConfiguredId ? (
                  <button className="btn btn-secondary gtm-modal__action" type="button" onClick={handleRemove} disabled={isBusy}>
                    {isBusy ? "Aguarde..." : "Remover GTM"}
                  </button>
                ) : null}
              </div>
            </>
          )}

          {feedback ? <p className="gtm-modal__feedback">{feedback}</p> : null}
        </div>
      </div>
    </div>
  );
}
