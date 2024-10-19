import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const openCloseModalAnimation = trigger('openCloseModal', [
  state(
    'open',
    style({
      transform: 'translateY(0)',
      opacity: 1,
    })
  ),
  state(
    'close',
    style({
      transform: 'translateY(100%)',
      opacity: 0,
    })
  ),
  transition('open => close', [animate('0.3s ease-in')]),
  transition('close => open', [animate('0.3s ease-out')]),
]);

export const openCloseHiddenSidebar = trigger('openCloseSidebar', [
  state(
    'open',
    style({
      transform: 'translateX(0%)',
      opacity: 1,
      right: 0,
    })
  ),
  state(
    'close',
    style({
      transform: 'translateX(100%)',
      opacity: 0,
    })
  ),
  transition('open => close', [animate('0.3s ease-in')]),
  transition('close => open', [animate('0.3s ease-out')]),
]);
