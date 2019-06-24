import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { style, animate, animateChild, transition, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'tu-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', stagger(15, animateChild()))
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style(
            // { transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }
            { transform: 'scale(1) translateX(300px)', opacity: 0, height: '0px', margin: '0px' }
          )
        )
      ]),
    ])
  ],
})
export class TaskListComponent implements OnInit {
  @Input() tasks = [];
  @Output() stuff = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
