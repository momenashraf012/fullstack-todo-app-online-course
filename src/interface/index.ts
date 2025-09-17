export interface IRegisterInput{


      name: "username" | "email" | "password"
        placeholder:string
        validation:{
         required: string
         minLength?: number,
             pattern?:RegExp

        }

        


}

export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}