const Auth = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex bg-white w-[50%] h-[60vh] rounded-xl p-4">
        <div className="flex flex-col items-center justify-center w-[50%] h-full text-center">
          <h1 className="font-bold text-2xl">Welcome back!</h1>
          <h2 className=" text-sm mt-2 text-zinc-600">
            Please enter your details.
          </h2>
          <input
            className="
            w-[70%]
            h-[4vh]
            border-2
            border-solid
            rounded-lg
            text-sm
            p-4
            mt-8
            "
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="
            w-[70%]
            h-[4vh]
            border-2
            border-solid
            rounded-lg
            text-sm
            p-4
            mt-3
            "
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="w-[50%] h-full bg-[url('/images/auth-image.jpg')] bg-no-repeat bg-center bg-cover rounded-lg"></div>
      </div>
    </div>
  );
};

export default Auth;
