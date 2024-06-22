import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="dark:text-zinc-50 w-full">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold ">
            Page Not Found.
          </p>
          <p className="mb-4 text-lg font-light text-zind-500">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <Link
            to="/books"
            className="inline-flex text-white bg-slate-800 hover:bg-slate-800/90 dark:bg-zinc-800 dark:hover:bg-zinc-800/60 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
