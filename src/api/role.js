import request from "../utils/request";


export function getRole() {
  return request({
    url: "/getRole",
    method: "get"
  })

}


export function addRole(data) {
  return request({
    url: "/addRole",
    method: "post",
    data,
  })

}



export function modifyRole(rid, data) {
  return request({
    url: `/modifyRole?rid=${rid}`,
    method: "put",
    data,
  })

}



export function deleteRole(rid) {
  return request({
    url: "/deleteRole",
    method: "delete",
    params: {
      rid
    },
  })

}


export function getRoleInfoById(rid) {
  return request({
    url: "/getRoleInfoById",
    method: "get",
    params: {
      rid,
    }
  })

}
