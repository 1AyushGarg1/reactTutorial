import { Outlet,redirect, useLoaderData,useNavigate } from "react-router-dom";
import Wrapper from '../wrappers/Dashboard'
import { Navbar,SmallSideBar,BigSideBar } from "../components";
import { createContext, useContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFatch from "../utils/customFatch";
import { toast } from 'react-toastify'


export const loader = async () =>{
  // we must have to return something othewise it will send a error (something went wrong on the page)
  // whenever we login we get a cookie with jwt. 
  try{
    const {data} = await customFatch.get('/users/current-user');
    //console.log('data starts here.............................')
    //console.log(data);
    //console.log('....................end data ends here')
    return data;
  } catch(error) {
    redirect('/');
  }
}

// whatever i have sent by loader is immediately available in the component of  dashboards also by using useLoadersData

const DashBoardContext = createContext();

const DashboardLayout = () => { 
  const data = useLoaderData();
  //console.log(data.userWithoutPassword.name);
  const  navigate = useNavigate();
  const User = data.userWithoutPassword;
  const [ showSideBar, setShowSideBar ] = useState(false);
  const [ isDarkTheme, setIsDarkTheme ] = useState( checkDefaultTheme() );


  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme', !isDarkTheme);
    localStorage.setItem('isDarkTheme', !isDarkTheme);
  }

  const logOutUser = async () => {
    //console.log("logout called .........................");
    navigate('/');
    await customFatch.get('/auth/logout');
    toast.success('Logging Out........')
  }


  return (
    <DashBoardContext.Provider value={{ User, showSideBar, isDarkTheme, toggleSideBar, toggleTheme, logOutUser }}>
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ User }}/> {/* This will render the child routes */}
            </div> 
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashBoardContext);

export default DashboardLayout;