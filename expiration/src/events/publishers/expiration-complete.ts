import { ExpirationCompleteEvent, Subjects, Publisher } from '@csornyei-ticketing/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}