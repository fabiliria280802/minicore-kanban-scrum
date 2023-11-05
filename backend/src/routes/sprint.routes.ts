import {Router} from 'express';
import { getSprint, postSprint, putSprint, deleteSprint,getSprints } from '../controllers/sprint.controller';

const router = Router();

router.get('/:id',getSprint);
router.get('/',getSprints);
router.post('/',postSprint);
router.put('/:id',putSprint);
router.delete('/:id',deleteSprint);

export default router;