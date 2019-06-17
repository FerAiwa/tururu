import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tu-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  login = true;

  constructor(
  ) {
    console.log('Loading welcome');
  }

  ngOnInit() {
  }

}
