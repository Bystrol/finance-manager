import Image, { StaticImageData } from 'next/image';

const ProfileImage: React.FC<{
  onClick?: () => void;
  src: string | StaticImageData;
}> = ({ onClick, src }) => {
  return (
    <div
      className={`relative h-8 w-8 top-0 right-0 cursor-pointer`}
      onClick={onClick}
    >
      <Image
        src={src}
        alt="profile_picture"
        fill
        className="rounded-[50%] border border-zinc-300 peer"
      />
    </div>
  );
};

export default ProfileImage;
