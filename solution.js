class UserService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  get newUsername() {
    return this.username;
  }

  set newUsername(value) {
    this.username = this.username + value;
  }

  get newPassword() {
    return "You are not allowed to get password";
  }

  set newPassword(value) {
    this.password = value;
  }

  static authenticate_user(params) {
    const { username, password } = params;

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

// const buttonOnClick = () => {
//   const usernameValue = nameInput.value;
//   const passwordValue = passwordInput.value;

//   const res = new UserService(usernameValue, passwordValue);

//   UserService.authenticate_user(res)
//     .then((fetchedData) => console.log(fetchedData))
//     .catch((err) => console.log(err));
// };

const buttonOnClick = async () => {
  const usernameValue = nameInput.value;
  const passwordValue = passwordInput.value;

  const res = new UserService(usernameValue, passwordValue);

  try {
    const fetchedData = await UserService.authenticate_user(res);
    console.log(fetchedData);
  } catch (err) {
    console.log(err);
  }
};

buttonEl.addEventListener("click", buttonOnClick);
formEl.addEventListener("submit", (e) => e.preventDefault());
