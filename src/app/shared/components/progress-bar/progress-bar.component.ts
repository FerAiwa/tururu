import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'tu-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],

})
export class ProgressBarComponent implements OnInit {
  @Input() title: String = '';
  @Input() color: String = 'black';
  @Input() percent: String;

  constructor() { }

  ngOnInit() {
  }

}
