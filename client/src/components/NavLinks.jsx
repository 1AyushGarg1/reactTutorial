import { useDashboardContext } from "../pages/dashboardLayout";
import links from '../utils/links'
import { NavLink } from 'react-router-dom'

const NavLinks = ({isBigSideBar}) => {
    const { toggleSideBar,User } = useDashboardContext();
    return (
        <div className='nav-links'>
            {links.map((link) => {
                const { id, text, path, icon } = link;
                //console.log(User);
                const { role } = User;
                if(path === 'admin' && role !== 'admin') return ; 
                return( 
                    <NavLink 
                        to={path} 
                        key={text} 
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
                        onClick={isBigSideBar ? null : toggleSideBar}  end >
                            <span className='icon'>{icon}</span>
                            {text}
                    </NavLink>
                );
            })}
        </div>
    );
}

export default NavLinks;