import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TeamStore } from 'src/app/core/stores/team.store';

@Component({
  selector: 'tu-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  constructor(public teamStore: TeamStore) { }
}
