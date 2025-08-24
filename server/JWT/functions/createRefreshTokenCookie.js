
//automatically applyes cookie when called. sends cookie automatically
export function createFrefreshTokenCookie(res, refreshToken){ 

  res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //TODO: CHANGE THIS IN PRODUCTION. your site should be only on https not http
      sameSite: "none",
      path: "/jwt/refresh"
    })

}