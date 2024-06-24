import express from 'express'
import museumUpload from '../middleware/museumFileUpload.js'
import { addFasilitas, addMuseumInformation, addTransportasi, editFasilitas, editMuseumInformation, editTransportasi } from '../controller/museumController.js'


export const museumRoutes = express.Router()
museumRoutes.post('/addMuseumInformation',museumUpload, addMuseumInformation);
museumRoutes.put('/editMuseumInformation/:id', museumUpload, editMuseumInformation);
museumRoutes.post('/addMuseumFasilitas', addFasilitas);
museumRoutes.put('/editMuseumFasilitas/:id', editFasilitas);
museumRoutes.post('/addMuseumTransportasi', addTransportasi);
museumRoutes.put('/editMuseumTransportasi/:id', editTransportasi);

