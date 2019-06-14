import { Observable, BehaviorSubject } from 'rxjs';
export abstract class Store<T> {

  state$: Observable<T>;
  private subject$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this.subject$ = new BehaviorSubject(initialState);
    this.state$ = this.subject$.asObservable();
  }

  get state(): T {
    return this.subject$.getValue();
  }

  setState(nextState: T): void {
    this.subject$.next(nextState);
  }

}
