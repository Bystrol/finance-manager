import Image from "next/image";
import image from "../../public/images/blank-profile-picture.png";
import { useSession } from "next-auth/react";

const ProfileImage: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { data: session } = useSession();

  const imageStyles = {
    borderRadius: "50%",
    border: "1px solid #a2a3a5",
    marginRight: "0.75rem",
  };

  return (
    <div
      className="relative h-8 w-8 top-0 right-0 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={session?.user?.image ? session.user.image : image}
        alt="profile_picture"
        fill
        style={imageStyles}
      />
    </div>
  );
};

export default ProfileImage;
