import { Component, OnInit } from '@angular/core';

import { TaskStore } from 'src/app/core/stores/task.store';
import { Task } from 'src/app/core/core.models';
import { SprintStore } from 'src/app/core/stores/sprint.store';
import { WorkSessionStore } from 'src/app/core/stores/worksession.store';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamStore } from 'src/app/core/stores/team.store';
import { ActiveSessionsService } from 'src/app/core/services/active-sessions.service';

/**
 * Gets sprint Tasks.
 * Display Task info (name, ellapsed time)
 * Has a play button to select
 * Listend to (play) actions --> redirect to worksessions ()
 */
@Component({
  selector: 'tu-worksession',
  templateUrl: './worksession.component.html',
  styleUrls: ['./worksession.component.scss']
})
export class WorksessionComponent implements OnInit {
  activeSessions;
  task = {
    name: "Worksession Component",
    ellapsedTime: '00:00',
  }
  timeboxMinutes = 20;

  constructor(
    public activeSessionsService: ActiveSessionsService,
    public taskStore: TaskStore,
    public sprintStore: SprintStore,
    private teamStore: TeamStore,
    private workSessionStore: WorkSessionStore,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  //  avatarUrl: "https://res.cloudinary.com/hackabos01fer/raw/upload/v1559558500/dd0e9bb0-b951-425e-b437-8f6514746904.jpg"
  //  name: "User2"
  //  startedAt: "2019-06-12T06:22:24.307Z"
  //  taskId: "5cf7d556247e695098912352"
  //  uuid: "dd0e9bb0-b951-425e-b437-8f6514746904"
  //  _id: "5cefa933900fb54f307aaf3a"

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const id = this.route.snapshot.params['id'];

    // this.activeSessionsService.activeSessions$
    //   .subscribe(
    //     ass => {
    //       this.activeSessions = ass
    //       console.log(this.activeSessions);
    //     }
    //   )
    this.activeSessionsService.getActiveSessions(id);
  }


  startWorkSession(task: Task) {
    this.workSessionStore.createWorkSession(task, this.timeboxMinutes)
      .subscribe(
        () => {
          this.router.navigate(['../timer'], { relativeTo: this.route });
        },
        (err) => console.log(err)
      )
  }
}

