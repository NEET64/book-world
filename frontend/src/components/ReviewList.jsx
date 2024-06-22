import { Loader2, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { Progress } from "./ui/progress";
import { formatNumber } from "@/utilities/formatNum";
import { toast } from "sonner";
import { set } from "react-hook-form";

const ReviewList = ({ book, userReplyCounter, setUserReplyCounter }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books/${book._id}/reviews/`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch((err) => toast.error(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, [counter, userReplyCounter]);

  const [meta, setMeta] = useState({
    totalReviews: 4000,
    averageRating: 4.0,
    initialReviews: 3340,
    stars: [50, 200, 300, 1000, 2000],
  });
  const stars = [0, 0, 0, 0, 0];

  useEffect(() => {
    if (!reviews) return;
    let total = 0;
    reviews.map((review) => {
      stars[review.rating - 1]++;
      total += review.rating;
    });
    setMeta({
      totalReviews: reviews.length,
      averageRating: reviews.length === 0 ? 0 : total / reviews.length,
      initialReviews: 1,
      stars: stars,
    });
  }, [reviews]);

  if (isLoading) {
    return (
      <div className="w-full grid items-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full max-w-5xl m-auto mt-5 rounded-lg overflow-hidden">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
        Ratings and Reviews
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm py-4 my-2 border-b-2 border-slate-200   dark:border-zinc-800">
        <div className="flex flex-col justify-center p-4 pl-10 sm:pl-4 rounded-lg border-2 border-slate-200 dark:border-zinc-800">
          <h3 className="text-md font-bold mb-2">Total Reviews</h3>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold">
              {formatNumber(meta.totalReviews)}
            </p>
            <p className="bg-green-100 text-green-700 rounded-full px-3 py-1 font-medium flex items-center gap-1">
              {(
                ((meta.totalReviews - meta.initialReviews) /
                  meta.initialReviews) *
                100
              ).toFixed(0)}
              % <TrendingUp size={20} />
            </p>
          </div>
          <p className="text-gray-500/60 text-sm">
            Growth in reviews this year
          </p>
        </div>
        <div className="flex flex-col justify-center p-4 pl-10 sm:pl-4 rounded-lg border-2 border-slate-200 dark:border-zinc-800">
          <h3 className="text-md font-bold mb-2">Average Rating</h3>
          <div className="flex items-center gap-2">
            <p className="text-4xl font-bold">
              {meta.averageRating.toFixed(1)}
            </p>

            <Star size={30} color="gold" fill="gold" />
          </div>
          <p className="text-gray-500/60 text-sm">Average Rating this year</p>
        </div>
        <div className="flex flex-col sm:col-span-2 md:col-span-1 gap-2 justify-center p-4 rounded-lg border-2 border-slate-200 dark:border-zinc-800">
          <div className="flex h-3 items-center gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>5</span>
            <Progress
              value={(meta.stars[4] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-teal-400"
              className="h-2"
            />
          </div>
          <div className="flex h-3 items-center gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>4</span>
            <Progress
              value={(meta.stars[3] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-purple-400"
              className="h-2"
            />
          </div>
          <div className="flex h-3 items-center gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>3</span>
            <Progress
              value={(meta.stars[2] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-yellow-400"
              className="h-2"
            />
          </div>
          <div className="flex h-3 items-center gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>2</span>
            <Progress
              value={(meta.stars[1] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-blue-400"
              className="h-2"
            />
          </div>
          <div className="flex h-3 items-center gap-2">
            <Star
              size={15}
              color="#E2E8F0"
              fill="#E2E8F0"
              className="dark:opacity-30"
            />
            <span>1</span>
            <Progress
              value={(meta.stars[0] / meta.totalReviews) * 100}
              innerClass="rounded-full bg-red-400"
              className="h-2"
            />
          </div>
        </div>
      </div>
      {reviews.length !== 0 ? (
        reviews?.map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            bookId={book._id}
            setUserReplyCounter={() =>
              setUserReplyCounter(userReplyCounter + 1)
            }
            handleParentReload={() => setCounter(counter + 1)}
          />
        ))
      ) : (
        <h3 className=" text-2xl tracking-tight">No Reviews</h3>
      )}
    </section>
  );
};

export default ReviewList;
