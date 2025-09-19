import { useEffect, useState } from "react";
import Button from "./ui/Button";
import AxiosInstance from "../confing/axios.confing";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);
  const [lodding, setLodding] = useState(true);
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  useEffect(() => {
    try {
      AxiosInstance.get("/users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      })
        .then((rea) => setTodoData(rea.data.todos))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    } finally {
      setLodding(false);
    }
  }, [userData.jwt]);

  if (lodding) return <h1> Lodding..... </h1>;

  return (
    <div className="space-y-3">
      {todoData.length ? (
        todoData.map((todo) => (
          <div key={todo.id} className="flex  justify-between items-center">
            <h1 className="text-lg">{todo.title}</h1>
            <div className="flex gap-2">
              <Button> Edit </Button>
              <Button className="bg-red-800 "> Cancel </Button>
            </div>
          </div>
        ))
      ) : (
        <h1> No todo yet... </h1>
      )}
    </div>
  );
};

export default TodoList;
