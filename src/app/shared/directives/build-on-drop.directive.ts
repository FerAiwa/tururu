import { Directive, Output, ElementRef, HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Generates array of task objects, based
 * on text dropped in the component.
 */
@Directive({
  selector: '[dropToTask]'
})
export class BuildOnDropDirective {
  @HostListener('dragover', ['$event'])
  allow(event) {
    event.preventDefault();
  }

  @Output() afterDrop =
    fromEvent(this.elRef.nativeElement, 'drop')
      .pipe(
        map((event: any) => {
          const rawText = event.dataTransfer.getData("text")
          if (rawText) return this.mapTextToTask(rawText);
        })
      )

  constructor(private elRef: ElementRef) { }

  mapTextToTask(text) {
    return text.split('\n')
      .filter(x => !x.match(/^\r/))
      .map(x => x = x.replace(/\r/, "") && x.trim())
      .map(x => ({ name: x }))
  }

}

