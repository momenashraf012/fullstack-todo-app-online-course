import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { LOGIN_FORM } from "../data";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../Valitation";
import ErrorMassage from "../components/InputErrormsg";
import AxiosInstance from "../confing/axios.confing";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interface";

interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [isloading, setIsLoading] = useState(false);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(LoginSchema) });

  // Handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    //panding
    setIsLoading(true);
    try {
      //fulfilled
      const { status, data: resData } = await AxiosInstance.post(
        "/auth/local",
        data
      );
      console.log(resData);

      if (status === 200) {
        toast.success(
          "You will navigate to the home page after 2 seconds to login.",
          {
            position: "bottom-center",
            duration: 1500,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );
      }

      localStorage.setItem("LoggedInUser", JSON.stringify(resData));

      setTimeout(() => {
        location.replace("/");
      }, 2000);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      //rejected
      console.log(errorObj.response?.data.error.message);
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  //rendler
  const rendlerLogin = LOGIN_FORM.map(
    ({ name, placeholder, validation }, intdex) => {
      return (
        <div key={intdex}>
          <Input placeholder={placeholder} {...register(name, validation)} />
          {errors[name] && <ErrorMassage msg={errors[name].message} />}
        </div>
      );
    }
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {rendlerLogin}
        <Button fullWidth isLoading={isloading}>
          {" "}
          Login{" "}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
