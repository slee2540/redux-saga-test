import * as type from "actions/type/list";

export const requestApi = () => ({
  type: type.REQUEST_API
});

export const requestApiSuccess = () => ({
  type: type.REQUEST_API_SUCCESS
});

// export const requestApi = data => ({
//   type: type.REQUEST_API,
//   payload: {
//     data
//   }
// });

// export const requestApiSuccess = data => ({
//   type: type.REQUEST_API_SUCCESS,
//   payload: {
//     data
//   }
// });
