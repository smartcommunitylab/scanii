import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription, filter, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {
  observable: Observable<any>;
  observer: Observer<any> | undefined ;

  constructor() {
    this.observable = Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    }).pipe(share());
  }
  
  subscribe(eventName: any, callback: any) {
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: any) => {
          return event.name === eventName;
        })
      )
      .subscribe(callback);
    return subscriber;
  }
  
  broadcast(event: any) {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  destroy(subscriber: Subscription) {
    subscriber.unsubscribe();
  }
}
