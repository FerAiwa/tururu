import { Component } from '@angular/core';
import { ToastService } from 'src/app/core/services/app-notification/toast.service';
import { style, animate, animateChild, transition, trigger, query, stagger } from '@angular/animations';

@Component({
  selector: 'tu-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(15, animateChild()), { optional: true })
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'translateY(50%)', opacity: 0, zIndex: -1 }),
        animate('.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'translateY(-20%)', opacity: .5, zIndex: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: .5 }),
        animate('.25s cubic-bezier(.8,-0.6,0.2,1.5)',
          style(
            { transform: 'translateY(50%)', opacity: 0 }
          )
        )
      ]),
    ])
  ],
})
export class ToastComponent {

  constructor(public toastService: ToastService) { }

}
