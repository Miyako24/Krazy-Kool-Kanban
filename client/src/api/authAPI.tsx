import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  const { username, password } = userInfo;
  const url = `/auth/login`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  console.log('data', data);

  const { token } = data;

  if (token) {
    localStorage.setItem("id_token", token); // Store JWT token
    return token;
  } else {
    throw new Error("No token received");
  }
};

export { login };