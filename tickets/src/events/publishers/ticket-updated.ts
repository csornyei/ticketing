import { Publisher, Subjects, TicketUpdatedEvent } from "@csornyei-ticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}