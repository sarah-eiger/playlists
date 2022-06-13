import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { PlaylistsComponent } from './playlists.component';
import {featuredPlaylists} from '../../../api/mock-database';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

const mockActivatedRoute = {
  snapshot: {
    data: {
      playlistData: {
        content: featuredPlaylists.content
      } 
    } 
  }
}

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, MatCardModule, MatIconModule, MatFormFieldModule, MatPaginatorModule, MatInputModule],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should filter playlist options using the filter input`, () => {
    const filterInput = fixture.debugElement.query(By.css('input'));
    filterInput.nativeElement.click();
    filterInput.nativeElement.value = 'today';
    filterInput.nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component['dataSource']['filter']).toEqual('today');
    expect(component['dataSource']['filteredData'].length).toEqual(6);

    spyOn(component, 'clearFilter').and.callThrough();
    const clearFilter = fixture.debugElement.query(By.css('#clear-filter'));
    clearFilter.nativeElement.click();
    fixture.detectChanges();

    expect(component['clearFilter']).toHaveBeenCalled();
    expect(component['dataSource']['filter']).toEqual('');
  });

  it('should navigate to a playlist', () => {
    spyOn(component, 'navigateToPlaylist').and.callFake(() => {});
    const playlistCard = fixture.debugElement.query(By.css('mat-card'));
    playlistCard.nativeElement.click();
    fixture.detectChanges();
    expect(component['navigateToPlaylist']).toHaveBeenCalled();
  })

});
