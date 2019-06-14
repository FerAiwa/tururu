import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query as q, stagger, AnimationTriggerMetadata } from '@angular/animations';

export function query(s, a, o = { optional: true }) {
  return q(s, a, o)
};
