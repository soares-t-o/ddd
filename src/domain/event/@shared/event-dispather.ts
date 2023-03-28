import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface{
    private eventHandlers: {[eventName:string]: EventHandlerInterface[]} = {};

    get getEventHandlers(): {[keventNameey:string]: EventHandlerInterface[]} {
        return this.eventHandlers;
    }


    register(eventName:string, handler: EventHandlerInterface): void{
        if(!this.eventHandlers[eventName]){
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    notify(event: EventInterface): void{
        const eventHandlers = this.eventHandlers[event.constructor.name];
        if(eventHandlers){
            eventHandlers.forEach((eventHandler: EventHandlerInterface) => {
                eventHandler.handle(event);
            });
        }
    }

    unregister(eventName:string, handler: EventHandlerInterface): void{
        if(this.eventHandlers[eventName]){
           const index = this.eventHandlers[eventName].indexOf(handler);
           if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void{
        this.eventHandlers = {};
    }
}