import request from "../utils/request";

export function login(username, password) {

  return request({
    url: "/login",
    method: "post",
    data: {
      username, password
    }
  })

}


export function logout() {

  return request({
    url: "/logout",
    method: "get",
  })

}


export function getOperatorInfo(uid) {
  return request({
    url: "/getOperatorInfo",
    method: "get",
    params: {
      uid
    }
  })

}


export function getOperatorList(currentPage, pageSize, sortBy = "", sort = "", status = '', role = "", searchBy = "", searchValue = "", startTime = "", endTime = "") {
  return request({
    url: "/Operator",
    method: "get",
    params: {
      searchBy,
      searchValue,
      startTime,
      endTime,
      sortBy,
      sort,
      status,
      role,
      currentPage,
      pageSize,
    }
  })
}


export function changeOperatorRole(uid, rid) {
  return request({
    url: "/changeOperatorRole",
    method: "put",
    data: {
      rid, uid
    }
  })

}

export function getOperatorPermission() {
  return request({
    url: "/getMenuPermission",
    method: "get"
  })

}






