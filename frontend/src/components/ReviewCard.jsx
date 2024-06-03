import {
  CircleAlert,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Star,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import Commentcard from "./CommentCard";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { formatDate } from "@/utilities/formatDate";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import useUserData from "@/hooks/useUserData";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const ReviewCard = ({ review, bookId }) => {
  const [showForm, setShowForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [replies, setReplies] = useState();
  const { userId, role, isLikedReview, isUserLoading, setIsUserLoading } =
    useUserData();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const toggleLike = async () => {
    if (!!role) {
      setIsLikeLoading(true);

      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/books/${bookId}/reviews/${
            review._id
          }/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setIsLikeLoading(false);
          setIsLiked(!isLiked);
        })
        .catch((error) =>
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
          })
        )
        .finally(() => setIsLikeLoading(false));
    } else {
      setIsLiked(!isLiked);
      toast({
        description: "You need to be logged in",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!showReplies) return;

    setIsReplyLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/books/${bookId}/reviews/${
          review._id
        }/comments/`
      )
      .then((response) => {
        setReplies(response.data.comments);
      })
      .catch((err) => {
        toast({
          description: "User can only have 1 review ",
          variant: "destructive",
        });
      })
      .finally(() => setIsReplyLoading(false));
  }, [showReplies]);

  useEffect(() => {
    if (!isUserLoading && review) setIsLiked(isLikedReview(review._id));
  }, [isUserLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!comment) {
      toast({
        description: "Please write a comment",
        variant: "destructive",
      });
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/books/${bookId}/reviews/${
          review._id
        }/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        toast({ description: response.data.message });
      })
      .catch((err) => {
        toast({
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col border-2 rounded-md p-3 sm:p-4 mt-4 w-full overflow-y-auto">
      <div className="flex items-center w-full gap-2">
        <img
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg"
          src={`https://api.multiavatar.com/${review.userId._id}.svg`}
          alt="user"
        />
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-medium tracking-tight">
            {review.userId.firstName + " " + review.userId.lastName}
          </h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                size={15}
                key={index}
                color={review.rating >= index + 1 ? "gold" : "grey"}
                fill={review.rating >= index + 1 ? "gold" : "grey"}
              />
            ))}
            <span className="text-gray-500 text-sm ml-3">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div
        className={showReplies ? "border-l-2 ml-5 pl-6 sm:ml-6 sm:pl-7" : ""}>
        <blockquote className="ml-1 my-2 sm:my-4 italic text-sm sm:text-base">
          {review.content}
        </blockquote>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className={`gap-2 p-2 ${
              isLiked && "bg-slate-200 border-2 border-slate-300"
            }`}
            title={isLiked ? "unlike" : "like"}
            onClick={toggleLike}>
            {isLikeLoading ? (
              <Loader2
                strokeWidth={2.5}
                opacity={0.5}
                className="w-6 h-6 animate-spin"
              />
            ) : (
              <ThumbsUp />
            )}
            <span className="hidden md:flex">{isLiked ? "Liked" : "Like"}</span>
          </Button>
          <Button
            variant="outline"
            className="gap-2 p-2"
            onClick={() => setShowForm(!showForm)}>
            <MessageSquare />
            <span className="hidden md:flex">Comment</span>
          </Button>
          {review.comments.length > 0 && (
            <Button
              variant="outline"
              className="gap-2 p-2 "
              onClick={() => setShowReplies(!showReplies)}>
              <MessagesSquare />
              <span className="hidden md:flex gap-2">
                {showReplies ? "Hide Replies" : "Show Replies"}
                <span className="flex items-center justify-center bg-slate-200 text-gray-600 p-3 h-5 w-5 rounded-full">
                  {review.comments.length}
                </span>
              </span>
            </Button>
          )}
          {(role === "admin" || userId === review.userId._id) && (
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex ml-auto py-2 px-2 gap-2">
                  <Trash2 />
                  <span className="hidden md:flex">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-11/12">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    Review and all the Replies below.
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
                          `${
                            import.meta.env.VITE_BACKEND_URL
                          }/books/${bookId}/reviews/${review._id}`,
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
                        })
                        .catch((err) => {
                          toast({
                            title: "Error",
                            description: err.response.data.message,
                            variant: "destructive",
                          });
                        })
                        .finally(() => {
                          setIsDeleteLoading(false);
                          setOpen(false);
                        });
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
          )}
          {(role === "admin" || userId != review.userId._id) && (
            <AlertDialog open={openReport} onOpenChange={setOpenReport}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex ${
                    role !== "admin" && "ml-auto"
                  } py-2 px-2 gap-2`}>
                  <CircleAlert />
                  <span className="hidden md:flex">Report</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-11/12">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Report?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to report this user? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    className="bg-red-500/90 hover:bg-red-500"
                    onClick={() => {
                      setIsDeleteLoading(true);
                      axios
                        .post(
                          `${import.meta.env.VITE_BACKEND_URL}/users/${
                            review.userId._id
                          }/report`,
                          {},
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
                        })
                        .catch((err) => {
                          toast({
                            title: "Error",
                            description: err.response.data.message,
                            variant: "destructive",
                          });
                        })
                        .finally(() => {
                          setIsDeleteLoading(false);
                          setOpenReport(false);
                        });
                    }}>
                    {isDeleteLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      <>Report</>
                    )}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="sm:w-3/4 mt-2">
            <Textarea
              placeholder="Comment here ..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button variant="outline" className="mt-2">
                Submit
              </Button>
            )}
          </form>
        )}
        {showReplies && isReplyLoading ? (
          <div className="w-full">
            <Loader2 className="mx-auto h-10 w-10 animate-spin" />
          </div>
        ) : (
          showReplies &&
          replies?.map((comment, index) => (
            <Commentcard
              key={index}
              comment={comment}
              bookId={bookId}
              reviewId={review._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
