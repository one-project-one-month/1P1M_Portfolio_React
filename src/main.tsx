import Providers from '@/components/providers';
import '@/styles/index.css';
import { Theme } from '@radix-ui/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './app/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    </Providers>
  </StrictMode>,
);
