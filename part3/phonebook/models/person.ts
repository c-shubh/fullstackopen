import mongoose from "mongoose";
import type { PersonOmitId } from "../types";

mongoose.set("strictQuery", false);
const url = process.env.MONGO_URL;

mongoose
  .connect(url as string)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

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
