// src/components/ui/LocalizedButton.tsx
"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useTranslation } from "@/context/TranslationContext";
import { ButtonKey } from "@/context/TranslationContext"; // Import from context

interface LocalizedButtonProps
  extends Omit<ButtonProps, "children"> {
  i18nKey: ButtonKey;
}

export function LocalizedButton({
  i18nKey,
  ...rest
}: LocalizedButtonProps) {
  const { t } = useTranslation();
  return <Button {...rest}>{t.buttons[i18nKey]}</Button>;
}