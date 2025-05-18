import { Router } from "express";

const router = Router();
//         return res.status(404).json({

import { getAllJobs,createJob,updateJob,deleteJob,getJobs,showStats } from "../controllers/jobController.js";
import { validateJobInput,validateIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";


//  first one is 
// Router.get('/', getAllJobs);
// Router.post('/', createJob);

// this is the second one which is the same as above
router.route('/') 
.get(getAllJobs)
.post(checkForTestUser,validateJobInput, createJob);

router.route('/stats').get(showStats)

router.route('/:id')
.get(validateIdParam ,getJobs)
.patch(checkForTestUser,validateIdParam ,updateJob)
.delete(checkForTestUser,validateIdParam,deleteJob);

export default router;