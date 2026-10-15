"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { useI18n } from "@/i18n/context";
import { useWizard } from "@/context/wizard-context";
import { sanitizeASCII, wasSanitized } from "@/lib/sanitizer";
import {
  fetchAddressByCep,
  fetchCompanyByCnpj,
  formatCnpj,
  formatCep,
  formatFullStreetAddress,
  isValidCpf,
  isValidCnpj,
  maskCpf,
  maskCnpj,
  maskCep,
} from "@/lib/brazil-api";
import { Input } from "@/components/ui/Input";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Building2, MapPin, Loader2, ChevronDown, Info } from "lucide-react";
import { countryName, countryOptions, findCountryCode } from "@/lib/countries";

interface StepTaxAddressProps {
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onKeyDown: (e: React.KeyboardEvent) => void;
  showManualAddress: boolean;
  setShowManualAddress: (val: boolean) => void;
}

export function StepTaxAddress({
  errors,
  setErrors,
  onKeyDown,
  showManualAddress,
  setShowManualAddress,
}: StepTaxAddressProps) {
  const { t, locale } = useI18n();
  const { formData, updateFormData } = useWizard();

  const [isSearchingCep, setIsSearchingCep] = useState<boolean>(false);
  const [isSearchingCnpj, setIsSearchingCnpj] = useState<boolean>(false);
  const [highlightedFields, setHighlightedFields] = useState<Record<string, boolean>>({});
  const [showPrivacyInfo, setShowPrivacyInfo] = useState<boolean>(false);
  const [citizenshipText, setCitizenshipText] = useState<string>(
    formData.citizenshipCountry ? countryName(formData.citizenshipCountry, locale) : ""
  );
  const countries = useMemo(() => countryOptions(locale), [locale]);

  const cnpjAbortController = useRef<AbortController | null>(null);
  const cepAbortController = useRef<AbortController | null>(null);

  const isPJ = formData.entityType === "PJ";

  // Cleanup abort controllers on unmount
  useEffect(() => {
    return () => {
      cnpjAbortController.current?.abort();
      cepAbortController.current?.abort();
    };
  }, []);

  const triggerFieldHighlight = (fieldKeys: string[]) => {
    const newHighlights: Record<string, boolean> = {};
    fieldKeys.forEach((k) => {
      newHighlights[k] = true;
    });
    setHighlightedFields(newHighlights);
    setTimeout(() => {
      setHighlightedFields({});
    }, 2000);
  };

  const handleTaxIdChange = async (val: string) => {
    const rawDigits = val.replace(/\D/g, "");

    // Individual (PF) or MEI mode
    if (!isPJ) {
      if (rawDigits.length > 11 || (val.includes("/") && rawDigits.length >= 8)) {
        const masked = maskCpf(rawDigits.slice(0, 11));
        updateFormData({ taxId: masked });
        setErrors((prev) => ({
          ...prev,
          taxId: t.wizard.validation.taxIdCnpjInPfError,
        }));
        return;
      }

      const masked = maskCpf(rawDigits);
      updateFormData({ taxId: masked });

      if (rawDigits.length === 11) {
        if (!isValidCpf(rawDigits)) {
          setErrors((prev) => ({ ...prev, taxId: t.wizard.validation.taxIdInvalidPF }));
        } else {
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.taxId;
            return updated;
          });
        }
      } else {
        if (errors.taxId) {
          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.taxId;
            return updated;
          });
        }
      }
      return;
    }

    // Company (PJ) mode
    const masked = maskCnpj(rawDigits);
    updateFormData({ taxId: masked });

    if (rawDigits.length === 14) {
      if (!isValidCnpj(rawDigits)) {
        setErrors((prev) => ({ ...prev, taxId: t.wizard.validation.taxIdInvalidPJ }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.taxId;
          return updated;
        });
      }

      cnpjAbortController.current?.abort();
      const controller = new AbortController();
      cnpjAbortController.current = controller;

      try {
        setIsSearchingCnpj(true);
        const result = await fetchCompanyByCnpj(rawDigits, controller.signal);
        if (result && !controller.signal.aborted) {
          setShowManualAddress(true);
          updateFormData({
            taxId: formatCnpj(rawDigits),
            companyName: result.companyName || formData.companyName,
            addressZip: result.zip ? formatCep(result.zip) : formData.addressZip,
            addressStreet: result.street || formData.addressStreet,
            addressCity: result.city || formData.addressCity,
            addressState: result.state || formData.addressState,
          });

          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.taxId;
            if (result.companyName) delete updated.companyName;
            if (result.zip) delete updated.addressZip;
            if (result.street) delete updated.addressStreet;
            if (result.city) delete updated.addressCity;
            if (result.state) delete updated.addressState;
            return updated;
          });

          triggerFieldHighlight([
            "taxId",
            "companyName",
            "addressZip",
            "addressStreet",
            "addressCity",
            "addressState",
          ]);
        }
      } catch {
        // Non-blocking fallback
      } finally {
        if (!controller.signal.aborted) {
          setIsSearchingCnpj(false);
        }
      }
    } else {
      if (errors.taxId) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated.taxId;
          return updated;
        });
      }
    }
  };

  const handleCepChange = async (val: string) => {
    const masked = maskCep(val);
    updateFormData({ addressZip: masked });
    if (errors.addressZip) setErrors((prev) => ({ ...prev, addressZip: "" }));

    const rawCep = val.replace(/\D/g, "");
    if (rawCep.length === 8) {
      cepAbortController.current?.abort();
      const controller = new AbortController();
      cepAbortController.current = controller;

      try {
        setIsSearchingCep(true);
        const result = await fetchAddressByCep(rawCep, controller.signal);
        if (result && !controller.signal.aborted) {
          setShowManualAddress(true);
          let num = "S/N";
          if (formData.addressStreet) {
            const numMatch = formData.addressStreet.match(/,\s*([0-9]+[A-Za-z0-9\s\-\/]*|S\/N|s\/n)/i);
            if (numMatch) {
              num = numMatch[1].trim();
            }
          }
          const nextStreet = result.street
            ? formatFullStreetAddress(result.street, num, undefined, result.bairro)
            : formData.addressStreet;

          updateFormData({
            addressZip: formatCep(rawCep),
            addressStreet: nextStreet,
            addressCity: result.city || formData.addressCity,
            addressState: result.state || formData.addressState,
          });

          setErrors((prev) => {
            const updated = { ...prev };
            delete updated.addressZip;
            if (result.street) delete updated.addressStreet;
            if (result.city) delete updated.addressCity;
            if (result.state) delete updated.addressState;
            return updated;
          });

          triggerFieldHighlight(["addressZip", "addressStreet", "addressCity", "addressState"]);
        }
      } catch {
        // Non-blocking fallback
      } finally {
        if (!controller.signal.aborted) {
          setIsSearchingCep(false);
        }
      }
    }
  };

  const streetWasSanitized = wasSanitized(formData.addressStreet || "");
  const cityWasSanitized = wasSanitized(formData.addressCity || "");
  const companyWasSanitized = wasSanitized(formData.companyName || "");

  const sanitizedStreet = sanitizeASCII(formData.addressStreet || "");
  const sanitizedCity = sanitizeASCII(formData.addressCity || "");
  const sanitizedCompanyName = sanitizeASCII(formData.companyName || "");

  const hasAddressFilled = Boolean(
    formData.addressStreet ||
    formData.addressCity ||
    formData.addressState ||
    (formData.addressZip && formData.addressZip.replace(/\D/g, "").length >= 8) ||
    showManualAddress ||
    errors.addressStreet ||
    errors.addressCity ||
    errors.addressState
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading-theme tracking-tight leading-tight">
          {t.wizard.stepTaxAndAddress.question}
        </h1>
        {t.wizard.stepTaxAndAddress.subtitle ? (
          <p className="text-sm sm:text-base text-muted-theme">
            {t.wizard.stepTaxAndAddress.subtitle}
          </p>
        ) : null}
      </div>

      <div className="space-y-3">
        {/* For PJ: CNPJ Input First */}
        {isPJ ? (
          <div className="space-y-2.5">
            <Input
              label={t.wizard.stepTaxAndAddress.taxIdLabelPJ}
              placeholder={t.wizard.stepTaxAndAddress.taxIdPlaceholderPJ}
              value={formData.taxId || ""}
              onChange={(e) => handleTaxIdChange(e.target.value)}
              helperText={
                isSearchingCnpj
                  ? t.wizard.stepTaxAndAddress.cnpjSearching
                  : t.wizard.stepTaxAndAddress.explanation
              }
              error={errors.taxId}
              icon={
                isSearchingCnpj ? (
                  <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )
              }
              inputMode="numeric"
              onKeyDown={onKeyDown}
              highlighted={highlightedFields.taxId}
              autoFocus
            />

            <Input
              label={t.wizard.stepTaxAndAddress.companyNameLabel}
              placeholder={t.wizard.stepTaxAndAddress.companyNamePlaceholder}
              value={formData.companyName || ""}
              onChange={(e) => {
                updateFormData({ companyName: e.target.value });
                if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: "" }));
              }}
              helperText={
                companyWasSanitized
                  ? `${t.common.sanitizedNotice} ${sanitizedCompanyName}`
                  : undefined
              }
              error={errors.companyName}
              onKeyDown={onKeyDown}
              highlighted={highlightedFields.companyName}
            />
          </div>
        ) : (
          /* For PF: CPF Input */
          <div className="space-y-2.5">
          <Input
            label={t.wizard.stepTaxAndAddress.taxIdLabelPF}
            placeholder={t.wizard.stepTaxAndAddress.taxIdPlaceholderPF}
            value={formData.taxId || ""}
            onChange={(e) => handleTaxIdChange(e.target.value)}
            helperText={
              formData.isMei
                ? t.wizard.stepTaxAndAddress.meiTaxIdHelper
                : t.wizard.stepTaxAndAddress.explanation
            }
            error={errors.taxId}
            inputMode="numeric"
            onKeyDown={onKeyDown}
            highlighted={highlightedFields.taxId}
            autoFocus
          />

          {/* Citizenship (W-8BEN line 2): Brazilian by default; foreign nationals living in Brazil can change it */}
          <SegmentedControl
            label={t.wizard.stepTaxAndAddress.citizenshipGroupLabel}
            value={formData.isForeignNational ? "foreign" : "brazilian"}
            options={[
              { value: "brazilian", label: t.wizard.stepTaxAndAddress.brazilianLink },
              { value: "foreign", label: t.wizard.stepTaxAndAddress.notBrazilianLink },
            ]}
            onChange={(choice) => {
              const foreign = choice === "foreign";
              if (foreign === Boolean(formData.isForeignNational)) return;
              updateFormData({ isForeignNational: foreign, citizenshipCountry: undefined });
              setCitizenshipText("");
              if (errors.citizenshipCountry) setErrors((prev) => ({ ...prev, citizenshipCountry: "" }));
            }}
          />

          {formData.isForeignNational ? (
            <div className="space-y-2.5 animate-fadeIn">
              <Input
                label={t.wizard.stepTaxAndAddress.citizenshipLabel}
                placeholder={t.wizard.stepTaxAndAddress.citizenshipPlaceholder}
                list="citizenship-countries"
                autoComplete="off"
                value={citizenshipText}
                onChange={(e) => {
                  setCitizenshipText(e.target.value);
                  updateFormData({
                    citizenshipCountry:
                      findCountryCode(e.target.value, locale, { includeUnsupported: true }) ?? undefined,
                  });
                  if (errors.citizenshipCountry) setErrors((prev) => ({ ...prev, citizenshipCountry: "" }));
                }}
                helperText={t.wizard.stepTaxAndAddress.citizenshipHelper}
                error={errors.citizenshipCountry}
              />
              <datalist id="citizenship-countries">
                {countries.map((country) => (
                  <option key={country.code} value={country.name} />
                ))}
              </datalist>
              <p className="text-xs text-muted-theme leading-normal">
                {t.wizard.stepTaxAndAddress.citizenshipNotice}
              </p>
            </div>
          ) : null}
          </div>
        )}

        {/* Address Section */}
        <div className="pt-2 space-y-3">
          <Input
            label={t.wizard.stepTaxAndAddress.addressZipLabel}
            labelAddon={
              t.wizard.stepTaxAndAddress.privacyNotice ? (
                <button
                  type="button"
                  onClick={() => setShowPrivacyInfo((open) => !open)}
                  aria-expanded={showPrivacyInfo}
                  aria-controls="privacy-info"
                  aria-label={t.wizard.stepTaxAndAddress.privacyInfoLabel}
                  title={t.wizard.stepTaxAndAddress.privacyInfoLabel}
                  className="p-1 -m-1 text-muted-theme hover:text-heading-theme transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              ) : undefined
            }
            placeholder={t.wizard.stepTaxAndAddress.addressZipPlaceholder}
            value={formData.addressZip || ""}
            onChange={(e) => handleCepChange(e.target.value)}
            helperText={
              isSearchingCep
                ? t.wizard.stepTaxAndAddress.cepSearching
                : undefined
            }
            error={errors.addressZip}
            icon={
              isSearchingCep ? (
                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              ) : (
                <MapPin className="w-5 h-5" />
              )
            }
            inputMode="numeric"
            onKeyDown={onKeyDown}
            highlighted={highlightedFields.addressZip}
          />

          {/* Privacy & transparency note, opened by the info button next to the label */}
          {showPrivacyInfo && (
            <p id="privacy-info" role="note" className="text-xs text-muted-theme leading-normal animate-fadeIn">
              {t.wizard.stepTaxAndAddress.privacyNotice}
            </p>
          )}

          {/* Collapsible / Auto-revealed Address Details */}
          {hasAddressFilled && (
            <div className="space-y-3 pt-1 animate-fadeIn">
              <Input
                label={t.wizard.stepTaxAndAddress.addressStreetLabel}
                placeholder={t.wizard.stepTaxAndAddress.addressStreetPlaceholder}
                value={formData.addressStreet || ""}
                onChange={(e) => {
                  updateFormData({ addressStreet: e.target.value });
                  if (errors.addressStreet) setErrors((prev) => ({ ...prev, addressStreet: "" }));
                }}
                helperText={
                  streetWasSanitized
                    ? `${t.common.sanitizedNotice} ${sanitizedStreet}`
                    : undefined
                }
                error={errors.addressStreet}
                onKeyDown={onKeyDown}
                highlighted={highlightedFields.addressStreet}
              />

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Input
                    label={t.wizard.stepTaxAndAddress.addressCityLabel}
                    placeholder={t.wizard.stepTaxAndAddress.addressCityPlaceholder}
                    value={formData.addressCity || ""}
                    onChange={(e) => {
                      updateFormData({ addressCity: e.target.value });
                      if (errors.addressCity) setErrors((prev) => ({ ...prev, addressCity: "" }));
                    }}
                    helperText={
                      cityWasSanitized
                        ? `${t.common.sanitizedNotice} ${sanitizedCity}`
                        : undefined
                    }
                    error={errors.addressCity}
                    onKeyDown={onKeyDown}
                    highlighted={highlightedFields.addressCity}
                  />
                </div>

                <div className="col-span-1">
                  <Input
                    label={t.wizard.stepTaxAndAddress.addressStateLabel}
                    placeholder={t.wizard.stepTaxAndAddress.addressStatePlaceholder}
                    value={formData.addressState || ""}
                    onChange={(e) => {
                      updateFormData({ addressState: e.target.value.toUpperCase().slice(0, 2) });
                      if (errors.addressState) setErrors((prev) => ({ ...prev, addressState: "" }));
                    }}
                    error={errors.addressState}
                    onKeyDown={onKeyDown}
                    maxLength={2}
                    highlighted={highlightedFields.addressState}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Toggle button to manually expand address fields if not revealed yet */}
          {!hasAddressFilled && (
            <div className="pt-1 flex justify-start">
              <button
                type="button"
                onClick={() => setShowManualAddress(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-theme hover:text-heading-theme transition-colors cursor-pointer"
              >
                <span>{t.wizard.stepTaxAndAddress.manualAddressToggle}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
