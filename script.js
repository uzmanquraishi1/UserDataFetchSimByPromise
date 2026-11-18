const result = document.getElementById("result");
const status = document.getElementById("status");
const button = document.getElementById("fetchBtn");
function getUsers() {
  // In this function we will fetch users data from API.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failing in fetch users data....");
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 2000);
  });
}

function fetchUsers() {
  // It this function we will call getUsers() function and print result in result div container.
  button.disabled = true;
  status.innerHTML = "Loading... Please wait for a while...";
  result.innerHTML = "";
  getUsers()
    .then((users) => {
      status.innerHTML = "Data fetched successfully!";

      users.forEach((user, index) => {
        setTimeout(
          () => {
            result.innerHTML += `
            <div class="user">
                <b>Name:</b> ${user.name}<br>
                <b>Email:</b> ${user.email}<br>
                <b>City:</b> ${user.address.city}<br>
                <b>Company:</b> ${user.company.name}
            </div>
        `;
          },
          (index + 1) * 1000,
        );
      });
    })
    .catch((error) => {
      status.innerHTML = "Error fetching data: " + error.message;
    })
    .finally(() => {
      button.disabled = false;
    });
}
