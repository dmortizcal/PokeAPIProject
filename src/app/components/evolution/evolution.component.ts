import {Component, OnInit} from '@angular/core';
import {ApiRestService} from "../../services/api-rest.service";
import {Router} from "@angular/router";
import {EvolutionChainListModel} from "../../models/EvolutionChainListModel";

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit {
  evolutionList: EvolutionChainListModel[] = [];
  totalCount: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  loading: boolean = false;

  constructor(private apiRest: ApiRestService,
              private router: Router,) {
  }

  onPageChange(event: any): void {
    this.itemsPerPage = event.rows
    this.currentPage = event.page + 1;
    const offset = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    const url = `evolution-chain?offset=${offset}&limit=${this.itemsPerPage}`;
    this.loadEvolutionChains(url);
  }

  get currentPageReport(): string {
    const first = (this.currentPage - 1) * this.itemsPerPage + 1;
    const last = Math.min(this.currentPage * this.itemsPerPage, this.totalCount);
    return `Showing ${first} to ${last} of ${this.totalCount} entries`
  }

  namePoke(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  goToEvolution(name: string) {
    this.router.navigate(['evolution/', name]);
  }

  loadEvolutionChains(url: string) {
    this.evolutionList = []
    this.loading = true;

    this.apiRest.get(url).then(
      (data: any) => {
        this.totalCount = data["count"]

        data.results.forEach((evolutions: any) => {
          this.apiRest.get(evolutions.url).then((detailEvolution: any) => {
              this.apiRest.get(`pokemon/${detailEvolution.chain.species.name}`).then((poke: any) => {
                const evolution: EvolutionChainListModel = {
                  id: detailEvolution.id,
                  species: detailEvolution.chain.species.name,
                  url_species: detailEvolution.chain.species.url,
                  img_url: poke.sprites.other["official-artwork"].front_default
                }

                this.evolutionList.push(evolution)
              }).catch(err => {
                console.log(err)
              })
            }
          ).catch(err => {
            console.log(err)
          })
        })
        this.loading = false;

        console.log(this.evolutionList)
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
    this.loadEvolutionChains(`evolution-chain/?offset=0&limit=${this.itemsPerPage}`)
  }
}
