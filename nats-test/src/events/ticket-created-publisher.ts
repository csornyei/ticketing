import { Publisher, TicketCreatedEvent, Subjects } from '@csornyei-ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}