import React from 'react'
import {Navigate, Route , Routes} from "react-router"
import HomePage from "./Pages/HomePage.jsx"
import SignUpPage from "./Pages/SignUpPage.jsx"
import LoginPage from "./Pages/LoginPage.jsx"
import NotificationsPage from "./Pages/NotificationsPage.jsx"
import CallPage from "./Pages/CallPage.jsx"
import ChatPage from "./Pages/ChatPage.jsx"
import OnboardingPage from './Pages/OnboardingPage.jsx'
import toast , {Toaster} from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'
import PageLoader from "./components/PageLoader.jsx"
import { getAuthUser } from './lib/api.js'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import FriendsPage from './Pages/FriendsPage.jsx'

const App = () => {

 const {isLoading, authUser} = useAuthUser()
 const {theme ,setTheme} = useThemeStore()
 const isAuthenticated = Boolean(authUser);
 const isOnboarded = authUser?.isOnboarded;
    
    if (isLoading) return <PageLoader/>
  return (<div className='min-h-screen' data-theme={theme}>
      <Routes>
        <Route path="/" element ={ isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
            <HomePage/>
          </Layout>
          ) : (<Navigate to={!isAuthenticated ? "./login" : "./onboarding"} /> ) } />
        <Route path="/friends" element ={ isAuthenticated && isOnboarded ? (
          <Layout showSidebar>
            <FriendsPage/>
          </Layout>
          ) : (<Navigate to={!isAuthenticated ? "./login" : "./onboarding"} /> ) } />
        <Route path="/signup" element ={ !isAuthenticated ? <SignUpPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/> } />
        <Route path="/login" element ={ !isAuthenticated ? <LoginPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/> } />
        <Route path="/notifications" element ={ isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationsPage/>
            </Layout>
        ) : (
          <Navigate to={!isAuthenticated? "/login" : "/onboarding"} />
        )} />
        <Route path="/call/:id" element ={ isAuthenticated && isOnboarded ? (
            
              <CallPage/>
            
        ) : (
          <Navigate to={!isAuthenticated? "/login" : "/onboarding"} />
        )} />
        <Route path="/chat/:id" element ={ isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
        ) : (
          <Navigate to={!isAuthenticated? "/login" : "/onboarding"} />
        )} />
        <Route
         path="/onboarding"
          element ={ 
            isAuthenticated ? (
              !isOnboarded ? (
              <OnboardingPage/>
              ) : (
              <Navigate to="/" />
               )
              ) : (
              <Navigate to="/login" />
               ) 
              } 
                
            />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App