import * as yup from "yup";

 export  const  RegisterSchema = yup.object({
  username: yup.string().required("username is required").min(5,"username should be at-last 5 character"),
  email:yup.string().required("email is required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"email not valid"),
  password: yup.string().required("password is required").min(6,"password  should be at-last 6 character")
}).required();