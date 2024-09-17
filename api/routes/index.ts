import { Router } from 'express';
import { default as list } from './list';
import { default as user } from './user';

const router = Router();


router.use('/user', user);
router.use('/list', list);

export = router;
