import * as type from "actions/type/list";

export const requestApi = () => ({
  type: type.REQUEST_API
});

export const requestApiSuccess = () => ({
  type: type.REQUEST_API_SUCCESS
});
