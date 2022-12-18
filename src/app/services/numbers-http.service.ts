import { Injectable } from "@angular/core"
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Observable } from "rxjs"
import { NumbersResponse } from "../interfaces/NumbersResponse"
import { NumbersRequest } from "../interfaces/NumbersRequest"

@Injectable({
    providedIn: 'root'
})
export class NumbersHttpService {

    readonly appServerUrl: string = "http://localhost:8080/numbers"

    constructor(private httpClient: HttpClient) {}

    sortNumbers(numbersRequest: NumbersRequest): Observable<HttpResponse<NumbersResponse>> {
        return this.httpClient.post<NumbersRequest>(this.appServerUrl + "/sort-command", numbersRequest, { observe: "response"})
    }

}