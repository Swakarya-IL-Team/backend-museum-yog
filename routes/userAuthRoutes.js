import express from 'express';
import { userLogin, userSignUp } from '../controller/userAuthController.js';

export const userRoutes = express.Router();
userRoutes.post('/login', userLogin);
userRoutes.post('/signup', userSignUp);


