import request from "../utils/request";

export function liveRate(params) {
  request({
    url: "/live_rate",
    method: "get",
    params
  })
}
