'use client';

import { Triangle } from 'react-loader-spinner';

const Loading = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-4xl font-bold">
      <Triangle width={100} height={100} wrapperClass="absolute" color="#fff" />
    </main>
  );
};

export default Loading;
