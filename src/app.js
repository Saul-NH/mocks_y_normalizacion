import express from 'express';
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import axios from 'axios';
import http from "http";
import { Server } from "socket.io";

import messagesRouter from './routes/messages.routes.js'
import productsTestRouter from './routes/productsTest.routes.js'

const app = express();

app.use(express.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(__dirname + '/public'))



app.get('/', (req, res) => { res.render('index')})
app.use('/api/products-test', productsTestRouter)
app.use('/api/messages', messagesRouter);


//Socket server
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
    console.log('Desde server');

    socket.on('saveMessage', message => {
        axios({
            method: 'post',
            url:'/api/messages', 
            baseURL: 'http://localhost:8080', 
            data: message
        })
        .then((response) => {
            if (response.status === 200) {
                io.sockets.emit('refreshChat', response.data);
            } else {
                console.log('Fail');
            }
        })
        .catch((e) => console.error(e));
    })
});

export default server;