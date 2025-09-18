import { useEffect, useState } from "react";
import Button from "./ui/Button";
import AxiosInstance from "../confing/axios.confing";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);
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
    }
  }, [userData.jwt]);

  return (
    <div className="space-y-3">
      {todoData.map((input) => (
        <div key={input.id} className="flex  justify-between items-center">
          <h1 className="text-lg">{input.title}</h1>
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
