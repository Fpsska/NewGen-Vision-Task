class UserService {
  var username;
  var password;

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get username() {
    return UserService.username;
  }

  get password() {
    throw "You are not allowed to get password";
  }

  static authenticate_user() {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://examples.com/api/user/authenticate?username=" +
        UserService.username +
        "&password=" +
        UserService.password,
      true
    );
    xhr.responseType = "json";

    const result = false;

    xhr.onload = function () {
      if (xhr.status !== "200") {
        result = xhr.response;
      } else {
        result = true;
      }
    };

    return result;
  }
}

$("form #login").click(function () {
  var username = $("#username");
  var password = $("#password");

  var res = UserService(username, password).authenticate_user();

  if (res == true) {
    document.location.href = "/home";
  } else {
    alert(res.error);
  }
});
