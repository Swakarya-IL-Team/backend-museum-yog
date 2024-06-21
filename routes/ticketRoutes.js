import express from "express";
import { addNewTicketIndividual, addNewTicketPacket, deleteIndividualTicket, deletePacketTiket, editIndividualTicket, editPacketTiket, getAllInvidualTicket, getAllPaketTiket } from "../controller/ticketController.js";

export const ticketRoutes = express.Router()

// invidual tiket
ticketRoutes.post('/addNewIndividualTicket', addNewTicketIndividual)
ticketRoutes.get('/getTiketIndividual', getAllInvidualTicket)
ticketRoutes.delete('/deleteIndividualTicket/:id', deleteIndividualTicket)
ticketRoutes.put('/updateIndividualTiket/:id', editIndividualTicket)

// paket tiket
ticketRoutes.post('/addNewPacketTicket', addNewTicketPacket)
ticketRoutes.get('/getTiketPaket', getAllPaketTiket)
ticketRoutes.delete('/deletePacketTicket/:id', deletePacketTiket)
ticketRoutes.put('/updatePacketTiket/:id', editPacketTiket)