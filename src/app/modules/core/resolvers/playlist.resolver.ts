import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of, take } from 'rxjs';
import { PlaylistApiService } from 'src/app/api/playlist-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistResolver implements Resolve<boolean> {

  constructor(private playlistApiService: PlaylistApiService) { }

  /**
   * This fetches all of our playlist data before we navigate to the playlists page
   * @returns {Observable<any>} - returns playlists, or an empty object on failure
   */
  resolve(): Observable<any> {
    return this.playlistApiService.getPlaylists().pipe(
      take(1),
      catchError((error) => {
          console.warn(error);
          return of({});
      })
  );

  }
}
