import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/core/core.models';

@Pipe({
  name: 'completedTasks'
})
export class CompletedTasksPipe implements PipeTransform {

  transform(allTasks: Task[]): Task[] {
    return allTasks.filter(task => task.completedAt)
  }
}
