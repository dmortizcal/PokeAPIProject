import {TypeModel} from "./TypeModel";

export interface EvolutionChainModel {
  "name": string,
  "min_level": number,
  "url_poke": string,
  "image": string,
  "types"?: TypeModel[]

  [key: string]: any;
}
