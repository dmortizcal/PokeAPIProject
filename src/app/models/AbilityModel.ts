import {BasicModel} from "./BasicModel";

export interface AbilityModel {
  "ability": BasicModel,
  "is_hidden": boolean,
  "slot": number


  [key: string]: any;

}
