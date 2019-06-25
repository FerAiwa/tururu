import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectStore } from 'src/app/core/stores/project.store';
import { Project } from 'src/app/core/core.models';
import { UserStore } from 'src/app/core/stores';

@Component({
  selector: 'tu-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @ViewChild('file') file;
  project;
  projectId;
  stats;

  constructor(
    private projectStore: ProjectStore,
    private userStore: UserStore,
    private route: ActivatedRoute,
  ) { }

  uploadBanner() {
    this.file.nativeElement.click();
  }

  onFileAdded() {
    const image = this.file.nativeElement.files[0];
    this.projectStore
      .uploadBanner(image)
      .subscribe(() => this.userStore.updateProjectListBanner())
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];

    this.route.params.
      subscribe(
        ({ id }) => {
          this.projectStore.getProject(id)
            .subscribe(
              (project: Project) => {
                this.project = project;
                this.stats = project.stats;
              },
              (e) => console.log(e),
            )
        })
  };
}
