import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PlaylistApiService } from './playlist-api.service';
import { featuredPlaylists } from './mock-database';
import { HttpEventType } from '@angular/common/http';

describe('PlaylistApiService', () => {
  let service: PlaylistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlaylistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return playlist data', () => {
    inject(
      [HttpTestingController, PlaylistApiService],
      (playlistApiService: PlaylistApiService) => {
        playlistApiService.getPlaylists().subscribe((event: any) => {
          switch (event.type) {
            case HttpEventType.Response:
              expect(event.body).toEqual(featuredPlaylists);
          }
        });
      })
  });
});
