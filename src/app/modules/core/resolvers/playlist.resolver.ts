import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { PlaylistApiService } from 'src/app/api/playlist-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolver implements Resolve<boolean> {

  constructor(private playlistApiService: PlaylistApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.playlistApiService.getPlaylists().pipe(
      take(1),
      catchError((error) => {
          console.warn(error);
          return of({});
      })
  );

  }
}
