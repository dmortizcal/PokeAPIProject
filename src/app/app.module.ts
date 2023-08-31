import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PrimengModule} from "./primeng.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BaseComponent } from './components/base/base.component';
import { HeaderComponent } from './components/base/header/header.component';
import { FooterComponent } from './components/base/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PokemonDetailsComponent } from './components/pokemon/pokemon-details/pokemon-details.component';
import { AbilityComponent } from './components/ability/ability.component';
import { TypeComponent } from './components/type/type.component';
import { EvolutionComponent } from './components/evolution/evolution.component';
import { EvolutionDetailsComponent } from './components/evolution/evolution-details/evolution-details.component';
import { VarietiesComponent } from './components/varieties/varieties.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PokemonComponent,
    NotFoundComponent,
    PokemonDetailsComponent,
    AbilityComponent,
    TypeComponent,
    EvolutionComponent,
    EvolutionDetailsComponent,
    VarietiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    PrimengModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
