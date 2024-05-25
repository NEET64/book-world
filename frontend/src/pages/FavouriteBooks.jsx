import BookCard from "@/components/BookCard";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const FavouriteBooks = () => {
  const [books, setBooks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    token &&
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/users/favourites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setBooks(response.data.books))
        .catch((error) => console.error(error));
  }, [token]);
  return (
    <main className="grid flex-1 items-start p-2 sm:px-4 sm:py-0 md:gap-8">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </main>
  );
};

export default FavouriteBooks;
