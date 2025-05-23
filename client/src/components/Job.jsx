import { FaLocationArrow,FaBriefcase,FaCalendarAlt } from "react-icons/fa";
import { Link,Form } from 'react-router-dom'
import Wrapper from '../wrappers/Job'
import JobInfo from './jobInfo'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const Job = ({
    _id,position,company,jobLocation,jobType,createdAt,jobStatus
}) => {
    const date = day(createdAt).format('MMM Do, YYYY');
    return (
        <Wrapper>
            <header>
                <div className="main-icon">{company.charAt(0)}</div>
                <div className="info">
                    <h5 >
                        {position}
                    </h5>
                    <p>
                        {company}
                    </p>
                </div>
            </header>
            <div className="content">
                <div className="content-center">
                    <JobInfo icon={ <FaLocationArrow /> } text={jobLocation}  />
                    <JobInfo icon={ <FaCalendarAlt /> } text={date}  />
                    <JobInfo icon={ <FaBriefcase /> } text={jobType}  />
                    <div className = {`status ${jobStatus}`} >{jobStatus}</div>
                </div>
            </div>
            <footer className="actions">
                <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">Edit</Link>
                <Form method="post" action={`../delete-job/${_id}`}>
                    <button type='submit' className="btn delete-btn">
                        delete
                    </button>
                </Form>
            </footer>
        </Wrapper>
    );
}

export default Job;