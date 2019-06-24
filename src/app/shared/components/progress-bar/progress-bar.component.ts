import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'tu-progress-bar',
  template: `
  <div [style.color]="color" class="meter">
    <p>{{title}}</p>
    <span style="background-color: #6cc4d9"
          [style.width]="percent + '%'">
    </span>
  </div>
  `,
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() title: String = '';
  @Input() color: String = 'black';
  @Input() percent: String;
}
