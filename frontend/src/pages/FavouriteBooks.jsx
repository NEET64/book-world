import { pageTitleAtom } from "@/atoms/meta";
import BookCard from "@/components/BookCard";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";

const FavouriteBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  useEffect(() => setPageTitle("My Favourite Books"), []);

  useEffect(() => {
    localStorage.getItem("token") &&
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/favourites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setBooks(response.data.books);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <main className="flex-1 items-start p-2 sm:px-4 w-full">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap">
        {books?.length !== 0 ? (
          books.map((book, index) => <BookCard key={index} book={book} />)
        ) : (
          <section className="bg-white dark:bg-zinc-950 w-full col-span-2">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-zinc-900 dark:text-zinc-50">
                  No favorites found
                </p>
                <p className="mb-4 text-lg font-light text-zinc-500">
                  Your favorite books list is empty. Start adding some now
                </p>
                <Link
                  to="/books"
                  className="inline-flex text-white bg-slate-800 hover:bg-slate-800/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
                  Back to Homepage
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default FavouriteBooks;
