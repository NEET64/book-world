const Heart = ({ isLiked }) => {
  return (
    <div className="relative heart-btn w-fit">
      <span
        className={`absolute heart ${isLiked ? "heart-active" : ""}`}></span>
      <span className="relative p-4 cursor-pointer flex items-center rounded-full justify-center"></span>
    </div>
  );
};

export default Heart;
