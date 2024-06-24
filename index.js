import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';
import { testConnection } from "./database/db.js";
import { ticketRoutes } from "./routes/ticketRoutes.js";
import { userRoutes } from "./routes/userAuthRoutes.js";
import { collectionRoutes } from "./routes/collectionsRoutes.js";
import collectionUpload from './middleware/collectionFileUpload.js';
import { adminRoutes } from "./routes/adminAuthRoutes.js";
import { museumRoutes } from "./routes/museumRoutes.js";

const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/gambar/gambarKoleksiMuseum', express.static(path.join(__dirname, 'gambar', 'gambarKoleksiMuseum')));
app.use('/gambar/gambarMuseum', express.static(path.join(__dirname, 'gambar', 'gambarMuseum')));

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/collection', collectionRoutes)
app.use('/tiket', ticketRoutes)
app.use('/userAuth', userRoutes)
app.use('/adminAuth', adminRoutes)
app.use('/museum', museumRoutes)

app.listen(process.env.APP_PORT, ()=>{
  testConnection()
  console.log(`Server berjalan di http://localhost:${process.env.APP_PORT}`)
})
