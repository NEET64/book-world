import BookCard from "@/components/BookCard";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FavouriteBooks = () => {
  const [books, setBooks] = useState([]);
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    token &&
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBooks(response.data.books);

          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <main className="grid flex-1 items-start p-2 sm:px-4 sm:py-0 md:gap-8 w-full">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap">
        {books?.length !== 0 ? (
          books.map((book, index) => <BookCard key={index} book={book} />)
        ) : (
          <section className="bg-white dark:bg-gray-900 w-full">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900">
                  No favorites found
                </p>
                <p className="mb-4 text-lg font-light text-gray-500">
                  Your favorite books list is empty. Start adding some now
                </p>
                <Link
                  to="/books"
                  className="inline-flex text-white bg-gray-800 hover:bg-gray-800/90 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
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
