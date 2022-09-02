import { PERSISTENCE_TYPE } from '../config.js';
import path from 'path';
const __dirname = path.resolve();

let messageDAO;

if (PERSISTENCE_TYPE === 'MEMORY') {
    import('../daos/index.js')
        .then(({ messageMemoryDAO }) => (messageDAO = messageMemoryDAO))
        .catch((error) => {
            console.error(error);
        });
}

if (PERSISTENCE_TYPE === 'FILE') {
    import('../daos/index.js')
        .then(({ messageFileDAO }) => (messageDAO = messageFileDAO))
        .catch((error) => {
            console.error(error);
        });
}

if (PERSISTENCE_TYPE === 'MONGO') {
    import('../database/dbConection.js')
        .then(() => {})
        .then(() => {
            import('../daos/index.js').then(
                ({ messageMongoDBDAO }) => (messageDAO = messageMongoDBDAO)
            );
        })
        .catch((error) => {
            console.error(error);
        });
}

export const index = async (req, res) => {
    try {
        res.sendFile(__dirname+'/src/public/views/index.html');
    } catch (error) {
        console.log(error);
    }
}

export const getAllMessages = async (req, res) => {
    try {
        const messages = await messageDAO.getAll();
        res.json({
            count: messages.length,
            messages,
        });
    } catch (error) {
        console.log(error);
    }
};

export const addMessage = async (req, res) => {
    try {
        res.json({
            message: await messageDAO.add(req.body)
        });
    } catch (error) {
        console.log(error);
    }
};