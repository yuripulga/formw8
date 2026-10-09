"use client";

import React, { useEffect, useRef } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { wasSanitized } from "@/lib/sanitizer";
import { Input } from "@/components/ui/Input";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { User } from "lucide-react";

interface StepNameProps {
  error?: string;
  onClearError: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function StepName({ error, onClearError, onKeyDown }: StepNameProps) {
  const { t } = useI18n();
  const { formData, setUserName, sanitizedUserName } = useWizard();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const nameWasSanitized = wasSanitized(formData.userName || "");
  const activeSubtitle = t.wizard.stepName.subtitle;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2.5 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-heading-theme tracking-tight leading-[1.1]">
          <HighlightedText text={t.wizard.stepName.question} />
        </h1>
        {activeSubtitle ? (
          <p className="text-sm sm:text-base text-muted-theme leading-relaxed">
            <HighlightedText text={activeSubtitle} />
          </p>
        ) : null}
      </div>

      <div className="pt-1.5 sm:pt-2">
        <Input
          ref={inputRef}
          type="text"
          id="user-name-input"
          aria-label={t.wizard.stepName.question}
          value={formData.userName || ""}
          onChange={(e) => {
            setUserName(e.target.value);
            if (error) onClearError();
          }}
          onKeyDown={onKeyDown}
          placeholder={t.wizard.stepName.placeholder}
          helperText={
            nameWasSanitized
              ? `${t.common.sanitizedNotice} ${sanitizedUserName}`
              : undefined
          }
          reserveHelperSpace={true}
          error={error}
          icon={<User className="w-5 h-5" />}
          autoFocus
        />
      </div>
    </div>
  );
}
