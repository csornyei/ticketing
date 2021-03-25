import Ticket from '../ticket';

it('implements OOC', async (done) => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: 'abcd'
    });
    // Save the ticket to the database
    await ticket.save();
    // fetch the ticket twice
    const firstTicket = await Ticket.findById(ticket.id);
    const secondTicket = await Ticket.findById(ticket.id);
    // make two separate changes to the tickets
    firstTicket!.set({ price: 10 });
    secondTicket!.set({ price: 15 });
    // save the first fetched tickets
    await firstTicket!.save();
    // save the second fetched tickets and expect an error
    try {
        await secondTicket!.save();
    } catch (err) {
        return done();
    }

    throw new Error("Should not reach this point");
});