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
import axios from "axios";
import { Loader2, Pencil, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserData from "@/hooks/useUserData";
import { useToast } from "@/components/ui/use-toast";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import { formatDate } from "@/utilities/formatDate";

const Details = () => {
  const [book, setBook] = useState();
  const [isLiked, setisLiked] = useState(false);
  const { isLoggedIn, role } = useUserData();
  const [isDetailLoading, setIsDetailLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { isUserLoading, setUserUserLoading, isFavouriteBook } = useUserData();
  const [isHeartLoading, setIsHeartLoading] = useState(false);
  const [myReview, setMyReview] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    if (!isUserLoading && book) {
      setisLiked(isFavouriteBook(book._id));
    }
  }, [book, isUserLoading]);

  useEffect(() => {
    book &&
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/books/${book?._id}/reviews/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setMyReview(response.data);
        })
        .catch((err) => {});
  }, [book]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/` + id)
      .then((response) => {
        setBook(response.data.book);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsDetailLoading(false));
  }, []);

  const toggleFavorite = async () => {
    if (isLoggedIn) {
      setUserUserLoading(true);
      setIsHeartLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/users/favourites`,
          { bookId: book?._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setIsHeartLoading(false);
          setisLiked(!isLiked);
        })
        .catch((error) =>
          toast({
            title: "Error",
            description: err.response.data.message,
            variant: "destructive",
          })
        );
    } else {
      setisLiked(!isLiked);
      toast({
        description: "You need to be logged in",
        variant: "destructive",
      });
    }
  };

  const image = book?.image_url.replace("upload/", "upload/w_512/");
  if (isDetailLoading) {
    return (
      <div className="w-full">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  } else if (!book) {
    return <NotFound />;
  }
  return (
    <div className="grid p-4 sm:p-6 gap-2">
      <div className="flex flex-col sm:flex-row gap-5 h-auto w-full max-w-4xl m-auto">
        <div className="flex flex-col items-center sm:sticky sm:top-24 pb-2 rounded-lg h-full">
          <img
            src={image}
            alt="Book cover"
            className="sm:max-w-lg w-full object-cover rounded-md"
          />
        </div>
        <div className="h-fit w-full space-y-2">
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

          {myReview && (
            <div className="flex flex-col border-2 rounded-md p-3 sm:p-4 mt-4 w-full overflow-y-auto">
              <div className="flex items-center w-full gap-2">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg"
                  src={`https://api.multiavatar.com/${myReview.userId._id}.svg`}
                  alt="user"
                />
                <div className="flex flex-col items-start">
                  <h4 className="text-lg font-medium tracking-tight">
                    {myReview.userId.firstName + " " + myReview.userId.lastName}
                  </h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        size={15}
                        key={index}
                        color={myReview.rating >= index + 1 ? "gold" : "grey"}
                        fill={myReview.rating >= index + 1 ? "gold" : "grey"}
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-3">
                      {formatDate(myReview.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <blockquote className="ml-1 my-2 sm:my-4 italic text-sm sm:text-base">
                {myReview.content}
              </blockquote>
              <div className="flex gap-2 items-center">
                <Button
                  variant="outline"
                  className="gap-2 p-2 border-2 border-slate-300"
                  onClick={() => setIsEditing(!isEditing)}>
                  <Pencil size={20} />
                  <span className="hidden md:flex">Edit</span>
                </Button>
              </div>
            </div>
          )}

          {(isEditing || !myReview) && (
            <ReviewForm book={book} isEditing={true} reviewId={myReview?._id} />
          )}

          <div className="flex pb-2">
            <Button
              variant="outline"
              className={`flex  mr-2 p-2 md:px-2 gap-2 border-2 ${
                isLiked ? "bg-red-100 hover:bg-red-200/80 border-red-200" : ""
              }`}
              onClick={toggleFavorite}>
              {isHeartLoading ? (
                <Loader2
                  color="red"
                  strokeWidth={2.5}
                  opacity={0.5}
                  className="w-8 h-8 animate-spin"
                />
              ) : (
                <Heart isLiked={isLiked} />
              )}
              <span className="hidden md:flex">
                {isLiked ? "Added to Favourites" : "Add to Favourites"}
              </span>
            </Button>
            {role === "admin" && (
              <div className="flex gap-2 sm:justify-end w-full">
                <Button
                  className=" bg-slate-500 hover:bg-slate-500/90"
                  onClick={() => navigate(`edit`)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger className="h-10 px-4 py-2 bg-red-500 text-slate-50 hover:bg-red-500/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-11/12">
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
                              `${import.meta.env.VITE_BACKEND_URL}/books/` + id,
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            )
                            .then((response) => {
                              toast({
                                description: response.data.message,
                                variant: "destructive",
                              });
                              navigate("/books");
                            })
                            .catch((err) => {
                              toast({
                                title: "Error",
                                description: err.response.data.message,
                                variant: "destructive",
                              });
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
      <ReviewList book={book} />
    </div>
  );
};

export default Details;
