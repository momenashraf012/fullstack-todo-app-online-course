import ErrorMassage from "../components/InputErrormsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { RegisterSchema } from "../Valitation";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosInstance from "../confing/axios.confing";
import toast from "react-hot-toast";
import { useState } from "react";
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

// Renders
const RegisterPage = () => {
  const [isloading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(RegisterSchema) });

  // Handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    //panding
    setIsLoading(true);
    try {
      //fulfilled
      const { status } = await AxiosInstance.post("/auth/local/register", data);

      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 2 seconds to login.",
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
    } catch (error) {
      //rejected
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //rendler
  const rendlerRejister = REGISTER_FORM.map(
    ({ name, placeholder, validation }, intdex) => {
      return (
        <div key={intdex}>
          <Input placeholder={placeholder} {...register(name, validation)} />
          {errors[name] && <ErrorMassage msg={errors[name].message} />}
        </div>
      );
    }
  );

  console.log(errors);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Register to get access!
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {rendlerRejister}
        <Button fullWidth> {isloading ? "loading" : "Register"} </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
