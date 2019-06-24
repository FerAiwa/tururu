import { Component, Input, ChangeDetectionStrategy, ElementRef, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { delay, tap } from 'rxjs/operators'

@Component({
  selector: 'tu-checkbox',
  template: `
    <span class="task-status" [ngClass]="{ 'done': done }"> </span>
  `,
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() done: boolean = false;
  @Output() checked =
    fromEvent(this.elRef.nativeElement, 'click')
      .pipe(
        tap(x => this.done = false),
        delay(200)//do the checkbox transition before emiting
      )

  constructor(private elRef: ElementRef) { }
}
