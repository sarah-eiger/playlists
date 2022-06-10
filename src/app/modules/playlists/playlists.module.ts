import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './component/playlists.component';
import { RouterModule, Routes } from '@angular/router';

const playlistRoutes: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
  }
];

@NgModule({
  declarations: [PlaylistsComponent],
  imports: [
    CommonModule,
    RouterModule, //TODO: do I need this??
    RouterModule.forChild(playlistRoutes)
  ]
})
export class PlaylistsModule { }
