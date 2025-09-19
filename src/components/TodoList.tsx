import Button from "./ui/Button";
import AxiosInstance from "../confing/axios.confing";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await AxiosInstance.get("/users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      return data;
    },
  });
  console.log(data);
  if (isPending) return "Loading...";

  return (
    <div className="space-y-3">
      {data.todos.map((todo) => (
        <div key={todo.id} className="flex  justify-between items-center">
          <h1 className="text-lg">{todo.title}</h1>
          <div className="flex gap-2">
            <Button> Edit </Button>
            <Button className="bg-red-800 "> Cancel </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
