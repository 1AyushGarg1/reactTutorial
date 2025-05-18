import job from '../models/jobModels.js';
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose';
import day from 'dayjs';
export const getAllJobs = async (req, res) => {
    // console.log('This is getAll job controller in this ........')
    // console.log(req);
    // console.log(" req. end here ....................................")
    // console.log(" this is job route ...................");
    // console.log(req);
    // console.log( " end......................................");
    //console.log(req.query);
    const { search,jobStatus,jobType,sort } = req.query;
    const queryObject = {
        createdby: req.user.userID,
    }
    if(search){
        queryObject.$or = [
            { position: { $regex:search ,$options:'i' } },
            { company: { $regex:search ,$options:'i' } }
        ]
    }
    if(jobStatus && jobStatus !== 'all'){
        queryObject.jobStatus = jobStatus
    }
    if(jobType && jobType !== 'all'){
        queryObject.jobType = jobType
    }

    const sortOptions = {
        newest :'-createdAt',
        oldest :'createdAt',
        'a-z' : 'position',
        'z-a' : '-position',
    }
    const sortKey = sortOptions[sort] ||  sortOptions.newest;

    // setUp pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit;

    const totalJobs = await job.countDocuments(queryObject) 
    const allJobs = await job.find(queryObject).sort(sortKey).skip(skip).limit(limit);
    const numOfPages = Math.ceil(totalJobs/limit);

    res.status(StatusCodes.OK).json({
        totalJobs,
        numOfPages,
        currentPage:page,
        allJobs,
    });
}

export const createJob = async (req, res) => {
    // try {
        // const { position, company, jobLocation } = req.body; 
        req.body.createdby = req.user.userID;
        const newJob = await job.create(req.body)
        res.status(StatusCodes.CREATED).json({
            newJob
        });
    //  } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         message: 'Something went wrong-Server Error',
    //     });
    // }
}

export const getJobs = async (req, res) => {
    const { id } = req.params;
    const singleJob = await job.findById({_id: id});
    // if(!singleJob){
    //     // throw new Error(`No job with id: ${id}`);
    //     // return res.status(StatusCodes.NOT_FOUND).json({
    //     //     message: `No job with id: ${id}`,
    //     // });
    //     throw new NotFoundError(`No job with id: ${id}`);
    //     // this is a custom error that we created in the errors folder
    // }
    res.status(StatusCodes.OK).json({
        singleJob,
    });
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await job.findByIdAndUpdate(id,req.body);
    // if(!updateJob){
    //     // throw new Error(`No job with id: ${id}`);
    //     // return res.status(StatusCodes.NOT_FOUND).json({
    //     //     message: `No job with id: ${id}`,
    //     // });
    //     throw new NotFoundError(`No job with id: ${id} to update`);
    //     // this is a custom error that we created in the errors folder
    // }
    res.status(StatusCodes.OK).json({
        updatedJob,
        message: 'Job updated successfully',
    });
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const deletedJob = await job.findByIdAndDelete({_id: id});
    // if(!deleteJob){
    //     // throw new Error(`No job with id: ${id}`);
    //     // return res.status(StatusCodes.NOT_FOUND).json({
    //     //     message: `No job with id: ${id}`,
    //     // });
    //     throw new NotFoundError(`No job with id: ${id} to delete`);
    //     // this is a custom error that we created in the errors folder
    // }
    res.status(StatusCodes.OK).json({
        deletedJob,
        message: 'Job deleted successfully',
    });
}


export const showStats = async (req,res) => {
    let stats = await job.aggregate([
        {$match:{createdby:new mongoose.Types.ObjectId(req.user.userID)}},
        {$group:{ _id :'$jobStatus',count:{ $sum:1 }}},
    ]);
    console.log(stats);

    stats = stats.reduce((acc,curr)=>{
        const { _id: title,count } = curr
        acc[title] = count
        return acc;
    },{})
    console.log(stats);
    const defaultStats = {
        pending:stats.pending || 0,
        interview:stats.interview || 0, 
        declined:stats.declined || 0,
    }
    let monthlyApplication = await job.aggregate([
        { $match :{ createdby: new mongoose.Types.ObjectId(req.user.userID)} },
        { $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        { $sort : {'_id.year':-1, '_id.month': -1} },
        { $limit : 6 },
    ])

    monthlyApplication =  monthlyApplication.map((item)=>{
        const { _id:{year,month},count } = item;
        const date = day().month(month-1).year(year).format('MMM YY')
        return { date,count }
    }).reverse()
    // let monthlyApplication = [
    //     {
    //         date: 'May 25',
    //         count: 12,
    //     },
    //     {
    //         date: 'Jun 25',
    //         count: 12,
    //     },
    //     {
    //         date: 'Jul 25',
    //         count: 12,
    //     },
    //     {
    //         date: 'Aug 25',
    //         count: 9,
    //     },
    //     {
    //         date: 'Sep 25',
    //         count: 2,
    //     },
    //     {
    //         date: 'Oct 25',
    //         count: 14,
    //     },
    //     {
    //         date: 'Nov 25',
    //         count: 7,
    //     },
    //     {
    //         date: 'Dec 25',
    //         count: 9,
    //     }
    // ]
    res.status(StatusCodes.OK).json({defaultStats,monthlyApplication})
}