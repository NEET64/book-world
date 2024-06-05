import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useGetBook = () => {
  const [book, setBook] = useState();
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const { toast } = useToast();
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/` + id)
      .then((response) => {
        setBook(response.data.book);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsDetailLoading(false));
  }, []);

  return { book, id, isDetailLoading };
};
export default useGetBook;
