import express from 'express';
import { addNewCollection, deleteCollection, editCollection, getAllCollection } from '../controller/collectionController.js';
import collectionUpload from '../middleware/collectionFileUpload.js';

export const collectionRoutes = express.Router()
collectionRoutes.post('/addNewCollection',collectionUpload, addNewCollection)
collectionRoutes.get('/getAllCollection', getAllCollection)
collectionRoutes.put('/editCollection/:id',collectionUpload, editCollection)
collectionRoutes.delete('/deleteCollection/:id', deleteCollection)