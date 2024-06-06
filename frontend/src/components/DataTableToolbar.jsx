import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeOff } from "lucide-react";

const DataTableToolbar = ({ table, children, searchBy }) => {
  const [searchByState, setSearchByState] = useState(searchBy);

  return (
    <div className="flex justify-between mb-2 gap-2">
      <div className="flex items-center w-full gap-2">
        <Input
          placeholder="Filter..."
          value={table.getColumn(searchByState)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(searchByState)?.setFilterValue(event.target.value)
          }
          className="max-w-48"
        />
        <Select
          onValueChange={(value) => setSearchByState(value)}
          defaultValue={"title"}>
          <SelectTrigger className=" max-w-28">
            <SelectValue placeholder="Search By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex ml-auto sm:ml-0">
              <EyeOff className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {children}
    </div>
  );
};

export default DataTableToolbar;
