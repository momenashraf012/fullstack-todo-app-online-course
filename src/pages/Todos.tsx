import { ChangeEvent, useState } from "react";
import Paginator from "../components/ui/Pagination";
import useAuthenticated from "../Hooks/useAuthenticated";
import { Itodo } from "../interface";

// Handlers
const TodosPage = () => {
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [sortBy, setSortBy] = useState("ASC");

  const { isLoading, data } = useAuthenticated({
    queryKey: ["Paginate", `${page}`, `${pageSize},${sortBy}`],
    url: `/todos?=&pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`,
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  console.log(data);

  const onClickPrev = () => {
    setPage((prev) => prev - 1);
  };

  const onClickNext = () => {
    setPage((prev) => prev + 1);
  };

  const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    setpageSize(+e.target.value);
  };

  const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  if (isLoading)
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );

  return (
    <div className="mb-6 ">
      <div className="flex justify-end mb-10">
        <div className="flex items-center justify-between space-x-2 text-md">
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={sortBy}
            onChange={onChangeSortBy}
          >
            <option disabled>Sort by</option>
            <option value="ASC">Oldest</option>
            <option value="DESC">Latest</option>
          </select>
          <select
            className="border-2 border-indigo-600 rounded-md p-2"
            value={pageSize}
            onChange={onChangePageSize}
          >
            <option disabled>Page Size</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {data.data.length ? (
        data.data.map((todo: Itodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <h1 className="text-lg">
              {" "}
              {todo.id} - {todo.title}
            </h1>
          </div>
        ))
      ) : (
        <h1> no Todo yet?.... </h1>
      )}

      <Paginator
        page={page}
        pageCount={data.meta.pagination.pageCount}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        total={data.meta.pagination.total}
      />
    </div>
  );
};

export default TodosPage;
