import {Router} from 'express';
import { getUser, signInUser, putUser, deleteUser,getUsers, loginUser } from '../controllers/user.controller';

const router = Router();

router.get('/:id',getUser);
router.get('/',getUsers);
router.post('/signIn',signInUser);
router.put('/:id',putUser);
router.delete('/:id',deleteUser);
router.post('/login', loginUser);

export default router;