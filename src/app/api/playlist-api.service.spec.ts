import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { PlaylistApiService } from './playlist-api.service';
import { featuredPlaylists } from './mock-database';

describe('PlaylistApiService', () => {
  let service: PlaylistApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlaylistApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return playlist data', fakeAsync(() => {
    service.getPlaylists().subscribe(playlists => {
      expect(playlists).toEqual(featuredPlaylists)
    })

    const req = httpTestingController.expectOne('http://localhost:4000/playlists/getPlaylists');
    expect(req.request.method).toEqual('GET');
    req.flush(featuredPlaylists);
  }));
});



