import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRestService} from "../../services/api-rest.service";
import {PokemonModel} from "../../models/PokemonModel";
import {PokemonListModel} from "../../models/PokemonListModel";

@Component({
  selector: 'app-varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.scss']
})
export class VarietiesComponent implements OnInit {
  loading: boolean = false
  pokemonList: PokemonListModel[] = []
  pokemon: PokemonModel = {
    sprites: {
      other: {
        "official-artwork": {
          front_default: ""
        }
      }
    }
  }

  constructor(private route: ActivatedRoute,
              private apiRest: ApiRestService,
              private router: Router) {
  }

  namePoke(name?: string): string {
    if (name !== undefined) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else return ""
  }

  goToPokemon(name: string) {
    this.router.navigate(['pokemon/', name]);
  }

  getPokemonDetails(name: any) {
    this.loading = true;
    this.apiRest.get(`pokemon/${name}`).then(
      (data: any) => {

        this.apiRest.get(data.species.url
        ).then((species: any) => {
          for (let varieties of species.varieties) {


            this.apiRest.get(varieties.pokemon.url
            ).then((poke: any) => {
              const pokemon: PokemonListModel = {
                id: poke.id,
                name: varieties.pokemon.name,
                image: poke.sprites.other["official-artwork"].front_default,
                types: poke.types,
                url: varieties.pokemon.url
              }
              this.pokemonList.push(pokemon)
            }).catch(err => {
              this.router.navigate(['no-encontrado'])
              console.log(err)
            })
          }

        }).catch(err => {
          this.router.navigate(['no-encontrado'])
          console.log(err)
        })

        this.pokemon = data as PokemonModel
        this.loading = false
        console.log(this.pokemonList)
      }, error => {
        this.loading = false
        this.router.navigate(['no-encontrado'])
        console.log(error)
      }
    ).catch(error => {
      this.loading = false
      console.log(error)
    })
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.getPokemonDetails(name);
  }
}
