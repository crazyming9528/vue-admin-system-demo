import request from "../utils/request";

export function liveRate(params) {
 return  request({
    url: "/live_rate",
    method: "get",
    params
  })
}


export function getUserList(params) {
  return  request({
    url: "/user",
    method: "get",
    params
  })
}
