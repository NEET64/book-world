import useAuth from "@/hooks/useAuth";
import { LayoutGrid, Loader2, PlusCircle, Table } from "lucide-react";
import { lazy, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { DataTable } from "@/components/DataTable";
import { bookColumns } from "@/components/bookColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
const BookCard = lazy(() => import("@/components/BookCard"));
import { useToast } from "@/components/ui/use-toast";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const { role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/books`, {
        params: { q: searchQuery },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  }, [location.search]);

  return (
    <main className="grid flex-1 items-start p-2 sm:px-4 sm:py-0 md:gap-8">
      <Tabs defaultValue="block">
        <div className="flex items-center px-2 pt-2">
          <TabsList>
            <TabsTrigger default value="block" className="flex gap-2">
              <LayoutGrid size={20} />{" "}
              <h3 className="not-hidden sm:block">Block</h3>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex gap-2">
              <Table size={20} /> <h3 className="not-hidden sm:block">Table</h3>
            </TabsTrigger>
          </TabsList>
          {role === "admin" && (
            <div className="ml-auto flex items-center gap-2">
              <Button
                className="h-10 gap-2"
                onClick={() => {
                  navigate("add");
                }}>
                <PlusCircle className="h-4 w-4" />
                Add Book
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="block">
          {isLoading ? (
            <div className="w-full grid items-center">
              <Loader2 className="mx-auto  h-10 w-10 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap">
              {books?.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="table" className="grid">
          <DataTable
            searchBy="title"
            columns={bookColumns}
            data={books}></DataTable>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Homepage;
