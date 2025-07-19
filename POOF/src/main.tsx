import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createMemoryRouter, RouterProvider } from 'react-router'
import SettingsPage from './pages/SettingsPage.tsx'
import InventoryPage from './pages/InventoryPage.tsx'
import GatchaPage from './pages/GatchaPage.tsx'
import PurchasePage from './pages/PurchasePage.tsx'
import UserAuthenticationPage from './pages/UserAuthenticationPage.tsx'

const router = createMemoryRouter([
  {path:'/', element:<App/>},
  {path:'/settings', element:<SettingsPage/>},
  {path:'/inventory', element:<InventoryPage/>},
  {path:'/gatcha', element:<GatchaPage/>},
  {path:'/purchase', element:<PurchasePage/>},
  {path:'/auth', element:<UserAuthenticationPage/>}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
