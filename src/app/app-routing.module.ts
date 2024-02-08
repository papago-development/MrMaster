import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'introducere-facturi',
    loadChildren: () => import('./introducere-facturi/introducere-facturi.module').then( m => m.IntroducereFacturiPageModule)
  },
  {
    path: 'gridarticole',
    loadChildren: () => import('./gridarticole/gridarticole.module').then( m => m.GridarticolePageModule)
  },
  {
    path: 'eroaremodal',
    loadChildren: () => import('./eroaremodal/eroaremodal.module').then( m => m.EroaremodalPageModule)
  },
  {
    path: 'editare-facturi',
    loadChildren: () => import('./editare-facturi/editare-facturi.module').then( m => m.EditareFacturiPageModule)
  },
  {
    path: 'modific-factura',
    loadChildren: () => import('./modific-factura/modific-factura.module').then( m => m.ModificFacturaPageModule)
  },
  {
    path: 'stocuri',
    loadChildren: () => import('./stocuri/stocuri.module').then( m => m.StocuriPageModule)
  },
  {
    path: 'punct-de-lucru-details',
    loadChildren: () => import('./punct-de-lucru-details/punct-de-lucru-details.module').then( m => m.PunctDeLucruDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'avize',
    loadChildren: () => import('./avize/avize.module').then( m => m.AvizePageModule)
  },
  {
    path: 'iesiri',
    loadChildren: () => import('./iesiri/iesiri.module').then( m => m.IesiriPageModule)
  },
  {
    path: 'consumuri',
    loadChildren: () => import('./consumuri/consumuri.module').then( m => m.ConsumuriPageModule)
  },
  {
    path: 'modificari',
    loadChildren: () => import('./modificari/modificari.module').then( m => m.ModificariPageModule)
  },
  {
    path: 'vanzari',
    loadChildren: () => import('./vanzari/vanzari.module').then( m => m.VanzariPageModule)
  },
  {
    path: 'situatie',
    loadChildren: () => import('./situatie/situatie.module').then( m => m.SituatiePageModule)
  },
  {
    path: 'gridarticolepctdelucru',
    loadChildren: () => import('./gridarticolepctdelucru/gridarticolepctdelucru.module').then( m => m.GridarticolepctdelucruPageModule)
  },
  {
    path: 'modific-aviz',
    loadChildren: () => import('./modific-aviz/modific-aviz.module').then( m => m.ModificAvizPageModule)
  },
  {
    path: 'vezi-aviz',
    loadChildren: () => import('./vezi-aviz/vezi-aviz.module').then( m => m.VeziAvizPageModule)
  },
  {
    path: 'setari',
    loadChildren: () => import('./setari/setari.module').then( m => m.SetariPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
