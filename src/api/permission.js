import request from "../utils/request";


export function setRoleMenuPermission(rid, name, status) {
  return request({
    url: "/setRoleMenuPermission",
    method: "post",
    data: {
      rid, name, status
    }
  })

}

export function setRoleApiPermission(rid, key, status) {
  return request({
    url: "/setRoleApiPermission",
    method: "post",
    data: {
      rid, key, status
    }
  })

}

export function getMenuPermission() {
  return request({
    url: "/getMenuPermission",
    method: "get"
  })
}

export function setMenuPermission(data) {
  return request({
    url: "/setMenuPermission",
    method: "post",
    data: {data}
  })

}

export function getAPIPermissionByMenu(menu) {
  return request({
    url: "/getAPIPermissionByMenu",
    method: "get",
    params: {
      menu
    }
  })

}

export function setAPIPermissionByMenu(data) {
  return request({
    url: "/setAPIPermissionByMenu",
    method: "post",
    data: {
      data
    }
  })

}


export function deleteAPIPermissionByMenu(ap_id) {
  return request({
    url: "/deleteAPIPermissionByMenu",
    method: "delete",
    params: {
      ap_id
    },
  })

}
