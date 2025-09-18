import { ILoginInput, IRegisterInput } from "../interface";

export const REGISTER_FORM:IRegisterInput[]=[
    {
        name:"username",
        placeholder:"Username",
        validation:{
         required: "username is required",
         minLength: 5,

        }
    },

     {
        name:"email",
        placeholder:"Email",
        validation:{
         required: "email is required",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        }
    }
,

    {
        name:"password",
        placeholder:"Password",
        validation:{
         required: "Password is required",
         minLength: 6,

        }
    }

           
           
]


export const LOGIN_FORM:ILoginInput[]=[
 
     {
        name:"email",
        placeholder:"Email",
        validation:{
         required: "email is required",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        }
    }
,

    {
        name:"password",
        placeholder:"Password",
        validation:{
         required: "Password is required",
         minLength: 6,

        }
    }

           
           
]