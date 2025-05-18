import mongoose from "mongoose";
import { JOB_STATUS,JOB_TYPE } from "../utils/constants.js";
import User from './userModels.js'

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        maxlength: 50,
    },
    position: {
        type: String,
        maxlength: 100,
    },
    jobStatus: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING,
    },
    jobType: {
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
        type: String,
        default: 'not specified',
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }

},{ timestamps: true });

// by this we can find the id with created_at and updated_at fields


export default mongoose.model('Job', jobSchema);
