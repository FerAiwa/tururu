import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, filter, takeWhile, tap } from 'rxjs/operators';

import { WorkSessionStore } from '../_stores/worksession.store';
import { Task } from 'src/app/core/core.models';

interface TimerConfig {
  minsTimebox: number,
}

@Component({
  selector: 'tu-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
/** If the component is initialized with a timebox, it will start a countdown. Otherwise, it will count forwards until user stops. */
export class TimerComponent implements OnInit {
  task: Task;
  config: TimerConfig = {
    minsTimebox: null,
  }

  ellapsedMins = 0;
  ellapsedSecs = 0;
  stopFlag = false;

  secTick = interval(1000).pipe(takeWhile(() => !this.stopFlag));

  hour: Observable<number>;
  min: Observable<number>;
  sec: Observable<number>;

  constructor(private wsStore: WorkSessionStore) {
    this.task = this.wsStore.task || { name: 'Hello world, ain´t no time for mocks!' };
    this.config.minsTimebox = this.wsStore.timebox || 20;
  }

  stopSession() {
    this.stopFlag = true;
    this.wsStore.stopWorkSession().subscribe(
      () => 'ws properly closed!',
      (e) => console.log(e)
    )
  }

  ngOnInit() {
    const { minsTimebox } = this.config;
    minsTimebox ? this.countdown(minsTimebox) : this.countForward()
  }

  /** 
   * Starts a countdown that will keep running until it reaches 0 or secTick completes.
   * @param mins Provided by the user.
   */
  countdown(mins: number) {
    let minsLeft = mins;
    const secCounter = this.secTick.pipe(
      takeWhile(x => minsLeft >= 0),
      tap({
        next: (s) => "",
        error: () => { },
        complete: () => console.log('TIMEOUT! at ', this.ellapsedMins - 1)
      })
    )
    this.sec = secCounter.pipe(
      tap(s => this.ellapsedSecs++),
      map(s => 59 - s % 60)
    ); //ellapsed secs in min

    this.min = secCounter.pipe(
      filter(this.isMinFirstSec),
      map(s => {
        this.ellapsedMins++;
        minsLeft--;
        if (minsLeft < 60) return minsLeft > 0 ? minsLeft : 0;
        return (59 - s / 60) % 60; //ellapsed mins in hours.
      })
    );

    this.hour = secCounter.pipe(
      filter(this.isHourFirstSec),
      map(s => minsLeft > 60 ? Math.trunc(minsLeft / 60) : 0)
    );
  }

  /** Initializes a time counter that will keep running until secTick completes  */
  countForward() {
    this.sec = this.secTick.pipe(
      map(sec => sec % 60)
    );
    this.min = this.secTick.pipe(
      filter(this.isMinFirstSec),
      map(sec => {
        const min = sec / 60;
        return min < 59 ? min : min % 60;
      })
    );
    this.hour = this.secTick.pipe(
      filter(this.isHourFirstSec),
      map(sec => sec / 3600)
    );
  }

  isHourFirstSec(s: number) {
    return s % 3600 === 0;
  }

  isMinFirstSec(s: number) {
    return s % 60 === 0;
  }

  stopTimer() {
    console.log('Time up!');
  }


  onTogglePlay() {
  }
}
