import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class NotifyAddressChangeEvent implements EventHandlerInterface<CustomerCreatedEvent>{
    handle(event: CustomerCreatedEvent): void {
       console.log("Endereço do cliente: %s, %s alterado para: %s", event.eventData.id, event.eventData.name, event.eventData.address.street);
    }

}