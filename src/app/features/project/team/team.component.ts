import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from 'src/app/core/core.models';
import { TeamStore } from 'src/app/core/stores/team.store';

@Component({
  selector: 'tu-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() project: string;

  team: UserInfo[];

  constructor(private teamStore: TeamStore) { }

  ngOnInit() {
    this.teamStore.getTeamInfo(this.project).subscribe(
      team => this.team = team
    )
  }

}
