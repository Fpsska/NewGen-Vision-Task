class UserService {
  _username = "";
  _password = "";

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  set username(value) {
    this._username = value;
  }

  get username() {
    return this._username;
  }

  set password(value) {
    this._password = value;
  }

  get password() {
    return "You are not allowed to get password";
  }

  static authenticateUser(userData) {
    const { username, password } = userData;
    console.log(userData);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const URL = `https://jsonplaceholder.typicode.com/${username}?_limit=${password}`;

      xhr.open("GET", URL);
      xhr.responseType = "json";

      xhr.onload = () => {
        // handle some network errors
        if (xhr.status >= 400) {
          console.log(
            `FAILED: code ${xhr.status}, readyState ${xhr.readyState}`
          );
          reject(xhr.response);
        } else {
          console.log(
            `SUCCESS: code ${xhr.status}, readyState ${xhr.readyState}`
          );
          resolve(xhr.response);
        }
      };

      xhr.onerror = () => {
        // handle some XMLHttpRequest errors
        reject("Some error of XMLHttpRequest");
      };

      xhr.send();
    });
  }
}

const buttonEl = document.getElementById("button");
const formEl = document.getElementById("form");
const nameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const buttonOnClick = async () => {
  const usernameValue = nameInput.value;
  const passwordValue = passwordInput.value;

  try {
    const res = new UserService(usernameValue, passwordValue);
    const fetchedData = await UserService.authenticateUser(res);
    console.log(fetchedData);
  } catch (err) {
    console.log(err);
  }
};

buttonEl.addEventListener("click", buttonOnClick);
formEl.addEventListener("submit", (e) => e.preventDefault());
