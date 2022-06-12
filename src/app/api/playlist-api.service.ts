import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FeaturedPlaylists } from '../modules/playlists/models/playlist.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PlaylistApiService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Gets all of the playlists
   * @returns {Observable<FeaturedPlaylists>}
   */
  public getPlaylists(): Observable<FeaturedPlaylists> {
    return this.httpClient.get<FeaturedPlaylists>(`${environment.apiUrl}/playlists/getPlaylists`)
}

}
