const socket = io();
loadFirstData();

const chatForm = document.getElementById('chat');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputChat = new FormData(e.target);
    const message = Object.fromEntries(inputChat);

    socket.emit('saveMessage', buildMessage(message));
});

socket.on('refreshChat', (message) => {
    loadMessagesToChat(message);
});

function loadFirstData() {
    fetch('/api/messages')
        .then((data) => data.json())
        .then((messages) => {
            console.log('load first data', messages);
            loadMessagesToChat(messages);
        })
        .catch((e) => alert(e));
}

function loadMessagesToChat(messages) {
    console.log('loadMessagesToChat', messages);
    const authorSchema = new normalizr.schema.Entity(
        'author',
        {},
        { idAttribute: 'email' }
    );
    const messageSchema = new normalizr.schema.Entity(
        'messages',
        {
            author: authorSchema,
        },
        { idAttribute: '_id' }
    );
    const holdingsSchema = new normalizr.schema.Entity('posts', {
        messages: [messageSchema],
    });

    const desnormalizedMessages = normalizr.denormalize(
        messages.messages.result,
        holdingsSchema,
        messages.messages.entities
    );
    const chat = document.getElementById('messages');
    chat.innerHTML = '';
    desnormalizedMessages.messages.forEach((message) => {
        console.log(message);
        chat.innerHTML += `<br> <b style="color:blue"> ${message.author.email} </b> [<b style="color:maroon">${message.date}</b>]: <i style="color:green">${message.text}</i>`;
    });
}

function buildMessage(message) {
    return (formatedMessage = {
        author: {
            email: message.email,
            name: message.name,
            lastName: message.lastName,
            age: message.age,
            alias: message.alias,
            avatar: message.avatar,
        },
        text: message.message,
    });
}
