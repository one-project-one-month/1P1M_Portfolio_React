import Background from '@/components/common/background'
import Navbar from '@/components/common/navbar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
   <Background >
 <div className="h-dvh w-dvw overflow-auto">
      <div className="w-11/12 mx-auto">
          <Navbar />
        </div>

        <div className="w-11/12 mx-auto">
          <Outlet />
        </div>

        {/* <div className="w-11/12 mx-auto">
          <Footer/>
        </div> */}

        
      </div>
   </Background>
  )
}

export default MainLayout