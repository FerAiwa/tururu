import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger, AnimationTriggerMetadata } from '@angular/animations';
// Use: Import the function and attach it setup the trigger & states.
/* export const sliderAnimation: AnimationTriggerMetadata =
  trigger('routeAnimations', [
    transition('HomePage => ProjectBuilder', slideTo('right')),
    transition('ProjectBuilder => HomePage', slideTo('left')),
  ]); */
const baseStyle = {
  position: 'absolute',
  top: '0',
  width: '100%',
  // height: '100%',
  zIndex: 1
}

export const slideLeftAnimation =
  [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [style({ ...baseStyle, left: 0 })],
      { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [animate('300ms ease-out', style({ left: '100%' }))],
        { optional: true }),
      query(
        ':enter', [animate('300ms ease-out', style({ left: 0 }))],
        { optional: true })
    ]),
    // Required only if you have child animations on the page
    query(':leave', animateChild(), { optional: true }),
    query(':enter', animateChild(), { optional: true }),
  ]

export const slideRightAnimation = [
  style({ position: 'relative' }),
  query(
    ':enter, :leave',
    [style({ ...baseStyle, right: 0 })],
    { optional: true }),
  query(':leave', animateChild(), { optional: true }),
  group([
    query(
      ':leave',
      [animate('300ms ease-out', style({ right: '100%' }))],
      { optional: true }),
    query(
      ':enter', [animate('300ms ease-out', style({ right: 0 }))],
      { optional: true })
  ]),
  // Required only if you have child animations on the page
  query(':leave', animateChild(), { optional: true }),
  query(':enter', animateChild(), { optional: true }),
]

