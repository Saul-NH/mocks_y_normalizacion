import Message from '../database/models/messages.model.js';

import MessageMemoryDAO from './messages/MessageMemoryDAO.js';

import MessageFileDAO from './messages/MessageFileDAO.js';

import MessageMongoDBDAO from './messages/MessageMongoDBDAO.js';

//MEMORY DAO'S
export const messageMemoryDAO = new MessageMemoryDAO();

//FILE DAO'S
export const messageFileDAO = new MessageFileDAO(
    './src/database/data/messages.txt'
);

//MONGO DB DAO'S
export const messageMongoDBDAO = new MessageMongoDBDAO(Message);
