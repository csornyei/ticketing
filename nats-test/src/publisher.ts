import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect(
    'ticketing',
    'abc',
    {
        url: 'http://localhost:4222'
    });

stan.on('connect', () => {
    console.log('Connected');

    setInterval(() => {
        const data = JSON.stringify({
            title: 'concert',
            price: Math.floor((Math.random() * (200 - 20)) + 20)
        });

        stan.publish('ticket:created', data, () => {
            console.log('Event published');
        });
    }, 5000);
});