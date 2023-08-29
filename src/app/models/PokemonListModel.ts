import {TypeModel} from "./TypeModel";

export interface PokemonListModel {
  "id": number,
  "name"?: string,
  "image"?: string,
  "types"?: TypeModel[]
  "url"?: string,

  [key: string]: any;
}
