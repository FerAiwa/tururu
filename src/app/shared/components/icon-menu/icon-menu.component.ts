import { Component, OnInit, Input } from '@angular/core';
import { ProjectStore } from 'src/app/core/stores/project.store';

@Component({
  selector: 'tu-icon-menu',
  templateUrl: './icon-menu.component.html',
  styleUrls: ['./icon-menu.component.scss']
})
export class IconMenuComponent implements OnInit {
  projectId: string;

  constructor(private projectStore: ProjectStore) { }

  ngOnInit() {
    this.projectStore.state$.subscribe(
      (project) => {
        this.projectId = project && project._id ? project._id : null
      }
    )
  }
}
