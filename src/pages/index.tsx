import { MovieList, getFilms } from "@/api";
import { Card } from "@/components/Card/Card";
import { useContext, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { Footer } from "@/components/Footer/Footer";
import { genreOptions } from "../constants";
import { useDebounce } from "../hooks/useDebounce";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/minimal.css";

export default function Home() {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);

  const { currentTheme } = useContext(Theme);

  const data = useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getFilms(
        String(currentPage),
        genre,
        query,
        "date_added"
      );
      setFilms(response.movies);
      setTotal(Math.floor(response.movie_count / response.limit));
      setLoading(false);
    };
    fetch();
  }, [currentPage, genre, debouncedQuery]);

  return (
    <div
      className={`bg ${currentTheme == "black" ? "bg_black" : ""}`}
      style={{
        backgroundColor: `${currentTheme == "black" ? "#484848" : "#F1F1F1"}`,
      }}>
      <Header withNavigation={true} />
      {!loading ? (
        <main className="min-h-screen flex justify-center px-5 py-10">
          <section className="flex flex-col items-center container">
            <div className="flex items-center  w-full mb-7  justify-end">
              <div className="flex justify-between w-full max-sm:flex-col items-center max-lg:flex-col">
                <h1
                  className={`text-5xl  font-extrabold max-sm:mb-3  max-lg:mb-5 ${
                    currentTheme == "black" ? "text-white" : "text-black"
                  }`}>
                  FILMS
                </h1>
                <div className="flex max-lg:flex-col">
                  <input
                    type="text"
                    placeholder="Find film"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-1 px-20 py-5 bg-gray-700 cursor-default text-white rounded-md text-xl border-1 p-5 rounded-md cursor-pointer bg-stone-600 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"></input>
                  <select
                    className="border-1 px-20 py-5 bg-gray-700 text-white rounded-md text-xl border-1 p-5 rounded-md cursor-pointer bg-stone-600 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}>
                    <option>All</option>
                    {genreOptions.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mb-10 container">
              {films?.map((item: MovieList, index) => (
                <Card
                  key={index}
                  id={item.id}
                  filter={checked}
                  rating={String(item.rating)}
                  genre={item.genres[0]}
                  description={item.description_full || item.summary}
                  title={item.title}
                  year={item.year}
                  medium_cover_image={item.medium_cover_image}
                />
              ))}
            </div>
            <div
              style={{ maxWidth: "600px", width: "100%", padding: "0px 30px" }}>
              <ResponsivePagination
                previousLabel=" "
                activeItemClassName={`${
                  currentTheme == "black"
                    ? "active__item_black"
                    : "active__item"
                }`}
                nextLabel=" "
                pageLinkClassName={`p-3 bg-transparent border-none ${
                  currentTheme == "black"
                    ? "text-gray-500 hover:text-yellow-400"
                    : "text-gray-500 hover:text-sky-700"
                }`}
                current={currentPage}
                total={total}
                onPageChange={setCurrentPage}
              />
            </div>
          </section>
        </main>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="300"
            width="300"
            color={`${currentTheme == "black" ? "white" : "black"}`}
            ariaLabel="loading"
          />
        </div>
      )}
      <Footer />
    </div>
  );
}
