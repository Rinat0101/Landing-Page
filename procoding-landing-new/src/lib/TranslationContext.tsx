'use client';

import React, { createContext, useContext } from 'react';

type TranslationContextType = {
  dictionary: Record<string, string>;
  locale: string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({
  children,
  dictionary,
  locale,
}: {
  children: React.ReactNode;
  dictionary: Record<string, string>;
  locale: string;
}) => {
  return (
    <TranslationContext.Provider value={{ dictionary, locale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
  
    if (!context) {
      throw new Error("useTranslation must be used within a TranslationProvider");
    }
  
    const t = (key: string): string => {
      const keys = key.split(".");
      let result: any = context.dictionary;
  
      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) return key; // fallback if not found
      }
  
      return typeof result === "string" ? result : key;
    };
  
    return {
      t,
      locale: context.locale,
    };
  };