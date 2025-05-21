import mongoose from "mongoose";

const userSchema = new mongoose.userSchema(
  {
    _id: { typeof: String, required: true },
    name: { typeof: String, required: true },
    emall: { typeof: String, required: true, unique: true },
    imageURL: { typeof: String, required: true },
    cartItems: { typeof: Object, default: {} },
  },
  { minimize: false }
);

const User = mongoose.models.user || mongoose.models("user", userSchema);
export default User;
