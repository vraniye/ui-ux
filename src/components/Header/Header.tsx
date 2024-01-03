import { FC, useContext } from "react";
import { Theme } from "@/store/theme";
import { useRouter } from "next/router";
import changeTheme from "../../../public/static/switch.svg";
import Image from "next/image";

interface HeaderProps {
  withArrow: boolean;
  withNavigation: boolean;
}

export const Header: FC<HeaderProps> = ({ withArrow, withNavigation }) => {
  const { currentTheme, toggleTheme } = useContext(Theme);
  const router = useRouter();

  const onArrowClick = () => {
    router.push("/");
  };

  return (
    <header
      className={`flex items-center py-5 w-full   justify-center items-center  top-0 left-0 px-5 border-b-2 border-gray-700 ${
        currentTheme == "black" ? "text-white" : "text-black"
      }`}
      style={{ zIndex: 6 }}>
      <div className="container flex justify-between flex-wrap">
        <div className="flex max-lg:flex-col items-center ">
          <h1 className="text-4xl flex leading-loose mr-10">FILMOTEKA</h1>
          {withNavigation && (
            <div className="flex max-lg:flex-col max-md:mb-5">
              <button
                onClick={() => router.push("./sortBy/rating")}
                className="mr-20  w-60 border-1 px-20 py-5 bg-gray-700 cursor-default text-white rounded-md text-xl border-1 p-5 rounded-md cursor-pointer bg-stone-600 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                Rating Sort
              </button>
              <button
                onClick={() => router.push("./sortBy/likes")}
                className="border-1 w-60  px-20 py-5  bg-gray-700 cursor-default text-white rounded-md text-xl border-1 p-5 rounded-md cursor-pointer bg-stone-600 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                Likes Sort
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {withArrow && (
            <div
              className={`border px-5 py-3 text-2xl cursor-pointer rounded-lg ${
                currentTheme == "black"
                  ? "bg-white text-black "
                  : "bg-black text-white"
              }`}
              onClick={onArrowClick}>
              <span>{"<"}</span>
              <span className="font-bold ml-4 ">Go back</span>
            </div>
          )}
          <Image
            width={40}
            height={40}
            src={changeTheme}
            className={`cursor-pointer ml-4 hover:invert`}
            alt="theme switch p-2"
            onClick={toggleTheme}
          />
        </div>
      </div>
    </header>
  );
};
