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
