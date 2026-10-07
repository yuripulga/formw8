"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieBanner() {
  const { t } = useI18n();
  const [accepted, setAccepted] = useState(false);

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 p-3 sm:p-3.5 rounded-2xl bg-card-surface border border-theme shadow-xl flex items-center gap-4 max-w-fit animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-0.5">
        <p className="text-xs font-bold text-heading-theme whitespace-nowrap">
          {t.cookies.question}
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-[10px] text-muted-theme hover:text-heading-theme hover:underline underline-offset-2 block"
        >
          {t.cookies.learnMore}
        </a>
      </div>
      <Button
        onClick={() => setAccepted(true)}
        variant="outline"
        size="sm"
        className="shrink-0 text-xs px-3 py-1.5"
      >
        {t.cookies.accept}
      </Button>
    </div>
  );
}
