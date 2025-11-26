// lib/getLocalizedField.ts
export const getLocalizedField = (
    baseFieldName: string,
    data: Record<string, any>,
    locale: string
  ): string => {
    const key = `${baseFieldName}_${locale}`;
    return data[key] || data[`${baseFieldName}_en`] || "";
  };