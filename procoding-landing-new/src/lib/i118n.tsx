export const getDictionary = async (locale: 'en' | 'ru') => {
    const dict = await import(`@/locales/${locale}/common.json`);
    return dict.default;
  };