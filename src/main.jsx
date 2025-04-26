import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Outlet, RouterProvider } from 'react-router-dom'
import Router from './router/Router'
import { UserProvider } from './contexts/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={Router} />
    </UserProvider>
  </StrictMode>,
)
