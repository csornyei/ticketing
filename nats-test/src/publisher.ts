import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect(
    'ticketing',
    'abc',
    {
        url: 'http://localhost:4222'
    });

stan.on('connect', () => {
    console.log('Connected');

    const publisher = new TicketCreatedPublisher(stan);

    let i = 0;

    setInterval(async () => {
        await publisher.publish({
            id: `${i}`,
            title: 'Concert',
            price: Math.floor((Math.random() * (200 - 20)) + 20)
        });
        i++;
    }, 5000);
});