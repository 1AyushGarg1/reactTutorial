import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import jobModels from './models/jobModels.js'
import userModels from './models/userModels.js'

try{
    await mongoose.connect(process.env.MONGO_URL)
    const user = await userModels.findOne({email: 'test@test.com'})
    const jsonJobs = JSON.parse(await readFile(new URL('./utils/mockData.json',import.meta.url)));
    //console.log(user)
    const jobs = jsonJobs.map((job)=>{
        return {...job,createdby : user._id}
    });
    await jobModels.deleteMany({createdby :user._id})
    await jobModels.create(jobs)
    console.log('successful')
    process.exit(0)
} catch (error) {
    console.log(error)
    process.exit(1);
}