import { Publisher, Subjects, TicketCreatedEvent } from "@csornyei-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}