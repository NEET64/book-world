import { z } from "zod";
export const bookSchema = z.object({
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

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
