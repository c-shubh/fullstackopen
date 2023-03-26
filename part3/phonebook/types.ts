import Joi from "joi";

export interface Person {
  id: number;
  name: string;
  number: string;
}

export type PersonOmitId = Omit<Person, "id">;

export const PersonJoiSchema = Joi.object<PersonOmitId>({
  name: Joi.string().required(),
  number: Joi.string().required(),
});
