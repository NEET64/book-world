import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const useGetBook = () => {
  const [book, setBook] = useState();
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    setIsDetailLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/` + id)
      .then((response) => {
        setBook(response.data.book);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsDetailLoading(false));
  }, [id]);

  return { book, id, isDetailLoading };
};
export default useGetBook;
