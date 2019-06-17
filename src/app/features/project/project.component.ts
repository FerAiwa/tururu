import { Component, OnInit } from '@angular/core';
import { ProjectStore } from 'src/app/core/stores/project.store';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/core/core.models';

@Component({
  selector: 'tu-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project;
  projectId;
  stats;

  constructor(
    private projectStore: ProjectStore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.route.params.subscribe(({ id }) => {
      this.projectStore
        .getProject(id).subscribe(
          (project: Project) => {
            this.project = project;
            this.stats = project.stats;
          },
          (e) => console.log(e),
        );
    })
  }

}
