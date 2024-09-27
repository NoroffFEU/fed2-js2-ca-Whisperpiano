// Function to get user logged name

export function getUser() {
  return localStorage.getItem("userName") as string;
}
