import Button from "./ui/Button";

import useAuthenticated from "../Hooks/useAuthenticated";
import { Itodo } from "../interface";
import Model from "./ui/Model";
import { useState } from "react";
import Input from "./ui/Input";

const TodoList = () => {
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isEditModelOpen, setisEditModelOpen] = useState(false);

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

  //handler
  const onOpenEditModel = () => {
    setisEditModelOpen(true);
  };
  const onCloseEditModel = () => {
    setisEditModelOpen(false);
  };
  return (
    <div className="space-y-3">
      {data.todos.length ? (
        data.todos.map((todo: Itodo) => (
          <div key={todo.id} className="flex  justify-between items-center">
            <h1 className="text-lg">{todo.title}</h1>
            <div className="flex gap-2">
              <Button onClick={onOpenEditModel}> Edit </Button>
              <Button className="bg-red-800 "> Cancel </Button>
            </div>
          </div>
        ))
      ) : (
        <h1> no Todo yet?.... </h1>
      )}

      <Model
        title="Edit this todo"
        closeModal={onCloseEditModel}
        isOpen={isEditModelOpen}
      >
        <div className="space-y-2">
       <Input  value={"hello momen"}/>
        <div className="flex gap-4"> 
      <Button onClick={onOpenEditModel}> Update </Button>
          <Button onClick={onCloseEditModel} variant={"cancel"}> Cancel </Button>
      
        </div>
          
        </div>
        
      </Model>
    </div>
  );
};

export default TodoList;
