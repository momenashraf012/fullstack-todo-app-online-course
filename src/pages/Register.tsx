import ErrorMassage from "../components/InputErrormsg";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
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
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="mb-4 text-3xl font-semibold text-center">
        Register to get access!
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="Username"
            {...register("username", {
              required: "username is required",
              minLength: 5,
            })}
          />
          {errors.username && errors.username.type === "required" && (
            <ErrorMassage msg="username is required" />
          )}
          {errors.username && errors.username.type === "minLength" && (
            <ErrorMassage msg="username should be at-last 5 character" />
          )}
        </div>

        <div>
          <Input
            placeholder="Emaill address"
            {...register("email", {
              required: "email is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <ErrorMassage msg="email is required" />
          )}
          {errors.email && errors.email.type === "minLength" && (
            <ErrorMassage msg="email not valid " />
          )}
        </div>

        <div>
          <Input
            placeholder="Password"
            {...register("password", {
              required: "password is required",
              minLength: 6,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <ErrorMassage msg="password is required" />
          )}
          {errors.email && errors.email.type === "minLength" && (
            <ErrorMassage msg="password  should be at-last 6 character " />
          )}
        </div>

        <Button fullWidth>REister</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
