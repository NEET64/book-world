import {
  CircleAlert,
  Loader2,
  MessageSquare,
  MessagesSquare,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
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

const Commentcard = ({
  comment,
  bookId,
  reviewId,
  handleParentReloadReply,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [counter, setCounter] = useState(0);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [myComment, setMyComment] = useState("");
  const [replies, setReplies] = useState();
  const [replyCount, setReplyCount] = useState(0);
  const { userId, role, isLikedComment, isUserLoading } = useUserData();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  useEffect(() => {
    if (!isUserLoading && comment) setIsLiked(isLikedComment(comment._id));
  }, [isUserLoading]);

  const toggleLike = async () => {
    if (!!role) {
      setIsLikeLoading(true);

      axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/books/${bookId}/reviews/${reviewId}/comments/${comment._id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
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

  const handleReloadReply = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    const fetchReply = async () => {
      setIsReplyLoading(true);
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/books/${bookId}/reviews/${reviewId}/comments/${comment._id}`
        )
        .then((response) => {
          setReplies(response.data.comments);
          setReplyCount(response.data.comments.length);
        })
        .catch((err) => {
          toast({
            description: err.response.data.message,
            variant: "destructive",
          });
        })
        .finally(() => setIsReplyLoading(false));
    };
    fetchReply();
  }, [showReplies, reviewId, comment, bookId, counter]);

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
        `${
          import.meta.env.VITE_BACKEND_URL
        }/books/${bookId}/reviews/${reviewId}/comments/${comment._id}`,
        { content: myComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        handleParentReloadReply();
        toast({ description: response.data.message });
      })
      .catch((err) => {
        toast({
          description: err.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="flex flex-col mt-2">
      <div className="flex items-center h-12 w-full gap-2">
        <img
          className="h-10 w-10 rounded-full shadow-lg"
          src={`https://api.multiavatar.com/${comment.userId._id}.svg`}
          alt="user"
        />
        <div className="flex flex-col items-start">
          <h4 className="text-sm font-medium tracking-tight">
            {comment.userId.firstName + " " + comment.userId.lastName}
          </h4>
          <div className="flex items-center">
            <span className="text-gray-500 text-xs ">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className={showReplies ? "border-l-2 ml-5 pl-6" : "ml-11"}>
        <blockquote className="italic text-sm ml-1">
          {comment.content}
        </blockquote>
        <div className="flex gap-2 items-center my-2">
          <Button
            variant="outline"
            title="like"
            size="sm"
            className={`flex rounded-full p-2 ${
              isLiked &&
              "bg-zinc-200 border-2 border-zinc-300 dark:border-zinc-500 dark:bg-zinc-800"
            }`}
            onClick={toggleLike}>
            {isLikeLoading ? (
              <Loader2 opacity={0.5} size={20} className=" animate-spin" />
            ) : (
              <ThumbsUp size={20} />
            )}
          </Button>
          <Button
            variant="outline"
            title="comment"
            size="sm"
            className="flex p-2 rounded-full"
            onClick={() => setShowForm(!showForm)}>
            <MessageSquare size={20} />
          </Button>

          {replyCount > 0 && (
            <Button
              variant="outline"
              title="replies"
              size="sm"
              className="flex gap-1 rounded-full p-2"
              onClick={() => setShowReplies(!showReplies)}>
              <MessagesSquare size={20} />
              <span className="flex items-center justify-center bg-zinc-200 text-gray-600 p-3 h-5 w-5 rounded-full">
                {replyCount}
              </span>
            </Button>
          )}

          {(role === "admin" || userId === comment.userId._id) && (
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  title="delete"
                  size="sm"
                  className="flex rounded-full py-2 px-2 gap-2">
                  <Trash2 size={20} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-11/12">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    Comment and all the Replies below.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsDeleteLoading(true);
                      axios
                        .delete(
                          `${
                            import.meta.env.VITE_BACKEND_URL
                          }/books/${bookId}/reviews/${reviewId}/comments/${
                            comment._id
                          }`,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                          }
                        )
                        .then((response) => {
                          handleParentReloadReply();
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
          {(role === "admin" || userId != comment.userId._id) && (
            <AlertDialog open={openReport} onOpenChange={setOpenReport}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  title="report"
                  className="flex rounded-full py-2 px-2 gap-2">
                  <CircleAlert size={20} />
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
                    variant="destructive"
                    onClick={() => {
                      setIsDeleteLoading(true);
                      axios
                        .post(
                          `${import.meta.env.VITE_BACKEND_URL}/users/${
                            comment.userId._id
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
                          navigate("/books");
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
              placeholder="Comment here..."
              value={myComment}
              onChange={(event) => setMyComment(event.target.value)}
            />
            {isLoading ? (
              <Button disabled className="mt-2">
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
              reviewId={reviewId}
              handleParentReloadReply={handleReloadReply}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Commentcard;
