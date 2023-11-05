import {Router} from 'express';
import { getSubtask, postSubtask, putSubtask, deleteSubtask,getSubtasks } from '../controllers/subtask.controller';

const router = Router();

router.get('/:id',getSubtask);
router.get('/',getSubtasks);
router.post('/',postSubtask);
router.put('/:id',putSubtask);
router.delete('/:id',deleteSubtask);

export default router;