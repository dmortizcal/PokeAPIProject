import {BasicModel} from "./BasicModel";
import {VarietiesModel} from "./VarietiesModel";

export interface SpeciesModel {
  "color"?: BasicModel
  "capture_rate"?: number
  "habitat"?: BasicModel
  "name"?: string
  "shape"?: BasicModel
  "varieties"?: VarietiesModel[]

  [key: string]: any;
}
