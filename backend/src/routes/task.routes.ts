import {Router} from 'express';
import { getTask, postTask, putTask, deleteTask,getTasks } from '../controllers/task.controller';

const router = Router();

router.get('/:id',getTask);
router.get('/',getTasks);
router.post('/',postTask);
router.put('/:id',putTask);
router.delete('/:id',deleteTask);

export default router;