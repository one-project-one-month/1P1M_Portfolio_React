import { notFoundUrl } from '@/assets/icons/iconUrls';
import Background from '@/components/background';
import { buttonVariants } from '@/styles/button-variants';
import { Home, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Background>
      <div className="h-dvh w-dvw flex flex-col items-center justify-center text-white gap-6 px-4 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#BD7AFD]">
          Oops...
        </h1>
        <h3 className="text-3xl md:text-4xl font-bold">Page Not Found</h3>
        <p className="text-lg md:text-2xl max-w-lg text-white/70">
          We couldn’t find the page you’re looking for. You can try refreshing
          or go back home.
        </p>

        <img
          src={notFoundUrl}
          alt="not-found"
          className="w-56 h-56 md:w-72 md:h-72 object-contain"
        />

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button
            type="button"
            className={buttonVariants({ variant: 'primary' })}
            onClick={() => navigate(0)}
          >
            <RotateCw className="me-1" />
            Retry
          </button>

          <button
            type="button"
            className={buttonVariants({ variant: 'secondary' })}
            onClick={() => navigate('/')}
          >
            <Home className="me-1" />
            Go Home
          </button>
        </div>
      </div>
    </Background>
  );
}
