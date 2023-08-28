import {Injectable} from '@angular/core';
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private http: AxiosInstance;

  constructor() {
    const options: AxiosRequestConfig = {
      baseURL: "https://pokeapi.co/api/v2/",
      headers: {
        "Content-type": "application/json"
      }
    };

    this.http = axios.create(options);
  }

  async get<T>(endpoint: string,): Promise<T> {
    return this.http.get<T>(endpoint)
      .then(res => res.data)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    if (error.response) {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // A client-side or network error occurred. Handle it accordingly.
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error);
    }
  }
}
