import express from 'express';
import { signUp } from '../../controllers/vendor/auth.js';

const router = express.Router();

router.route('/sign-up').post(signUp);

export default router;
