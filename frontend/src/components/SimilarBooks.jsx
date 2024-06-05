import useBooks from "@/hooks/useBooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import BookCard from "./BookCard";

const SimilarBooks = ({ book }) => {
  const { books } = useBooks(book.genre.join(" "));
  if (books.length == 1) return <></>;
  return (
    <Carousel
      className="w-full max-w-4xl mx-auto mt-8"
      opts={{ dragFree: true, slidesToScroll: 3 }}>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl mb-4">
        Similar Books
      </h2>
      <CarouselContent className="-ml-2">
        {books.map((book, index) => (
          <CarouselItem
            key={index}
            className="pl-0 basis-1/3 md:basis-1/4 lg:basis-1/5">
            <BookCard book={book} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SimilarBooks;
