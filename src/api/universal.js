import request from "../utils/request";


/**
 * 胡起诉
 * @param type
 * @returns {AxiosPromise}
 */
export function getSearchParameters(type) {

  return request({
    url: "get_search_parameters",
    method: "get",
    params: {
      type
    }
  })


}
