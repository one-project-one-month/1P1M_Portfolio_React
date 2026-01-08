import { Outlet } from 'react-router-dom';
import Background from '../background';

export default function AuthLayout() {
  return (
    <Background>
      <Outlet />
    </Background>
  );
}
