import { Directive, ElementRef, Input } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[searchDebouncer]'
})
export class SearchDebouncerDirective {
  @Input() minLength = 3;

  constructor(private elRef: ElementRef) { }

  getInputValue(): Observable<string> {
    return fromEvent(this.elRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        map((event: any) => event.target.value),
        filter(text => text.length > this.minLength),
        distinctUntilChanged()
      )
  }
}
