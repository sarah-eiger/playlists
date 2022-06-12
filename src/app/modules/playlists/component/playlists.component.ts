import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class PlaylistsComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute) { }

  public dataSource: MatTableDataSource<Playlist> = new MatTableDataSource<Playlist>(this.route.snapshot.data['playlistData'].content);
  public playlists$: Observable<Playlist[]> = this.dataSource.connect();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  navigateToPlaylist(url: string) {
    window.open(url, "_blank")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public clearFilter(filterInput: HTMLInputElement): void {
    this.dataSource.filter = '';
    filterInput.value = '';
  }

}
