import { LayoutGrid, Loader2, PlusCircle, Table } from "lucide-react";
import { lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/DataTable";
import { bookColumns } from "@/components/bookColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
const BookCard = lazy(() => import("@/components/BookCard"));
import useBooks from "@/hooks/useBooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userRoleAtom } from "@/atoms/userData";
import { pageTitleAtom } from "@/atoms/meta";

const Homepage = () => {
  const role = useRecoilValue(userRoleAtom);
  const navigate = useNavigate();
  const { books, isLoading } = useBooks();
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  useEffect(() => setPageTitle("The Book World"), []);

  return (
    <main className="grid flex-1 items-start p-2 sm:px-4 md:gap-8">
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
                variant="outline"
                className="h-10 gap-2"
                onClick={() => {
                  navigate("add");
                }}>
                <PlusCircle size={20} />
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
