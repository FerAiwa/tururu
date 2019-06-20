import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProjectBrieffing } from 'src/app/core/core.models';

@Component({
  selector: 'tu-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input() project: ProjectBrieffing;

}
