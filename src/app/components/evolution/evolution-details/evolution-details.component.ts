import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRestService} from "../../../services/api-rest.service";
import {PokemonModel} from "../../../models/PokemonModel";
import {EvolutionChainModel} from "../../../models/EvolutionChainModel";

@Component({
  selector: 'app-evolution-details',
  templateUrl: './evolution-details.component.html',
  styleUrls: ['./evolution-details.component.scss']
})
export class EvolutionDetailsComponent implements OnInit {
  namePokemon: string = ""
  loading: boolean = false
  layout: string = 'list';
  listEvolutions: EvolutionChainModel[] = []

  constructor(
    private route: ActivatedRoute,
    private apiRest: ApiRestService,
    private router: Router,
  ) {
  }

  goToPokemon(name: string) {
    this.router.navigate(['pokemon/', name]);
  }

  namePoke(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getPokemonSpecies(name: any) {
    this.loading = true;
    this.apiRest.get(`pokemon-species/${name}`).then(
      (data: any) => {

        this.getEvolutionChain(data.evolution_chain.url)
        this.loading = false
      }, error => {
        this.loading = false
        this.router.navigate(['no-encontrado'])
        console.log(error)
      }
    ).catch(error => {
      this.loading = false
      this.router.navigate(['no-encontrado'])
      console.log(error)
    })
  }

  async getEvolutionChain(url: string) {
    this.loading = true;
    this.apiRest.get(url).then(
      async (data: any) => {
        var evoData = data.chain;

        do {
          let numberOfEvolutions = evoData['evolves_to'].length;
          var evoDetails = evoData['evolution_details'][0];
          let poke = await this.consultDetailsPoke(`https://pokeapi.co/api/v2/pokemon/${evoData.species.name}`);

          const evolution: EvolutionChainModel = {
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            image: `${poke.sprites.other["official-artwork"].front_default}`,
            name: evoData.species.name,
            url_poke: `https://pokeapi.co/api/v2/pokemon/${evoData.species.name}`,
            types: poke.types
          }
          this.listEvolutions.push(evolution)

          if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
              let poke2 = await this.consultDetailsPoke(`https://pokeapi.co/api/v2/pokemon/${evoData.evolves_to[i].species.name}`);

              const evolution2: EvolutionChainModel = {
                min_level: !evoData.evolves_to[i] ? 1 : evoData.evolves_to[i].evolution_details[0].min_level,
                image: `${poke2.sprites.other["official-artwork"].front_default}`,
                name: evoData.evolves_to[i].species.name,
                url_poke: `https://pokeapi.co/api/v2/pokemon/${evoData.evolves_to[i].species.name}`,
                types: poke2.types
              }
              this.listEvolutions.push(evolution2)
            }
          }

          evoData = evoData['evolves_to'][0];

        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        console.log(this.listEvolutions)
        this.loading = false
      }, error => {
        this.loading = false
        console.log(error)
      }
    ).catch(error => {
      this.loading = false
      console.log(error)
    })
  }


  async consultDetailsPoke(url: string): Promise<PokemonModel> {
    try {
      const data = await this.apiRest.get(url);
      return data as PokemonModel;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.namePokemon = name ?? ''

    this.getPokemonSpecies(name)
  }

}
