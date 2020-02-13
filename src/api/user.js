import request from "../utils/request";

export function liveRate(params) {
 return  request({
    url: "/live_rate",
    method: "get",
    params
  })
}
