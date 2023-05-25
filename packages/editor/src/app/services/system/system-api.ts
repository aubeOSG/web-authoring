import { rq } from '../../services';

const ENDPOINTS = {
  message: '/system/message',
  save: '/system/save',
  open: '/system/open',
};

export const messageDialog = (options: any) => {
  return rq.invoke(ENDPOINTS.message, options as unknown as rq.JSON_DATA);
};

export const saveDialog = (options: any) => {
  return rq.invoke(ENDPOINTS.save, options as unknown as rq.JSON_DATA);
};

export const openDialog = (options: any) => {
  return rq.invoke(ENDPOINTS.save, options as unknown as rq.JSON_DATA);
};

export default {
  messageDialog,
  saveDialog,
  openDialog,
};
