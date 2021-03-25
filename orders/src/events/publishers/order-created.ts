import { Publisher, OrderCreatedEvent, Subjects } from "@csornyei-ticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}