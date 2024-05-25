import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useController, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title must be at least 1 characters long" }),
  description: z.string().optional(),
  image: z
    .any(
      z
        .instanceof(File)
        .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
          message: `Image size must be less than ${
            (5 * 1024 * 1024) / 1000000
          }MB`,
        })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
          message: "Only JPEG, JPG, PNG, and WEBP formats are allowed",
        })
    )
    .optional(),
  author: z
    .string()
    .trim()
    .min(3, { message: "Author name must be at least 3 characters long" }),
  genre: z
    .array(
      z.enum([
        "Fantasy",
        "Science Fiction",
        "Mystery",
        "Romance",
        "Historical Fiction",
        "Non-Fiction",
        "Adventure",
      ])
    )
    .min(1, { message: "At least one genre is required" }),
  year_published: z.preprocess(
    (value) => (isNaN(value) ? 0 : value),
    z.coerce
      .number()
      .int()
      .gte(618, { message: "Year published must be at least 618" })
      .lte(new Date().getFullYear(), {
        message: "Year published cannot be in the future",
      })
      .optional()
  ),
});

const EditBook = () => {
  const [genre, setGenre] = useState([
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Historical Fiction",
    "Non-Fiction",
    "Adventure",
  ]);
  const [book, setBook] = useState();
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
      });
  }, []);

  const form = useForm({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      genre: [],
      image: "",
      year_published: new Date().getFullYear(),
    },
  });
  const [previewURL, setPreviewURL] = useState("");
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewURL(null);
    }
  };
  useEffect(() => {
    form.reset({
      title: book?.title,
      author: book?.author,
      description: book?.description,
      genre: book?.genre,
      image: "",
      year_published: book?.year_published,
    });

    setPreviewURL(book?.image_url);
  }, [book]);

  const fileRef = form.register("file");

  const onSubmit = (values) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/books/` + id, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        navigate("/books/" + id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Card className="w-full max-w-xl mx-auto rounded-lg shadow-md overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="border-b">
              <CardTitle>Edit Book</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-3 py-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-0 sm:col-span-3">
                    <FormLabel className="text-left">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of the Book" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="space-y-0 sm:col-span-2">
                    <FormLabel className="text-left">Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author of the Book" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year_published"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-left">Year</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Year Published"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-0 sm:col-span-3">
                    <FormLabel className="text-left">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief summary of the book..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem className="space-y-0 sm:col-span-3">
                    <FormLabel className="text-left">Genre</FormLabel>
                    <FormControl>
                      <SelectGenreCombobox
                        options={genre}
                        name="Genre"
                        form={form}
                        book={book}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-0">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Book Thumbnail"
                          {...fileRef}
                          onChange={(event) => {
                            field.onChange(
                              event.target?.files?.[0] ?? undefined
                            );
                            handleFileChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {previewURL && (
                <div>
                  <h4 className="text-sm italic">Image Preview</h4>
                  <img
                    src={previewURL}
                    alt="Image Preview"
                    className="w-48 rounded-md"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export function SelectGenreCombobox({ options, form, name, book }) {
  const [selectedValues, setSelectedValues] = useState(new Set());

  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control: form.control,
    rules: { required: true },
  });

  useEffect(() => {
    form.resetField("genre");
    form.setValue(name.toLowerCase(), Array.from(selectedValues));
  }, [selectedValues]);

  useEffect(() => {
    setSelectedValues(new Set(book?.genre));
  }, [book]);
  return (
    <Popover>
      <PopoverTrigger className="flex justify-start w-full">
        <span className="h-10 py-2 px-2 w-full inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset- border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900">
          {selectedValues.size > 0 ? (
            <>
              <div className="space-x-1 flex">
                {Array.from(selectedValues)
                  .slice(0, 2)
                  ?.map((option) => (
                    <Badge
                      variant="secondary"
                      key={option}
                      className="rounded-md px-1 font-normal">
                      {option}
                    </Badge>
                  ))}
                {selectedValues?.size > 2 && (
                  <span className="text-sm font-normal text-gray-400">
                    +{selectedValues?.size - 2} more
                  </span>
                )}
              </div>
            </>
          ) : (
            <p className="px-1 text-slate-500 text-sm font-normal">Genre</p>
          )}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={name} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option);
                      } else {
                        selectedValues.add(option);
                      }
                      const filterValues = new Set(selectedValues);
                      setSelectedValues(filterValues);
                    }}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}>
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValues(new Set())}
                    className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default EditBook;
