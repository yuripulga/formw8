"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/context";
import { route } from "@/lib/routes";

/** Localized 404 body; the language comes from the URL that was not found (e.g. /en/...). */
export function NotFoundContent() {
  const { t, locale } = useI18n();

  return (
    <AppShell showFaq={false}>
      <div className="space-y-5 py-8 max-w-2xl mx-auto w-full text-center">
        <p className="text-5xl sm:text-6xl font-black text-heading-theme tracking-tight">404</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-heading-theme tracking-tight">
          {t.common.notFoundTitle}
        </h1>
        <p className="text-sm text-muted-theme leading-relaxed">{t.common.notFoundDescription}</p>
        <Link href={route(locale, "home")} className="inline-block">
          <Button variant="primary" size="md" className="text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>{t.common.notFoundBack}</span>
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
