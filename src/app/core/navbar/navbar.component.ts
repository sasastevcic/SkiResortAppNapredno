import { Component, OnInit } from '@angular/core';

import { SkiResortService } from '../../ski-resorts/services/ski-resort.service';
import { SkiResortName } from '../../ski-resorts/model/ski-resort-name';

@Component({
  selector: 'ski-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  resorts: SkiResortName[];

  constructor(private skiResortService: SkiResortService) { }

  ngOnInit() {
    this.skiResortService.getNames().subscribe(names => this.resorts = names);
  }

}
