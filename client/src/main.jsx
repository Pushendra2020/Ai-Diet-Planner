import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './app/store.js'
import { store } from './app/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Hero /> },
      { path: '/profile', element: <Profile /> },
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
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
)
