import { HydratedDocument } from "mongoose";
import UserT from "./User";

type CustomRequestData<T> = T;

export interface JwtToken {
  token: string | null;
}

export interface User {
  user: HydratedDocument<UserT>;
}

export default CustomRequestData;
