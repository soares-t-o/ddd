
import { CustomerCreatedEvent } from "../customer/customer-created.events";
import SendConsoleLog1Handler from "../customer/handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "../customer/handler/send-console-log-2.handler";
import SendConsoleLogHandler from "../customer/handler/send-console-log.handler";
import EventDispatcher from "./event-dispather";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
   
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    


    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toMatchObject([eventHandler1, eventHandler2]);

 });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toMatchObject([eventHandler1, eventHandler2]);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    
    const eventHandler1 = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new SendConsoleLog1Handler();
    const eventHandler2 = new SendConsoleLog2Handler();
    
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    
    const customerCreatedEvent = new CustomerCreatedEvent({
        id: "123", 
        name: "John Doe"
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
