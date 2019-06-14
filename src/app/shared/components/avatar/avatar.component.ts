import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserInfo } from 'src/app/core/core.models';

@Component({
  selector: 'tu-avatar',
  host: {
    style: '{ display: inline-flex  padding: .25rem}'
  },
  template: `
    <img *ngIf="src"  
    [src]="src" 
    [ngStyle]="{ width: width, height: height, 'min-width': width, borderRadius: radius, 'border': '2px solid white' }"
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() user: UserInfo;
  @Input() src = '';
  @Input() width = 'auto';
  @Input() height = 'auto';
  @Input() radius = '50%';
}
