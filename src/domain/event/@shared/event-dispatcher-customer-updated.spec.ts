import { CustomerUpdatedEvent } from "../customer/customer-updated.events";
import SendConsoleLogHandler from "../customer/handler/send-console-log.handler";
import EventDispatcher from "./event-dispather";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
   
    const eventHandler = new SendConsoleLogHandler();
 
    eventDispatcher.register("CustomerUpdatedEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toMatchObject([eventHandler]);

 });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendConsoleLogHandler();

    eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toMatchObject([eventHandler]);

    eventDispatcher.unregister("CustomerUpdatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"].length).toBe(0);

  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    
    const eventHandler = new SendConsoleLogHandler();

    eventDispatcher.register("CustomerUpdatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"]).toBeUndefined();
    
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendConsoleLogHandler();
    
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerUpdatedEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerUpdatedEvent"][0]).toMatchObject(eventHandler);
    
    const customerUpdatedEvent = new CustomerUpdatedEvent({
        id: "123", 
        nome: "John Doe",
        endereco: "Rua 1, 123"
    });

    eventDispatcher.notify(customerUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
