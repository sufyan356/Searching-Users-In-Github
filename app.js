let formSubmission = document.getElementById("formSubmission");
let submitBtn = document.getElementById("submitBtn");
let viewOnGithubPage = document.getElementById("viewOnGithub");

let getUserProfileInfo = (username) => {
  return fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error("User not found");
    });
};

let viewOnGithub = (username) => {
  console.log(username)
  location.href = `https://github.com/${username}`
  // var user = (`https://github.com/${username}`);
  // location.href = user;
};

let displayUserData = (userData) => {
  let usernameElement = document.getElementById("username");
  let followersElement = document.getElementById("followers");
  let followingElement = document.getElementById("following");
  let repoElement = document.getElementById("repo");
  let usersPicture = document.getElementById("usersImage");

  usernameElement.innerHTML = userData.login;
  followersElement.innerHTML = userData.followers;
  followingElement.innerHTML = userData.following;
  repoElement.innerHTML = userData.public_repos;
  usersPicture.src = userData.avatar_url;

  viewOnGithubPage.addEventListener("click", (event) =>
    viewOnGithub(userData.login)
  );
};

let search = async (event) => {
  event.preventDefault();
  let searchUsersName = document
    .getElementById("searchUsersName")
    .value.trim();

  if (!searchUsersName) {
    swal({
      title: "Empty Field!",
      text: "Please Fill Input Field!",
      icon: "error",
      button: "OK",
    });
    return;
  }

  try {
    let userData = await getUserProfileInfo(searchUsersName);
    displayUserData(userData);
  } catch (error) {
    swal({
      title: "User Not Found!",
      text: "User Doesn't Exist",
      icon: "error",
      button: "OK",
    });
  }
};

submitBtn.addEventListener("click", search);