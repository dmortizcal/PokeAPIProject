import {Component, OnInit} from '@angular/core';
import {ApiRestService} from "../../services/api-rest.service";
import {AbilityListModel} from "../../models/AbilitiyListModel";
import {BasicModel} from "../../models/BasicModel";

@Component({
  selector: 'app-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {
  loading: boolean = false;
  abilities: BasicModel[] = [];
  totalCount: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(
    private apiRest: ApiRestService
  ) {
  }

  nameAbility(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    const offset = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    const url = `ability?offset=${offset}&limit=${this.itemsPerPage}`;
    this.loadAbilities(url);
  }

  loadAbilities(url: string) {
    this.loading = true;

    this.apiRest.get(url).then(
      (data: any) => {
        const listAbilities = data as AbilityListModel
        this.totalCount = listAbilities.count
        this.abilities = listAbilities.results as BasicModel[]
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

  ngOnInit() {
    this.loadAbilities(`ability?offset=0&limit=${this.itemsPerPage}`)
  }

}
