import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseComponent} from "./components/base/base.component";
import {HomeComponent} from "./components/home/home.component";
import {PokemonComponent} from "./components/pokemon/pokemon.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {PokemonDetailsComponent} from "./components/pokemon/pokemon-details/pokemon-details.component";
import {AbilityComponent} from "./components/ability/ability.component";
import {TypeComponent} from "./components/type/type.component";

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
        path: 'pokemon',
        component: PokemonComponent,
      },
      {
        path: 'pokemon/:name',
        component: PokemonDetailsComponent
      },
      {
        path: 'abilities',
        component: AbilityComponent,
      },
      {
        path: 'types',
        component: TypeComponent,
      },
    ]
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
