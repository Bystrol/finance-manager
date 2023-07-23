import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ColorRing } from 'react-loader-spinner';

const Loading = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-black/50">
          <ColorRing
            width={100}
            height={100}
            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
          />
        </div>
      )}
    </>
  );
};

export default Loading;
