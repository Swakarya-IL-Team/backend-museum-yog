import express from "express";
import { adminLogin, adminSignUp } from "../controller/adminAuthContoller.js";

export const adminRoutes = express.Router()
adminRoutes.post('/adminLogin', adminLogin)
adminRoutes.post('/adminSignUp', adminSignUp)