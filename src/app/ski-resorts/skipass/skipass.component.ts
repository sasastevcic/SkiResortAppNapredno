import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SkiPassPrice } from '../model/ski-pass-price';
import { Reservation } from '../model/reservation';

@Component({
  selector: 'ski-skipass',
  templateUrl: './skipass.component.html',
  styleUrls: ['./skipass.component.css']
})
export class SkipassComponent implements OnInit {
  @Input() skiPassPrice: SkiPassPrice[]
  @Output() newReservation = new EventEmitter<Reservation>();

  reservation: Reservation = new Reservation();

  constructor() { }

  ngOnInit() {
  }

  calculatePrice() {
    if(this.reservation.from && this.reservation.to) {
      let diffDays = this.reservation.calculateDateDifference();
      if(diffDays < 1 || diffDays > 7) {
        console.log("Out of scope");
        this.reservation.price = null;
      }

      for(let i = 0; i < this.skiPassPrice.length; i++) {
        if(this.skiPassPrice[i].duration == diffDays) {
          this.reservation.price = this.skiPassPrice[i].price;
          break;
        }
      }
    }
  }

  saveReservation() {
    this.newReservation.emit(this.reservation);
    this.reservation = new Reservation();
  }
}
