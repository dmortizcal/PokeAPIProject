import {BasicModel} from "./BasicModel";

export interface TypeListModel{
  "count": number,
  "next": string,
  "previous": string,
  "results": BasicModel[]
}
