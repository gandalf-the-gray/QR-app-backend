import express from 'express';
import { signUp, login } from '../../controllers/vendor/auth.js';

const router = express.Router();

router.route('/sign-up').post(signUp);

router.route('/login').post(login);

export default router;
