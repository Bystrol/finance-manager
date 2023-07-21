import axios from 'axios';
import { toast } from 'react-hot-toast';

export const updateUserPicture = async (
  currentEmail: string,
  image: string,
  update: ({ image }: { image: string }) => void,
) => {
  try {
    await axios
      .post('/api/update', {
        currentEmail,
        image,
      })
      .then(() => {
        update({ image: image });
        setTimeout(() => {
          toast.success('Profile updated successfully!');
        }, 1000);
      });
  } catch (error) {
    toast.error(Object(error).response.data);
  }
};
