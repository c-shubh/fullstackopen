import mongoose from "mongoose";
import type { PersonOmitId } from "../types";

const personSchema = new mongoose.Schema<PersonOmitId>({
  name: String,
  number: String,
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
