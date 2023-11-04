import {Router} from 'express';
import { getUser, postUser, putUser, deleteUser,getUsers } from '../controllers/user.controller';

const router = Router();

router.get('/:id',getUser);
router.get('/',getUsers);
router.post('/',postUser);
router.put('/:id',putUser);
router.delete('/:id',deleteUser);

export default router;