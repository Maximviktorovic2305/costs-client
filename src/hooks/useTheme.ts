import { useEffect, useState } from "react";
export const useTheme = () => {
   const [theme, setTheme] = useState(
      JSON.parse(localStorage.getItem("theme") as string) || "retro"
   );

   const setCurrentMode = (theme: string) => {
      document
         .querySelector("html")
         ?.setAttribute("data-theme", theme);
   };

   const switchTheme = () => {
      const inverseMode = theme === "retro" ? "night" : "retro";
      localStorage.setItem("theme", JSON.stringify(inverseMode));

      setCurrentMode(theme);

      setTheme(inverseMode);
   };

   useEffect(() => {
      setCurrentMode(theme);
   }, [theme]);

   return { switchTheme, theme };
};
