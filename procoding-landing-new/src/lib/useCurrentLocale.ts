// src/hooks/useCurrentLocale.ts
"use client";

import { useParams } from "next/navigation";

export const useCurrentLocale = () => {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "en";
  return locale === "ru" ? "ru" : "en";
};