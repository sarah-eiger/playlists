import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './component/playlists.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';

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
    CoreModule,
    RouterModule.forChild(playlistRoutes)
  ]
})
export class PlaylistsModule { }
