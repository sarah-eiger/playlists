import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from './modules/core/guards/can-load.guard';
import { PlaylistResolver } from './modules/core/resolvers/playlist.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: 'home',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
  },

  {
    path: 'playlists',
    loadChildren: () =>
      import('./modules/playlists/playlists.module').then(m => m.PlaylistsModule),
    resolve: { playlistData: PlaylistResolver }
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./modules/account/account.module').then(m => m.AccountModule),
    canLoad: [CanLoadGuard]
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule),
  },

  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }