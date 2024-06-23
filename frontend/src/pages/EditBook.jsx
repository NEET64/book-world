import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { bookSchema } from "@/schema";
import SelectGenreCombobox from "@/components/SelectGenreCombobox";
import useGetBook from "@/hooks/useGetBook";
import genres from "@/utilities/genres";
import { useSetRecoilState } from "recoil";
import { pageTitleAtom } from "@/atoms/meta";
import { toast } from "sonner";

const EditBook = () => {
  const { book, id } = useGetBook();
  const navigate = useNavigate();
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  useEffect(() => setPageTitle("Edit Book"), []);

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

  const [isEditLoading, setIsEditLoading] = useState(false);
  const onSubmit = (values) => {
    setIsEditLoading(true);
    let promise = axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/books/` + id,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        navigate("/books/" + id);
        return response.data.message;
      },
      error: (error) => error.response.data.message,
      finally: () => setIsEditLoading(false),
    });
  };

  return (
    <div className="grid flex-1 gap-4 p-4 my-4 sm:px-6 sm:py-0 md:gap-8">
      <Card className="w-full max-w-xl mx-auto rounded-lg shadow-md overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="border-b border-slate-200 dark:border-zinc-800">
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
                        options={genres}
                        name="Genre"
                        form={form}
                        previousGenre={book?.genre}
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
            <CardFooter className="border-t border-slate-200 px-6 py-4 dark:border-zinc-800">
              {isEditLoading ? (
                <>
                  <Button disable>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                </>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditBook;
