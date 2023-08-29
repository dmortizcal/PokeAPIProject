import {Component, OnInit} from '@angular/core';
import {AbilityListModel} from "../../models/AbilitiyListModel";
import {BasicModel} from "../../models/BasicModel";
import {ApiRestService} from "../../services/api-rest.service";
import {TypeListModel} from "../../models/TypeListModel";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  loading: boolean = false;
  types: BasicModel[] = [];
  totalCount: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(
    private apiRest: ApiRestService
  ) {
  }

  nameType(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    const offset = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    const url = `type?offset=${offset}&limit=${this.itemsPerPage}`;
    this.loadTypes(url);
  }

  loadTypes(url: string) {
    this.loading = true;

    this.apiRest.get(url).then(
      (data: any) => {
        const listType = data as TypeListModel
        this.totalCount = listType.count
        this.types = listType.results as BasicModel[]
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
    this.loadTypes(`type?offset=0&limit=${this.itemsPerPage}`)
  }

}
