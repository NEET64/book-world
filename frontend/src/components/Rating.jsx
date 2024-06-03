import React, { useEffect, useState } from "react";

const Rating = ({ form }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    form.setValue("rating", rating);
  }, [rating]);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <label key={index} className="mr-1 cursor-pointer">
          <input
            type="radio"
            name="rating"
            value={index + 1}
            checked={rating === index + 1}
            className="hidden"
            onChange={() => setRating(index + 1)}
          />
          <div
            className="relative heart-btn w-full"
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(null)}>
            <span className="relative p-4  flex items-center rounded-full justify-center"></span>
            <span
              className={`absolute pointer-events-none  star ${
                rating == index + 1 ? "star-animate z-10" : ""
              } ${(hover || rating) >= index + 1 ? "star-active" : ""}`}></span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Rating;
