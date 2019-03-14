import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Track } from '../model/track';

@Component({
  selector: 'ski-resort-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  @Input() tracks: Track[];
  @Output() changeSort = new EventEmitter();
  sortCriteria: string;

  constructor() { }

  ngOnInit() {
  }

  updateCriteria() {
    this.changeSort.emit({"sort": this.sortCriteria});
  }
}
