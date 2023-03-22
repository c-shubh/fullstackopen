import Joi from "joi";

export interface Person {
  id: number;
  name: string;
  number: string;
}

export type PersonNoId = Omit<Person, "id">;

export const PersonSchema = Joi.object<PersonNoId>({
  name: Joi.string().required(),
  number: Joi.string().required(),
});
