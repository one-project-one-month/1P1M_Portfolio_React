import { notFoundUrl } from '@/assets/icons/iconUrls';
import Background from '@/components/background';
import { buttonVariants } from '@/styles/button-variants';
import { RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Background>
      <div className="h-dvh w-dvw flex flex-col items-center justify-center text-white gap-8">
        <h1 className="text-6xl font-extrabold text-[#BD7AFD]">Oops...</h1>
        <h3 className="text-4xl font-bold">Something went wrong</h3>
        <h5 className="text-2xl">
          We’re having trouble loading this page. Please try again
        </h5>
        <img src={notFoundUrl} alt="not-found" className="size-90" />
        <button
          type="button"
          className={buttonVariants({ variant: 'primary' })}
          onClick={() => navigate(0)}
        >
          <RotateCw className="me-1" />
          Retry
        </button>
      </div>
    </Background>
  );
}
