import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../models/playlist.models';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements AfterViewInit {

  constructor(private route: ActivatedRoute) { }

  public dataSource: MatTableDataSource<Playlist> = new MatTableDataSource<Playlist>(this.route.snapshot.data['playlistData'].content);
  public playlists$: Observable<Playlist[]> = this.dataSource.connect();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Navigates to the playlist on click of the mat-card
   * @param {string} url - the navigation address
   */
  public navigateToPlaylist(url: string): void {
    window.open(url, "_blank")
  }

  /**
   * Applies filter to our data when typing in the filter field
   * @param {Event} event - the input event
   */
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Clears our filter value
   * @param {HTMLInputElement} filterInput - our filter input element
   */
  public clearFilter(filterInput: HTMLInputElement): void {
    this.dataSource.filter = '';
    filterInput.value = '';
  }

}
