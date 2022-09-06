import Message from '../../containers/MemoryContainer.js';

export default class MessageMemoryDao extends Message {
    add(message) {
        message._id = this.buildId(this.getAll());
        message.date = new Date().toLocaleTimeString();
        this.content.push(message);
        return this.getAll();
    }
}
