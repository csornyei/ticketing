import { Message } from 'node-nats-streaming';
import { Subjects, TicketCreatedEvent, Listener } from '@csornyei-ticketing/common';

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = "payments-service";

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log(data);
        console.log('Event data -> id', data.id);
        console.log('Event data -> title', data.title);
        console.log('Event data -> price', data.price);

        if (Math.random() > 0.2) {
            msg.ack();
        }
    }
}

export default TicketCreatedListener;