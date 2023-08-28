import {Component, OnInit} from '@angular/core';
import {ApiRestService} from "../../services/api-rest.service";
import {PokemonListModel} from "../../models/PokemonListModel";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  pokemonList: PokemonListModel[] = [];
  totalCount: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  loading: boolean = false;

  constructor(
    private apiRest: ApiRestService,
  ) {
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    const offset = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    const url = `pokemon?offset=${offset}&limit=${this.itemsPerPage}`;
    this.loadPokemonList(url);
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
                image: detailPoke.sprites.front_default,
                url: poke.url
              }
              this.pokemonList.push(pokemon)
            }
          ).catch(err => {
            console.log(err)
          })
        })

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

  ngOnInit(): void {
    this.loadPokemonList(`pokemon/?offset=0&limit=${this.itemsPerPage}`)
  }

}
