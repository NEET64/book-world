import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
const BookCard = ({ book }) => {
  return (
    <Link
      to={`/books/` + book._id}
      className="w-full sm:w-1/3 md:w-1/4 lg:w-1/6 xl:58 fixed-height overflow-hidden">
      <div className="relative m-2 group rounded-lg aspect-w-3 aspect-h-4">
        <img
          src={book.image_url}
          alt="Book cover"
          className="w-full h-full object-cover object-center transition-transform duration-500 rounded-lg shadow-md group-hover:scale-105"
        />
        <div className="absolute flex flex-col inset-0 justify-end opacity-0 group-hover:opacity-100 duration-500">
          <div className="absolute group-hover:scale-105 transition-all duration-700 inset-0 rounded-lg bg-gradient-to-t from-gray-900 via-gray-900/10"></div>
          <h3
            className="z-10 mx-2 text-xl line-clamp-2 font-bold text-white"
            title={book.title}>
            {book.title}
          </h3>
          <div className="z-10 mx-2 overflow-hidden text-sm text-gray-300">
            {book.author}
          </div>
          <div className="z-10 mx-2 mt-2 flex flex-wrap gap-2 text-white">
            {book.genre?.slice(0, 3).map((genre, index) => (
              <Badge
                className="bg-slate-50 text-slate-900 hover:bg-slate-50/80"
                key={index}>
                {genre}
              </Badge>
            ))}
            {book.genre?.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{book.genre.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
