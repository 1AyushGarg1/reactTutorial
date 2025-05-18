import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../wrappers/LogoutContainer";
import { useState } from "react";
import { useDashboardContext } from "../pages/dashboardLayout";

const LogoutContainer = () => {
  const [ showLogout, setShowLogout ] = useState(false);
  const { User,logOutUser } = useDashboardContext();


  return (
    <Wrapper>
      <button type='button' className="btn logout-btn" 
      onClick={()=> setShowLogout(!showLogout)}>
        {User.avatar? <img src={User.avatar} alt='avatar' className='img' /> 
          : (<FaUserCircle />)
        }
        { User?.name }
        <FaCaretDown />
      </button>
      <div className={showLogout? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logOutUser}>
          logOut
        </button>
      </div>
    </Wrapper>
  );
}

export default LogoutContainer;