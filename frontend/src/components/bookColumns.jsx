import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import DataTableColumnHeader from "./DataTableColumnHeader";

export const bookColumns = [
  {
    accessorKey: "image_url",
    header: ({ column }) => <h1>Thumbnail</h1>,
    cell: ({ row }) => {
      return <img src={row.getValue("image_url")} className="h-28" />;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return <span className="truncate">{row.getValue("title")}</span>;
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      return <span className="truncate">{row.getValue("author")}</span>;
    },
  },
  {
    accessorKey: "year_published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year Published" />
    ),
    cell: ({ row }) => {
      return <span className="truncate">{row.getValue("year_published")}</span>;
    },
  },
  {
    id: "genre",
    header: "Genre",
    cell: ({ row }) => {
      const data = row.original.genre;
      return (
        <div className="flex flex-wrap max-w-sm gap-2">
          {data?.slice(0, 2).map((genre, index) => (
            <Badge variant="dark:secondary" key={index}>
              {genre}
            </Badge>
          ))}
          {data?.length > 2 && (
            <span className="text-gray-400 text-xs self-center">
              +{data.length - 2} more
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <>
          <Button
            variant="outline"
            onClick={() => {
              navigate(row.original._id);
              // navigate({row.})
            }}>
            view
          </Button>
        </>
      );
    },
  },
];
