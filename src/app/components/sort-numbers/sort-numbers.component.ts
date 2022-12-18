import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NumbersRequest } from 'src/app/interfaces/NumbersRequest';
import { NumbersHttpService } from 'src/app/services/numbers-http.service';

@Component({
  selector: 'app-sort-numbers',
  templateUrl: './sort-numbers.component.html',
  styleUrls: ['./sort-numbers.component.css']
})
export class SortNumbersComponent implements OnInit {

  numbers: string = ""
  order: string
  availbleOrders: Array<string> = ["ASC", "DESC"]
  sortedNumbers: Array<number> | undefined = []

  constructor(private numbersHttpService: NumbersHttpService, private router: Router) { 
    this.order = this.availbleOrders[0]
  }

  ngOnInit(): void {}

  sortNumbers() {
    let numbersToSend: Array<number> = []

    if (this.numbers.length == 0) {
      return
    }

    try {
      numbersToSend = this.numbers.split(",").map(Number)
    } catch {
      return
    }

    const numbersRequest: NumbersRequest = {
      numbers: numbersToSend,
      order: this.order
    }

    this.numbersHttpService.sortNumbers(numbersRequest).subscribe({
      next: response => {
        console.log(response.body?.numbers)
        this.sortedNumbers = response.body?.numbers 
      },
      error: (err: HttpErrorResponse) => {
      }
    })
  }

}
