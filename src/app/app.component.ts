import { Component } from '@angular/core';
import { LoadingService } from './modules/core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'playlists';
  
  constructor(public loadingService: LoadingService) {}
}
