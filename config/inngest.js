import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/Users";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-nextjs" });

//inngest funcation to save user data to a database

export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email.address,
      name: first_name + "" + last_name,
      imageURL: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

//inngest funcation to Update user data to a database

export const syncUserUpdate = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email.address,
      name: first_name + "" + last_name,
      imageURL: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

//inngest funcation to delete user data to a database
export const syncUserDelete = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  {
    event: "clerk/user.delted",
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
