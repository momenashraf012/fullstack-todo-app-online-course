import Button from "./ui/Button";
import AxiosInstance from "../confing/axios.confing";
import { useQuery } from "@tanstack/react-query";
import useAuthenticated from "../Hooks/useAuthenticated";

const TodoList = () => {
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isPending, data } = useAuthenticated({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  console.log(data);
  if (isPending) return "Loading...";

  return (
    <div className="space-y-3">
      {data.todos.length ? (
        data.todos.map((todo) => (
          <div key={todo.id} className="flex  justify-between items-center">
            <h1 className="text-lg">{todo.title}</h1>
            <div className="flex gap-2">
              <Button> Edit </Button>
              <Button className="bg-red-800 "> Cancel </Button>
            </div>
          </div>
        ))
      ) : (
        <h1> no Todo yet?.... </h1>
      )}
    </div>
  );
};

export default TodoList;
