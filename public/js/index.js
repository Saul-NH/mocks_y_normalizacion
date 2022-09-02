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
            loadMessagesToChat(messages.messages);
        })
        .catch((e) => alert(e));
}

function loadMessagesToChat(messages) {
    const chat = document.getElementById('messages');
    messages.forEach((message) => {
        console.log(message);
        chat.innerHTML += `<br> <b style="color:blue"> ${message.author.id} </b> [<b style="color:maroon">${message.date}</b>]: <i style="color:green">${message.text}</i>`;
    });
}

function buildMessage(message) {
    return (formatedMessage = {
        author: {
            id: message.email,
            name: message.name,
            lastName: message.lastName,
            age: message.age,
            alias: message.alias,
            avatar: message.avatar,
        },
        text: message.message,
    });
}
