import CustomRequestData from "../CustomRequestData";

declare global {
  declare namespace Express {
    export interface Request {
      custom: CustomRequestData<unknown>;
    }
  }
}
