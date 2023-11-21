
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { UserAuthContextProvider } from './pages/auth'

function App() {

  return (
    <>
      <UserAuthContextProvider>
      <RouterProvider router={router} />
      </UserAuthContextProvider>
    </>
  )
}

export default App
