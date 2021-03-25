import { Subjects, Publisher, OrderCancelledEvent } from "@csornyei-ticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled
}