import { Component, OnInit, Input } from '@angular/core';
import { ProjectStore } from 'src/app/core/stores/project.store';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tu-icon-menu',
  templateUrl: './icon-menu.component.html',
  styleUrls: ['./icon-menu.component.scss']
})
export class IconMenuComponent implements OnInit {
  animateSoundForward = new Audio(`${environment.cloudinaryBaseSound}/j8jje3cqso3wa5qflfak.mp3`);

  projectId: string;

  constructor(private projectStore: ProjectStore) {
    this.animateSoundForward.load();
  }

  playSound() {
    this.animateSoundForward.play()
  }

  ngOnInit() {
    this.projectStore.state$.subscribe(
      (project) => {
        this.projectId = project && project._id ? project._id : null
      }
    )
  }
}
