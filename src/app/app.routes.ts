import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { AnasayfaComponent } from './pages/anasayfa/anasayfa.component';
import { HizmetlerimizComponent } from './pages/hizmetlerimiz/hizmetlerimiz.component';
import { FiyatlarComponent } from './pages/fiyatlar/fiyatlar.component';
import { DeneyimlerComponent } from './pages/deneyimler/deneyimler.component';
import { IletisimComponent } from './pages/iletisim/iletisim.component';
import { ImpressumComponent } from './pages/impressum/impressum.component';

export const routes: Routes = [
  { path: 'online-kuran-egitimi', loadComponent: () => import('./pages/online-kuran-egitimi/online-kuran-egitimi.component').then(m => m.OnlineKuranEgitimiComponent) },
  { path: 'canli-grup-basvuru', loadComponent: () => import('./pages/canli-grup-basvuru/canli-grup-basvuru.component').then(m => m.CanliGrupBasvuruComponent) },
  { path: 'uyelik-basvuru', loadComponent: () => import('./pages/uyelik-sistemi/uyelik-sistemi.component').then(m => m.UyelikSistemiComponent) },
  { path: 'gencler', loadComponent: () => import('./pages/gencler/gencler.component').then(m => m.GenclerComponent) },
  { path: 'egitimler', loadComponent: () => import('./pages/egitimler/egitimler.component').then(m => m.EgitimlerComponent) },
  { path: 'yetiskinler', loadComponent: () => import('./pages/yetiskinler/yetiskinler.component').then(m => m.YetiskinlerComponent) },
  { path: 'cocuklar', loadComponent: () => import('./pages/cocuklar/cocuklar.component').then(m => m.CocuklarComponent) },
  { path: 'canli-grup-dersleri', loadComponent: () => import('./pages/canli-grup-dersleri/canli-grup-dersleri.component').then(m => m.CanliGrupDersleriComponent) },
  { path: 'ikra-yontemi', loadComponent: () => import('./pages/ikra-yontemi/ikra-yontemi.component').then(m => m.IkraYontemiComponent) },
  { path: 'uyelik-sistemi', loadComponent: () => import('./pages/uyelik-sistemi/uyelik-sistemi.component').then(m => m.UyelikSistemiComponent) },
  { path: 'ogrenci-girisi', loadComponent: () => import('./pages/ogrenci-girisi/ogrenci-girisi.component').then(m => m.OgrenciGirisiComponent) },
  { path: 'anasayfa', component: AnasayfaComponent },
  { path: 'hizmetlerimiz', component: HizmetlerimizComponent },
  { path: 'fiyatlar', component: FiyatlarComponent },
  { path: 'deneyimler', component: DeneyimlerComponent },
  { path: 'iletisim', component: IletisimComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'sss', loadComponent: () => import('./pages/sss/sss.component').then(m => m.SssComponent) },
  { path: 'sayfa-bulunamadi', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },


  // Default redirect
  { path: '', redirectTo: '/anasayfa', pathMatch: 'full' },

  // Wildcard for unknown routes
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      errorHandler: (error) => {
        console.error('Navigation error:', error);
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
