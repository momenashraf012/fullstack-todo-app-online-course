
import { useState } from "react";
import Paginator from "../components/ui/Pagination";
import useAuthenticated from "../Hooks/useAuthenticated";
import { Itodo } from "../interface";

// Handlers
const TodosPage = () => {
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [page,setPage]=useState(1)

  const { isPending, data } = useAuthenticated({
    queryKey: ["Paginate",`${page}`],
    url: "/todos?=&pagination[pageSize]=50&pagination[page]=2",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  console.log(data)

  const onClickPrev=()=>
  {
    setPage(prev => prev -1 )

  }

  const onClickNext =()=>{
setPage(prev => prev +1 )

  }

  if (isPending)
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
    <div className="mb-6">
      {data.data.length ? (
        data.data.map((todo: Itodo) => (
          <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
            <h1 className="text-lg">
              {" "}
              {todo.id} - {todo.title}
            </h1>
          </div>
        ))
      ) : (
        <h1> no Todo yet?.... </h1>
      )}



      <Paginator page={page} pageCount={3} onClickPrev={onClickPrev} onClickNext={onClickNext}/>
    </div>
  );
};

export default TodosPage;
