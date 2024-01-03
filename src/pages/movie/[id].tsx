"use client";
import { getFilmById } from "@/api";
import { FC, useContext, useEffect, useState } from "react";
import { MovieList } from "@/api";
import { useParams } from "next/navigation";
import { Audio } from "react-loader-spinner";
import { useComments } from "../../hooks/useComments";
import { Header } from "@/components/Header/Header";
import { Theme } from "@/store/theme";
import { useRouter } from "next/router";
import { Footer } from "@/components/Footer/Footer";
import Image from "next/image";
import star from "../../../public/static/star.png";

const Details: FC = () => {
  const [movieDetails, setMovieDetails] = useState<MovieList>();
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({
    name: "",
    text: "",
  });
  const id = useParams()?.id;

  const { comments, updateComments, deleteComment } = useComments(id);
  const { currentTheme } = useContext(Theme);
  const router = useRouter();

  const onCommentChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSendComment = () => {
    updateComments(id, comment);
    setComment({ name: "", text: "" });
  };

  const downloadFilm = () => {
    router.push(movieDetails?.torrents[0]?.url);
  };

  const onBackClick = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        setLoading(true);
        const response: MovieList = await getFilmById(id);
        setMovieDetails(response);
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  return (
    <div
      className={`bg ${currentTheme == "black" ? "bg_black" : ""}`}
      style={{
        backgroundColor: `${currentTheme == "black" ? "#484848" : "#F1F1F1"}`,
        color: `${currentTheme == "black" ? "white" : "black"}`,
      }}>
      <Header withArrow={true} />
      {!loading ? (
        <section className="min-h-screen flex items-center flex-col pb-20 px-4 relative py-10">
          <Image
            src={movieDetails?.background_image}
            width={900}
            height={500}
            alt="bg"
            onError={(e) => console.log((e.target.style.display = "none"))}
            style={{
              maxHeight: "500px",
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              borderRadius: "4.5em",
            }}
            className="  w-full brightness-50 p-10  rounded-lg max-lg:hidden"
          />
          <div className="container flex flex-col lg:flex-row items-start">
            <div>
              <div className="mb-5 flex flex-col">
                <Image
                  loading="lazy"
                  onError={(e) =>
                    console.log((e.target.style.display = "none"))
                  }
                  width={460}
                  height={600}
                  src={movieDetails?.large_cover_image || ""}
                  alt={movieDetails?.title || ""}
                />
              </div>
            </div>

            <div className="flex  lg:pl-28 flex-col w-full z-index-5 pt-24">
              <p className="text-4xl mb-2">{movieDetails?.title}</p>
              <div className="flex  flex-col">
                <div className="flex mb-4">
                  <p className="text-xl  mr-4">{movieDetails?.year}</p>
                  <div className="flex items-center">
                    <p className="text-xl mr-2 ">{movieDetails?.rating}</p>
                    <Image
                      src={star}
                      height={24}
                      width={24}
                      alt="star"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {movieDetails?.genres?.map((genre, index) => (
                    <b
                      className="bg-stone-700 text-gray-300 p-2 text-base rounded-full mr-2 mb-3"
                      key={index}>
                      {genre}
                    </b>
                  ))}
                </div>
              </div>

              {movieDetails?.description_full && (
                <p className="text-2xl mb-10">
                  {movieDetails?.description_full}
                </p>
              )}

              <div className="flex ">
                <button
                  onClick={() => {
                    router.push(movieDetails?.url || "");
                  }}
                  className="py-4 mr-6 px-6 flex-items-center justify-center border bg-stone-700  text-gray-300 font-extrabold cursor-pointer rounded-lg hover:bg-stone-400 hover:text-white">
                  Watch now
                </button>
                <button
                  onClick={downloadFilm}
                  className="py-4 px-6 flex-items-center justify-center border bg-stone-700  text-gray-300 font-extrabold cursor-pointer rounded-lg hover:bg-stone-400 hover:text-white">
                  Download
                </button>
              </div>
            </div>
          </div>
          <div className="container flex flex-col mt-32">
            <p className="text-3xl   mb-5">Comments</p>
            <p className="  mb-2">Name</p>
            <input
              name="name"
              onChange={onCommentChange}
              value={comment.name}
              type="text"
              className=" max-w-md  bg-white border-2 p-5 mb-2 rounded-md  text-black"
            />
            <p className=" mb-2">Comment</p>
            <textarea
              value={comment.text}
              onChange={onCommentChange}
              name="text"
              className="w-full bg-white border-2 p-5 rounded-md max-w-md text-black mb-5"
            />
            <button
              onClick={onSendComment}
              className="mr-auto border-2 rounded-md py-5 px-10 mt-3 bg-black text-white mb-12          
              ">
              Send
            </button>
            <div className="flex flex-col">
              {comments.length > 0 ? (
                comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col border bg-white w-full p-5 text-white rounded-md mb-3">
                    <p className="text-xl extrabold mb-2 text-black">
                      {comment.name}
                    </p>
                    <p className="text-gray-500">{comment.text}</p>
                    <button
                      onClick={() => deleteComment(comment)}
                      className="ml-auto font-extrabold text-black">
                      DELETE
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-3xl">
                  There are no comments yet, be the first to comment
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center min-w-full min-h-screen">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="loading"
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Details;
