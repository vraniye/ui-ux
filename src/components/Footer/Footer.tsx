import { FC, useContext } from "react";
import { Theme } from "@/store/theme";
import Image from "next/image";

export const Footer: FC = () => {
  const { currentTheme } = useContext(Theme);
  return (
    <footer
      className={`flex justify-center py-10 ${
        currentTheme == "black" ? "text-white" : "text-black"
      }`}></footer>
  );
};
