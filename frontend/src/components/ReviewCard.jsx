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
import axios from "axios";
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
import { useRecoilValue } from "recoil";
import {
  likedReviewsAtom,
  userAvatarSelector,
  userIdAtom,
  userRoleAtom,
} from "@/atoms/userData";
import { toast } from "sonner";
import multiavatar from "@multiavatar/multiavatar";

const ReviewCard = ({
  review,
  bookId,
  handleParentReload,
  setUserReplyCounter,
}) => {
  const userId = useRecoilValue(userIdAtom);
  const role = useRecoilValue(userRoleAtom);
  const likedReviews = useRecoilValue(likedReviewsAtom);
  const svgCode = multiavatar(review.userId._id);
  const svgBase64 = `data:image/svg+xml;base64,${btoa(svgCode)}`;

  // Usefull when Children are added or deleted
  const [replyCount, setReplyCount] = useState(0);
  useEffect(() => {
    setReplyCount(review.comments.length);
    setIsLiked(likedReviews.includes(review?._id));
  }, [review, likedReviews]);

  // Liking Reply
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsLikeLoading(false));
    } else {
      setIsLiked(!isLiked);
      toast.error("You need to be logged in");
    }
  };

  // Trigger for Children to refetch Replies
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState();
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const handleReload = () => setCounter(counter + 1);
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
        setReplyCount(response.data.comments.length);
      })
      .catch((err) => toast.error("User can only have 1 review"))
      .finally(() => setIsReplyLoading(false));
  }, [showReplies, counter]);

  // Deleting Review
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDelete = () => {
    setIsDeleteLoading(true);
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/books/${bookId}/reviews/${
          review._id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (userId === review.userId._id) setUserReplyCounter(-1);
        handleParentReload();
        toast.warning(response.data.message);
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {
        setIsDeleteLoading(false);
        setOpen(false);
      });
  };

  // Reporting User
  const [openReport, setOpenReport] = useState(false);
  const handleReport = () => {
    setIsDeleteLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/users/${review.userId._id}/report`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => toast.warning(response.data.message))
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => {
        setIsDeleteLoading(false);
        setOpenReport(false);
      });
  };

  // Commenting on Reviews
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!comment) {
      toast.error("Please write a comment");
      return;
    }
    setIsLoading(true);
    const promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/books/${bookId}/reviews/${
        review._id
      }/comments`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        handleParentReload();
        return response.data.message;
      },
      error: (error) => error.response.data.message,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <div className="flex flex-col border-2 rounded-md p-3 sm:p-4 mt-4 w-full overflow-y-auto border-slate-200 dark:border-zinc-800">
      <div className="flex items-center w-full gap-2 pb-2">
        <img
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-lg"
          src={review.userId.picture || svgBase64}
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
                color={review.rating >= index + 1 ? "gold" : "#E2E8F0"}
                fill={review.rating >= index + 1 ? "gold" : "#E2E8F0"}
              />
            ))}
            <span className="text-gray-500 text-sm ml-3">
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          showReplies && replyCount > 0
            ? "border-l-2 ml-5 pl-6 sm:ml-6 sm:pl-7"
            : ""
        }>
        <blockquote className="ml-1 mb-2 sm:mb-4 italic text-sm sm:text-base">
          {review.content}
        </blockquote>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className={`gap-2 p-2 ${
              isLiked &&
              "bg-slate-200 border-2 border-slate-300 dark:border-zinc-500 dark:bg-zinc-800"
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
          {replyCount > 0 && (
            <Button
              variant="outline"
              className="gap-2 p-2 "
              onClick={() => setShowReplies(!showReplies)}>
              <MessagesSquare />
              <span className="flex gap-2">
                <span className="hidden md:flex">
                  {showReplies ? "Hide Replies" : "Show Replies"}
                </span>
                <span className="flex items-center justify-center bg-slate-200 text-slate-600 p-3 h-5 w-5 rounded-full">
                  {replyCount}
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
                  <Button variant="destructive" onClick={handleDelete}>
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
                  <Button variant="destructive" onClick={handleReport}>
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
              <Button disabled className="mt-2 bg-slate-200 text-slate-800">
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
              handleParentReloadReply={handleReload}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
