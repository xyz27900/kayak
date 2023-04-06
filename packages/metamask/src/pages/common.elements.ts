import { dataTestId } from '~/utils';

export const modal = {
  self: '.modal',
  leftButton: 'button.modal-container__footer-button:nth-child(1)',
  rightButton: 'button.modal-container__footer-button:nth-child(2)'
};

export const popover = {
  self: '.popover-content',
  closeButton: dataTestId('popover-close')
};
