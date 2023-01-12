export const regEmail =
  /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

export const regPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

export const regId = /^[a-zA-z0-9]{4,12}$/;

export const regName = /^[가-힣]+$/;
