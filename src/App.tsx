
import { Outlet } from 'react-router'
import CommonLayout from './components/layout/CommonLayout'
import { generateRoutes } from './utils/generateRoute'
import { adminSidebarItems } from './routes/adminSidebarItems'

function App() {

  console.log("Hello",generateRoutes(adminSidebarItems))

  return (
    <>
     
    <CommonLayout>
      <h1 className='text-center mt-6'>This is the main component</h1>
      <Outlet/>
    </CommonLayout>
    
    </>
  )
}

export default App
