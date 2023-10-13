import { RiMoneyDollarCircleFill } from 'react-icons/ri';

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center bg-white w-full lg:w-3/5 h-full lg:h-auto p-4 lg:rounded-xl">
        <div className="font-bold text-2xl lg:text-xl italic drop-shadow-md flex self-start">
          <RiMoneyDollarCircleFill className="mr-2" size={30} />
          <h1>FINEances</h1>
        </div>
        <div className="flex w-full h-full justify-center my-8">
          <section className="flex justify-center w-8/12 lg:w-1/2">
            {children}
          </section>
          <div className="hidden lg:block w-[50%] bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default AuthPageLayout;
