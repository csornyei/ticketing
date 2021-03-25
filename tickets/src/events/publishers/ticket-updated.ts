import { Publisher, Subjects, TicketUpdatedEvent } from "@csornyei-ticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}