import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const useBooks = (genre) => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let searchQuery = genre || queryParams.get("q") || "";
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books`, {
        params: { q: searchQuery },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [location.search, genre]);

  return { books, isLoading };
};

export default useBooks;
