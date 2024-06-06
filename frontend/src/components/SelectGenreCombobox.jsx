import { useController } from "react-hook-form";
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

const SelectGenreCombobox = ({ options, form, name, previousGenre }) => {
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
    setSelectedValues(new Set(previousGenre));
  }, [previousGenre]);

  return (
    <Popover>
      <PopoverTrigger className="flex justify-start w-full">
        <span className="h-10 py-2 px-2 w-full inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 border border-slate-200 bg-white hover:bg-slate-200 hover:text-slate-900 dark:border-zinc-800 dark:bg-zinc-950">
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
            <p className="px-1 text-slate-500 dark:text-zinc-500 text-sm font-normal">
              Genre
            </p>
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
};

export default SelectGenreCombobox;
