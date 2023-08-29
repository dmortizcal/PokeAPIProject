import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from "./components/base/base.component";
import {HomeComponent} from "./components/home/home.component";
import {PokemonComponent} from "./components/pokemon/pokemon.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'pokemon/:name',
        component: PokemonComponent
      }]
  },
  {
    path: 'no-encontrado',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
