import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomeLayout,
  Landing, 
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJobs,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJobs
} from './pages/index'
// import HomeLayout from './pages/HomeLayout'

import { action as registerAction } from './pages/register'
import { action as loginAction } from './pages/login'
import { action as addjobsAction } from './pages/addJobs'
import { action as deleteJobAction } from './pages/deleteJobs'
import { action as profileAction } from './pages/profile'
import { action as editJobAction,loader as editJobLoader } from './pages/editJobs'
import { loader as dashboardLoader } from './pages/dashboardLayout'
import { loader as allJobsLoader } from './pages/allJobs'
import { loader as adminLoader } from './pages/admin'
import { loader as statsLoader } from './pages/stats'

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('isDarkTheme')==='true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

checkDefaultTheme();

const router = createBrowserRouter([
  { 
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error/>,
    children: [
      //  This is a default route when we put index = true that call even if the path is not defined 
      {
        index: true,
        element: <Landing/>,
        errorElement: <Error/>,
      },
      { 
        path: 'register',
        element: <Register/>,
        errorElement: <Error/>,
        action: registerAction,
        // action:()=>{ // this is one comman approcah if we don't export action in register page ....  
        //   console.log("hello register ....");
        //   return null; // you must return something otherwise it will make a error
        // }
      },
      { 
        path: 'login',
        element: <Login/>,
        errorElement: <Error/>,
        action: loginAction,
      },
      { 
        path: 'dashboard',
        element: <DashboardLayout />,
        errorElement: <Error/>,
        loader : dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJobs/>,  
            errorElement: <Error/>,
            action: addjobsAction,
          },
          {
            path: 'stats',
            element: <Stats/>,
            errorElement: <Error/>,
            loader: statsLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs/>,
            errorElement: <Error/>,
            loader: allJobsLoader,
          },
          {
            path: 'profile',
            element: <Profile/>,
            errorElement: <Error/>,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin/>,
            errorElement: <Error/>,
            loader : adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJobs />,
            loader : editJobLoader,
            action : editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          }
        ]
      },
    ]
  },

]);

//   This is a first way to do this
// function App() {
//    return <h1>Hello Ayush Garg</h1>
// }

//   This is a second way to do this
const App = () => {
  return <RouterProvider router={router} />;
}

export default App
