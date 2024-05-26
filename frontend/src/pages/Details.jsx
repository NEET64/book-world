import NotFound from "@/components/NotFound";
import Heart from "@/components/Heart";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const [book, setBook] = useState();
  const [isLiked, setisLiked] = useState(false);
  const { isLoggedIn, token, role } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/` + id)
      .then((response) => {
        setBook(response.data.book);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const toggleFavorite = async () => {
    setisLiked(!isLiked);

    isLoggedIn &&
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/users/favourites`,
          { bookId: book._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => console.log(response.data.message))
        .catch((error) => console.error(error));
  };

  return (
    <div className="grid p-4 sm:p-6 gap-2">
      {isLoading ? (
        <div className="w-full">
          <Loader2 className="mx-auto h-10 w-10 animate-spin" />
        </div>
      ) : book ? (
        <div className="flex flex-col sm:flex-row gap-5 h-auto w-full max-w-4xl m-auto">
          <div className="flex flex-col items-center rounded-lg h-full">
            <img
              src={book?.image_url}
              alt="Book cover"
              className="max-w-lg w-full object-cover rounded-md"
            />
          </div>
          <div className="h-fit w-full">
            <div className="w-full h-full border-2 rounded-lg p-4">
              <h1 className="scroll-m-20 mb-5 text-4xl font-bold tracking-tight lg:text-5xl">
                {book?.title}
              </h1>
              <div className="flex gap-2 items-end">
                <h3 className="italic">by</h3>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {book?.author}
                </h2>
              </div>
              <div className="flex space-x-4 text-sm py-4 my-2 border-b-2 border-t-2">
                <div className="pr-4 border-r text-right">
                  <h3 className="italic w-24 pb-2">Year Published</h3>
                  <h4 className="font-semibold">{book?.year_published}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <h3 className="italic w-full">Genre</h3>
                  {book?.genre?.map((genre, index) => (
                    <Badge className="" key={index}>
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              {book?.description && (
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Description
                  </h3>
                  <blockquote className="my-4 border-l-2 pl-6 italic">
                    {book?.description}
                  </blockquote>
                </div>
              )}
            </div>
            <div className="flex">
              <Button
                variant="outline"
                className={`flex my-2 mr-2 p-2 md:px-2 gap-2 border-2 ${
                  isLiked ? "bg-red-100 hover:bg-red-200/80 border-red-200" : ""
                }`}
                onClick={toggleFavorite}>
                <Heart isLiked={isLiked} />
                <span className="hidden md:flex">
                  {isLiked ? "Added to Favourites" : "Add to Favourites"}
                </span>
              </Button>
              {role === "admin" && (
                <div className="flex gap-2 sm:justify-end pt-2 w-full">
                  <Button
                    className=" bg-slate-500 bg hover:bg-slate-500/90"
                    onClick={() => navigate(`edit`)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger className="h-10 px-4 py-2 bg-red-500 text-slate-50 hover:bg-red-500/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the Book data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                          className="bg-red-500/90 hover:bg-red-500"
                          onClick={() => {
                            setIsDeleteLoading(true);
                            axios
                              .delete(
                                `${import.meta.env.VITE_BACKEND_URL}/books/` +
                                  id,
                                {
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                }
                              )
                              .then((response) => {
                                setBook(response.data.book);
                                navigate("/books");
                              })
                              .catch((err) => {
                                console.log(err);
                              })
                              .finally(() => setIsDeleteLoading(false));
                          }}>
                          {isDeleteLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Please wait
                            </>
                          ) : (
                            <>Delete</>
                          )}
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Details;
