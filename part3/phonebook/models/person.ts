import mongoose, { SchemaTypes } from "mongoose";
import type { PersonOmitId } from "../types";

const personSchema = new mongoose.Schema<PersonOmitId>({
  name: {
    type: SchemaTypes.String,
    minlength: 3,
    required: true,
  },
  number: {
    type: SchemaTypes.String,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PersonModel = mongoose.model("Person", personSchema);
export default PersonModel;
