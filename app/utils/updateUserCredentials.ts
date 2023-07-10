import axios from "axios";
import { toast } from "react-hot-toast";

export const updateUserCredentials = async (
  currentEmail: string,
  newUsername: string,
  newEmail: string,
  oldPassword: string,
  newPassword: string,
  update: ({ name, email }: { name: string; email: string }) => void
) => {
  try {
    await axios
      .post("/api/update", {
        currentEmail,
        newUsername,
        newEmail,
        oldPassword,
        newPassword,
      })
      .then(() => {
        update({ name: newUsername, email: newEmail });
        toast.success("Profile updated successfully!");
      });
  } catch (error) {
    toast.error(Object(error).response.data);
  }
};
