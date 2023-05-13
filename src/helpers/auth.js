const getIsAdmin = (userDetails) => userDetails["custom:role"] == "admin"

const getIsSuperAdmin = (userDetails) => userDetails["custom:role"] == "superadmin"

export {
  getIsAdmin,
  getIsSuperAdmin
}