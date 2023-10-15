import mongoose from "mongoose";
import UserT from "../types/User";

const userSchema = new mongoose.Schema<UserT>({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  // add `id`
  virtuals: true,
  // remove `__v`
  versionKey: false,
  transform(doc, ret) {
    // remove `_id`
    delete ret._id;
    // passwordHash should not be revealed
    delete ret.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
