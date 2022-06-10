import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './modules/core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
          style({ opacity: 0 }),
          animate(1000, style({ opacity: 1 }))
      ]),
  ])]
})

export class AppComponent {
  public loading: boolean = false;

  constructor(public loadingService: LoadingService) { }

  ngOnInit() {}

  public prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet?.activatedRouteData;
  }

}
