import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './app/store.js'
import { store } from './app/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ThemeInit from './components/ThemeInit'
import Layout from './components/Layout.jsx'
import Hero from './components/Hero.jsx'
import CalculateBMI from './components/Calculations/CalculateBMI.jsx'
import CalculateBMR from './components/Calculations/CalculateBMR.jsx'
import CalculateCalorieNeeds from './components/Calculations/CalculateCalorieNeeds.jsx'
import CalculateTDEE from './components/Calculations/CalculateTDEE.jsx'
import CreateAcc from './components/auth/CreateAcc.jsx'
import Login from './components/auth/Login.jsx'
import Profile from './components/Profile.jsx'
import EditProfile from './components/EditProfile.jsx'
import Diet from './components/Diet.jsx'
import About from './components/About.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Hero /> },
      { path: '/profile', element: <Profile /> },
      {path:'/about', element:<About/>},
      { path: '/editprofile', element: <EditProfile /> },
      { path: 'calculateBMI', element: <CalculateBMI /> },
      { path: 'calculateBMR', element: <CalculateBMR /> },
      { path: 'calculateCalorieNeeds', element: <CalculateCalorieNeeds /> },
      { path: 'calculateTDEE', element: <CalculateTDEE /> },
      { path: 'createAcc', element: <CreateAcc /> },
      {path: 'plan', element: <Diet /> },
      { path: 'login', element: <Login /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeInit />
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </PersistGate>
  </Provider>,
)
