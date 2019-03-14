import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { SkiResortService } from './services/ski-resort.service';
import { SkiResort } from './model/ski-resort';
import { Track } from './model/track';
import { Weather } from './model/weather';
import { SkiPassPrice } from './model/ski-pass-price';

@Component({
  selector: 'ski-resorts',
  templateUrl: './ski-resorts.component.html',
  styleUrls: ['./ski-resorts.component.css']
})
export class SkiResortsComponent implements OnInit {
  skiResort: SkiResort;
  tracks: Track[];
  weather: Weather[]
  skiPassPrice: SkiPassPrice[]

  constructor(private skiResortService: SkiResortService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['resortId']);
      //forkJoin je funkcija koja će obuhvatiti više asinhronih (Observable)
      //poziva i dopustiti nam da reagujemo na razrešenje svih poziva.
      //U liniji 43 vidimo ispis za grešku koji će se aktivirati ako bilo
      //koji poziv pukne. Da ne koristimo forkJoin morali bi pisati takav
      //kod za svaki poziv pojedinačno.
      forkJoin(
        this.skiResortService.getResort(id),
        this.skiResortService.getTracks(id),
        this.skiResortService.getWeather(id),
        this.skiResortService.getSkiPassPrice(id)
      ).subscribe(res => {
        this.skiResort = res[0];
        this.tracks = res[1];
        this.weather = res[2];
        this.skiPassPrice = res[3];
      }, err => {
        console.log("error: ", err);
      });
    });
  }

  updateTracks(sort) {
    this.skiResortService.getTracks(this.skiResort._id, sort).subscribe(tracks => this.tracks = tracks);
  }

  newReservation(reservation) {
    reservation.mountain_id = this.skiResort._id;
    this.skiResortService.saveReservation(reservation).subscribe(res => {
      window.alert("Reservation successful!");
    }, err => {
      window.alert("Error: " + err);
    });
  }
}
