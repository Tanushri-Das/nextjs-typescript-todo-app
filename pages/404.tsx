import React from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <h2 className='text-3xl mb-5 font-bold text-red-500'>Oops, Sorry!</h2>
        <h4 className='text-xl font-bold text-red-600 mb-4'>Page Not Found</h4>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
          onClick={goHome}
        >
          Back Home Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
