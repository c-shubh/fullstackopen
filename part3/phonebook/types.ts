import Joi from "joi";

export interface Person {
  id: number;
  name: string;
  number: string;
}

export const PersonSchema = Joi.object<Person>({
  name: Joi.string().required(),
  number: Joi.string().required(),
});
