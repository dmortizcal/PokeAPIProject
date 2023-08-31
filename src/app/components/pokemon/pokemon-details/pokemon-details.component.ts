import {Component, OnInit} from '@angular/core';
import {PokemonModel} from "../../../models/PokemonModel";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRestService} from "../../../services/api-rest.service";
import {StatModel} from "../../../models/StatModel";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  loading: boolean = false
  dataChart: any;
  optionsChart: any;
  pokemon: PokemonModel = {
    sprites: {
      other: {
        "official-artwork": {
          front_default: ""
        }
      }
    }
  }
  namePokemon: string = ""

  constructor(
    private route: ActivatedRoute,
    private apiRest: ApiRestService,
    private router: Router,
  ) {
    this.namePokemon = this.route.snapshot.paramMap.get('name') ?? '';
  }

  namePoke(name?: string): string {
    if (name !== undefined) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    } else return ""
  }

  goToVarieties(name: string) {
    this.router.navigate(['varieties/', name]);
  }

  goToEvolutions(name: string) {
    this.router.navigate(['evolution/', name]);
  }

  newDataChart(stats?: StatModel[]) {
    const labels = stats?.map(item => {
      const name = item.stat.name;
      if (name !== undefined) {
        return name?.charAt(0).toUpperCase() + name?.slice(1)
      } else return '';
    });

    const baseStats = stats?.map(item => item.base_stat);
    const effortStats = stats?.map(item => item.effort);

    this.dataChart = {
      labels: labels,
      datasets: [
        {
          label: 'Battle Stat',
          data: baseStats,
          fill: false,
          backgroundColor: '#FF9999',
          borderColor: '#FF9999',
          tension: 0.4
        },
        {
          label: 'Effort Values',
          data: effortStats,
          fill: false,
          backgroundColor: '#EFC907',
          borderColor: '#EFC907',
          tension: 0.4
        }
      ]
    };

    this.optionsChart = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
    }
  }

  getPokemonDetails(name: any) {
    this.loading = true;
    this.apiRest.get(`pokemon/${name}`).then(
      (data: any) => {
        this.pokemon = data as PokemonModel
        this.newDataChart(this.pokemon.stats)
        this.loading = false
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
