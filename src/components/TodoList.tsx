import Button from "./ui/Button";

import useAuthenticated from "../Hooks/useAuthenticated";
import { Itodo } from "../interface";
import Model from "./ui/Model";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import AxiosInstance from "../confing/axios.confing";

const TodoList = () => {
  const storageKey = "LoggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [isAddModelOpen, setisAddModelOpen] = useState(false);

  const [isEditModelOpen, setisEditModelOpen] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [todoToEdit, settodoToEdit] = useState<Itodo>({
    id: 0,
    title: "",
    description: "",
    documentId: "",
  });

  const [todoToAdd, settodoToAdd] = useState({
    title: "",
    description: "",
  });
  const [queryversion, setqueryversion] = useState(1);

  const [isOpenConfirmModeal, setisOpenConfirmModea] = useState(false);

  const { isPending, data } = useAuthenticated({
    queryKey: ["todos", `${queryversion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });
  console.log(data);
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

  //handler
  // Edit
  const onOpenEditModel = (todo: Itodo) => {
    settodoToEdit(todo);
    setisEditModelOpen(true);
  };
  const onCloseEditModel = () => {
    setisEditModelOpen(false);
  };
  // Add
  const onOpenAModel = () => {
    setisAddModelOpen(true);
  };
  const onCloseAddModel = () => {
    setisAddModelOpen(false);
  };

  const OpenConfirmMadla = (todo: Itodo) => {
    settodoToEdit(todo);
    setisOpenConfirmModea(true);
  };
  const CloseConfirmMadla = () => {
    setisOpenConfirmModea(false);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    settodoToEdit({
      ...todoToEdit,
      [name]: value,
    });
  };

  const onChangeHandlerADD = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    settodoToAdd({
      ...todoToAdd,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisUpdate(true);
    const { title, description } = todoToEdit;
    console.log(todoToEdit);
    try {
      const { status } = await AxiosInstance.put(
        `/todos/${todoToEdit.documentId}`,
        {
          data: {
            title,
            description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200) {
        setisEditModelOpen(false);
        setqueryversion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisUpdate(false);
    }
  };

  // Add
  const onSubmitHandlerAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisUpdate(true);
    const { title, description } = todoToAdd;

    try {
      const { status } = await AxiosInstance.post(
        `/todos`,
        {
          data: {
            title,
            description,

            users: [userData.user.documentId],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200 || status === 201) {
        setisAddModelOpen(false);
        settodoToAdd({
          title: "",
          description: "",
       
        });
        setqueryversion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisUpdate(false);
    }
  };

  //Remove
  const onRemove = async () => {
    try {
      const { status } = await AxiosInstance.delete(
        `/todos/${todoToEdit.documentId}`,
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );
      if (status === 200 || status === 204) {
        CloseConfirmMadla();
        setqueryversion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <Button isLoading={isUpdate} onClick={onOpenAModel}>
          {" "}
          Post New Todo{" "}
        </Button>
      </div>

      {data.todos.length ? (
        data.todos.map((todo: Itodo) => (
          <div key={todo.id} className="flex  justify-between items-center">
            <h1 className="text-lg">
              {" "}
              {todo.documentId} - {todo.title}
            </h1>
            <div className="flex gap-2">
              <Button onClick={() => onOpenEditModel(todo)}> Edit </Button>
              <Button
                onClick={() => {
                  OpenConfirmMadla(todo);
                }}
                className="bg-red-800 "
              >
                {" "}
                Cancel{" "}
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h1> no Todo yet?.... </h1>
      )}

      {/* Add  todo */}
      <Model
        title="Edit this todo"
        closeModal={onCloseAddModel}
        isOpen={isAddModelOpen}
      >
        <form className="space-y-2" onSubmit={onSubmitHandlerAdd}>
          <Input
            value={todoToAdd.title}
            onChange={onChangeHandlerADD}
            name="title"
          />
          <Textarea
            value={todoToAdd.description}
            onChange={onChangeHandlerADD}
            name="description"
          />
          <div className="flex gap-4">
            <Button isLoading={isUpdate}> ADD </Button>
            <Button type="button" onClick={onCloseAddModel} variant={"cancel"}>
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </form>
      </Model>

      {/* Edit  */}
      <Model
        title="Edit this todo"
        closeModal={onCloseEditModel}
        isOpen={isEditModelOpen}
      >
        <form className="space-y-2" onSubmit={onSubmitHandler}>
          <Input
            value={todoToEdit.title}
            onChange={onChangeHandler}
            name="title"
          />
          <Textarea
            value={todoToEdit.description}
            onChange={onChangeHandler}
            name="description"
          />
          <div className="flex gap-4">
            <Button isLoading={isUpdate}> Update </Button>
            <Button type="button" onClick={onCloseEditModel} variant={"cancel"}>
              {" "}
              Cancel{" "}
            </Button>
          </div>
        </form>
      </Model>

      {/* Remove Todo  */}
      <Model
        title="are you sure you want to delete"
        closeModal={CloseConfirmMadla}
        isOpen={isOpenConfirmModeal}
      >
        <div className="flex gap-4">
          <Button variant={"danger"} isLoading={isUpdate} onClick={onRemove}>
            Yes ,remove
          </Button>
          <Button type="button" onClick={CloseConfirmMadla} variant={"cancel"}>
            Cancel
          </Button>
        </div>
      </Model>
    </div>
  );
};

export default TodoList;
