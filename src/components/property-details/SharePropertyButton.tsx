"use client";

import { useEffect, useState } from "react";

type SharePropertyButtonProps = {
  title: string;
};

export default function SharePropertyButton({ title }: SharePropertyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    setCopied(true);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Mira esta propiedad en Legalio: ${title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    await copyToClipboard(url);
  };

  return (
    <button
      type="button"
      className="share-property-button"
      onClick={handleShare}
      aria-label={copied ? "Enlace copiado" : "Compartir propiedad"}
      title={copied ? "Enlace copiado" : "Compartir propiedad"}
    >
      <i className="icon-ShareNetwork" aria-hidden="true"></i>
      <span className="share-property-status" aria-live="polite">
        {copied ? "Copiado" : ""}
      </span>
    </button>
  );
}
