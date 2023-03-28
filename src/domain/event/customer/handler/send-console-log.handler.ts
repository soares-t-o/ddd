
import EventHandlerInterface from "../../@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.events";
import { CustomerUpdatedEvent } from "../customer-updated.events";


export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerUpdatedEvent>{

    handle(event: CustomerUpdatedEvent): void {
        console.log(`Endereço do cliente: 
            ${event.eventData.id}, ${event.eventData.nome} alterado para: ${event.eventData.endereco}`
        );
    }

}