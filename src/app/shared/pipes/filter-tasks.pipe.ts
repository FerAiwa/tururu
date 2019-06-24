import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'src/app/core/core.models';

type filterModes = 'all' | 'not';

@Pipe({
  name: 'filterTasks',
  pure: false, //will trigger the filter anytime the data changes. Warning, may lead to performance issues.
})
//This Pipe allows to filter tasks by some specific property, compairing with another array that holds the values to filter.
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], filterValues?: string[], filterMode: filterModes = 'all', key = '_id', ): any {
    console.log('filtering');

    if (!tasks.length) return tasks;

    const getAllmatches = filterMode === 'all' ? true : false;

    return tasks.filter(task => filterValues.includes(task[key]) === getAllmatches);
  }

}
