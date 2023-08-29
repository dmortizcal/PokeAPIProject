import {BasicModel} from "./BasicModel";

export interface AbilityListModel {
  "count": number;
  "next"?: string;
  "previous"?: string;
  "results"?: BasicModel[];

  [key: string]: any;
}
