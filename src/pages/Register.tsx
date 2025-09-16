import ErrorMassage from "../components/InputErrormsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../data";
import { RegisterSchema } from "../Valitation";
import { yupResolver } from '@hookform/resolvers/yup';
interface IFormInput {
  username: string;
  email: string;
  password: string;
}

// Renders
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>(
    {resolver: yupResolver(RegisterSchema)}
  );

  // Handler
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  //rendler
  const rendlerRejister = REGISTER_FORM.map(
    ({ name, placeholder, validation }, intdex) => {
      return (
        <div key={intdex}>
          <Input placeholder={placeholder} {...register(name, validation)} />
          {errors[name] && <ErrorMassage msg={errors[name].message}/>}
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
        <Button fullWidth>REister</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
