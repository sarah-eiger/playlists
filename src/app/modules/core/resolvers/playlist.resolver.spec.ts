import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { PlaylistResolver } from './playlist.resolver';
import { Observable, of } from 'rxjs';
import { featuredPlaylists } from 'src/app/api/mock-database';
import { PlaylistApiService } from 'src/app/api/playlist-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FeaturedPlaylists } from '../../playlists/models/playlist.models';


describe('PlaylistResolver', () => {
  let resolver: PlaylistResolver;
  let mockAPIService: { getPlaylists: { and: { returnValue: (arg0: Observable<FeaturedPlaylists> | Observable<HttpErrorResponse>) => void; }; }; };

  beforeEach(() => {
    mockAPIService = jasmine.createSpyObj(['getPlaylists']);
    mockAPIService.getPlaylists.and.returnValue(of(featuredPlaylists));
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PlaylistApiService, useValue: mockAPIService }]
    });
    resolver = TestBed.inject(PlaylistResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should return playlist data', () => {
    resolver.resolve().subscribe((result) => {
      expect(result).toEqual(featuredPlaylists);
    })
  });
});

