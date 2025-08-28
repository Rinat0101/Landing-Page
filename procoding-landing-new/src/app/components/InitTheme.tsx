"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function InitTheme() {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      const hour = new Date().getHours();
      const isDay = hour >= 6 && hour < 18;
      setTheme(isDay ? "light" : "dark");
    }
  }, []);

  return null;
}