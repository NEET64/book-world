import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books`, {
        params: { q: searchQuery },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  }, [location.search]);

  return { books, isLoading };
};

export default useBooks;
