import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
const API_BASE_URL = "https://devza.com/tests/tasks/";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  headerToken: any;
  constructor(public _http: HttpClient) {
    this.headerToken = {
      headers: new HttpHeaders().set(
        "AuthToken",
        "iHfa5e24d2rNmgNg4RyKUq497RSS6upJ"
      ),
    };
  }

  getTasksList() {
    return this._http.get(this.getApiEndpoint("list"), this.headerToken)
  }

  getUsersList() {
    return this._http.get(this.getApiEndpoint("listusers"), this.headerToken)
  }

  addTask(params) {
    return this._http.post(
      this.getApiEndpoint("create"),
      params,
      this.headerToken
    );
  }

  updateTask(params) {
    return this._http.post(
      this.getApiEndpoint('update'),
      params,
      this.headerToken
    );
  } 

  deleteTask(params) {
    return this._http.post(
      this.getApiEndpoint('delete'),
      params,
      this.headerToken
    )
  }

  getApiEndpoint(url: string) {
    return API_BASE_URL + url;
  }
}
