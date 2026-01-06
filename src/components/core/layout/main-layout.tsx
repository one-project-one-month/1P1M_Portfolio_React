import Background from '@/components/common/background'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
   <Background className='w-screen min-h-screen'>
    <Outlet />
   </Background>
  )
}

export default MainLayout