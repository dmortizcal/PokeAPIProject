import {AbilityModel} from "./AbilityModel";
import {StatModel} from "./StatModel";
import {MoveModel} from "./MoveModel";
import {TypeModel} from "./TypeModel";

export interface PokemonModel {
  "id"?: number
  "name"?: string
  "abilities"?: AbilityModel[]
  "base_experience"?: number
  "height"?: number
  "location_area_encounters"?: string
  "moves"?: MoveModel[]
  "stats"?: StatModel[]
  "types"?: TypeModel[]
  "sprites": {
    "other": {
      "official-artwork": {
        "front_default": string
      },
    },
  },
  weight?: number

  [key: string]: any;
}
