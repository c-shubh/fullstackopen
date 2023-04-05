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
    minlength: 8,
    validate: {
      validator: function(v: string) {
        return /^\d{8,}|^(\d{2,3}-\d+)$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number`
    }
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
