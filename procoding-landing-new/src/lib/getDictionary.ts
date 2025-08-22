import en from "../locales/en.json";
import ru from "../locales/ru.json";

export type Locale = "en" | "ru";

export const getDictionary = async (locale: Locale) => {
  switch (locale) {
    case "ru":
      return (await import("../locales/ru.json")).default;
    case "en":
    default:
      return (await import("../locales/en.json")).default;
  }
};