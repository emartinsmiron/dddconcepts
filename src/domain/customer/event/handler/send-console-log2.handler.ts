import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
       console.log("Esse é o segundo console.log do evento: CustomerCreated");

       console.log("Endereço do cliente: %s, %s alterado para: %s", event.eventData.id, event.eventData.name, event.eventData.address);
    }

}