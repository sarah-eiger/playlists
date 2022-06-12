import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  /** This loading subject tracks whether any httprequests are in progress.
   * It links the loading.interceptor functionality to our app.component, which listens to the loadingSubject
   * and renders our loading spinner accordingly
   */
  loadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor() { }
  
}
