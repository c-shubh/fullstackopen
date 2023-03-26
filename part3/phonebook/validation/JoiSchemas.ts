import Joi from "joi";
import type { PersonOmitId } from "../types";

export const PersonJoiSchema = Joi.object<PersonOmitId>({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

export const PersonPutJoiSchema = Joi.object({
  name: Joi.string(),
  number: Joi.string().required(),
});
