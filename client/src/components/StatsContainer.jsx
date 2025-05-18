import { FaSuitcaseRolling,FaCalendarCheck, FaBug } from "react-icons/fa"
import Wrapper from '../wrappers/StatsContainer'
import StatsItem from "./StatsItem"


const StatsContainer = ({defaultStats}) => {
    const stats = [
        {
            title: 'Pending Application',
            count:defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#f59e0b',
            bcg: '#fef3c7',    
        },
        {
            title: 'Interview Scheduled',
            count:defaultStats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',    
        },
        {
            title: 'Declined Application',
            count:defaultStats?.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',    
        }
    ] 
    return(
        <Wrapper>
            {stats.map((item)=> {
                return <StatsItem key={item.title} {...item} />
            })}
        </Wrapper>
    );
}

export default StatsContainer