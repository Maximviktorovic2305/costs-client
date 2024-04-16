import { setAuth, setUsername } from "../context/auth";
import { handleAxiosError } from "../utils/errors";
import instanse from "./axiosClient";

export class AuthClient {
   static async login(username: string, password: string, email: string) {
      try {
         const result = await instanse.post("/auth/login", {
            username,
            password,
            email,
         });

         if (result.status === 200) {
            setAuth(true);
            setUsername(result.data.username);
            localStorage.setItem("auth", JSON.stringify(result.data));
            return true;
         }

         return false;
      } catch (error) {
         handleAxiosError(error);
      }
   }

   static async registration(
      username: string,
      password: string,
      email: string
   ) {
      try {
         const result = await instanse.post("/auth/registration", {
            username,
            password,
            email,
         });

         if (result.status === 201) {
            setAuth(false);
            return true;
         }

         return false;
      } catch (error) {
         handleAxiosError(error);
      }
   }
}
