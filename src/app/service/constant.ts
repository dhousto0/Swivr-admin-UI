import {environment} from '../../environments/environment';

export const API_ENDPOINT_URL = environment.BASE_URL + environment.API_VERSION;

export const API = {
  LOGIN: API_ENDPOINT_URL + '/admin/admin/login',
  RESET_PASSWORD: API_ENDPOINT_URL + '/admin/admin/resetPassword',
  PROFILE_VIEW: API_ENDPOINT_URL + '/admin/admin/adminProfile',
  PROFILE_UPDATE: API_ENDPOINT_URL + '/admin/admin/updateAdminProfile',
  IMAGE_UPLOAD: API_ENDPOINT_URL + '/admin/admin/imageUpdate',
  SERVICE_LIST: API_ENDPOINT_URL + '/appointments/defaultServices/list',
  SERVICE_ADD: API_ENDPOINT_URL + '/appointments/defaultServices/add',
  SERVICE_UPDATE: API_ENDPOINT_URL + '/appointments/defaultServices/update',
  TRANSACTION_HISTORY: API_ENDPOINT_URL + '/admin/transactionHistory',
  SERVICE_DELETE: API_ENDPOINT_URL + '/appointments/defaultServices/delete',
  SERVICE_IMAGES_LIST: API_ENDPOINT_URL + '/appointments/defaultServices/images/list',
  COSMETOLOGIST_LIST: API_ENDPOINT_URL + '/admin/getCosmetologistList',
  COSMETOLOGIST_DETAILS: API_ENDPOINT_URL + '/admin/cosmetologistDetails',
  GET_APPOINTMENT_LIST: API_ENDPOINT_URL + '/admin/appointmentList',
  CLIENT_LIST: API_ENDPOINT_URL + '/admin/getCustomerList',
  CLIENT_DETAILS: API_ENDPOINT_URL + '/admin/getCustomerDetails',
  GET_CLIENT_APPOINTMENT_LIST: API_ENDPOINT_URL + '/admin/appointmentList',
  PAYOUT_DETAILS: API_ENDPOINT_URL + '/admin/getPayoutDetails',
  ADD_UPDATE_PAYOUT: API_ENDPOINT_URL + '/admin/addUpdatePayout',
  ADD_UPDATE_EMAIL_TEMPLATE: API_ENDPOINT_URL + '/admin/updateEmailTemplate',
  DELETE_EMAIL_TEMPLATE: API_ENDPOINT_URL + '/admin/deleteEmailTemplate',
  GET_EMAIL_TEMPLATE: API_ENDPOINT_URL + '/admin/getEmailTemplate',
  ADD_NATIONAL_HOLIDAY: API_ENDPOINT_URL + '/appointments/admin/addNationalHolidays',
  UPDATE_NATIONAL_HOLIDAY: API_ENDPOINT_URL + '/appointments/admin/updateNationalHolidays',
  REMOVE_NATIONAL_HOLIDAY: API_ENDPOINT_URL + '/appointments/admin/removeNationalHolidays',
  NATIONAL_HOLIDAY_LIST: API_ENDPOINT_URL + '/appointments/admin/listNationalHolidays',
  DEFAULT_EMAIL_TEMPLATE: API_ENDPOINT_URL + '/admin/getDefaultEmailTemplate'
};


export const EStatusCode = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FAILURE: 404,
};
