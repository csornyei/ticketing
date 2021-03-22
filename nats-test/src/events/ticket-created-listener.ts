import Listener from './base-listener';
import { Message } from 'node-nats-streaming';

class TicketCreatedListener extends Listener {
    subject = "ticket:created";
    queueGroupName = "payments-service";

    onMessage(data: any, msg: Message) {
        console.log('Event data', data);

        if (Math.random() > 0.2) {
            msg.ack();
        }
    }
}

export default TicketCreatedListener;