import {Component, OnInit} from '@angular/core';
import {PokemonListModel} from "../../models/PokemonListModel";
import {ApiRestService} from "../../services/api-rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  pokemonList: PokemonListModel[] = [];
  totalCount: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  loading: boolean = false;

  constructor(
    private apiRest: ApiRestService,
    private router: Router,
  ) {
  }

  onPageChange(event: any): void {
    this.itemsPerPage = event.rows
    this.currentPage = event.page + 1;
    const offset = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    const url = `pokemon?offset=${offset}&limit=${this.itemsPerPage}`;
    this.loadPokemonList(url);
  }

  get currentPageReport(): string {
    const first = (this.currentPage - 1) * this.itemsPerPage + 1;
    const last = Math.min(this.currentPage * this.itemsPerPage, this.totalCount);
    return `Showing ${first} to ${last} of ${this.totalCount} entries`
  }

  namePoke(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  loadPokemonList(url: string) {
    this.pokemonList = []
    this.loading = true;

    this.apiRest.get(url).then(
      (data: any) => {
        this.totalCount = data["count"]

        data.results.forEach((poke: any) => {
          this.apiRest.get(poke.url).then((detailPoke: any) => {
              const pokemon: PokemonListModel = {
                id: detailPoke.id,
                name: poke.name,
                image: detailPoke.sprites.other["official-artwork"].front_default,
                types: detailPoke.types,
                url: poke.url
              }
              this.pokemonList.push(pokemon)
            }
          ).catch(err => {
            console.log(err)
          })
        })
        console.log(this.pokemonList)
        this.loading = false;
      },
      error => {
        this.loading = false
        console.log(error)
      }
    ).catch(error => {
      this.loading = false
      console.log(error)
    })
  }

  goToPokemon(name: string) {
    this.router.navigate(['pokemon/', name]);
  }


  ngOnInit(): void {
    this.loadPokemonList(`pokemon/?offset=0&limit=${this.itemsPerPage}`)
  }

}
