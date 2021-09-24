const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MzI0Nzc3NTIsImV4cCI6MTYzMzY4NzM1Mn0.9NJdKWnPDGZUZcD28LDoMrAcw3lklr7M35Ufxptp_1o";
const apiUrl = "https://striveschool-api.herokuapp.com/api/movies";
let categories = [];
let movies = {};
///API Functions
const getCategories = async () => {
  try {
    apiResponse = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MzI0Nzc3NTIsImV4cCI6MTYzMzY4NzM1Mn0.9NJdKWnPDGZUZcD28LDoMrAcw3lklr7M35Ufxptp_1o`,
        },
      }
    );
    if (apiResponse.status === 200) {
      let result = await apiResponse.json();
      console.log(result);
      result.forEach((category) => {
        categories.push(category);
      });
    } else if (apiResponse.status > 400 && apiResponse.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResponse.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    console.error(err);
  }
};

const getMovies = async (category) => {
  movies[category] = [];
  console.log(category);
  try {
    apiResponse = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies" + category,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MzI0Nzc3NTIsImV4cCI6MTYzMzY4NzM1Mn0.9NJdKWnPDGZUZcD28LDoMrAcw3lklr7M35Ufxptp_1o`,
        },
      }
    );
    if (apiResponse.status === 200) {
      let result = await apiResponse.json();
      console.log(result);
      result.forEach((movie) => movies[category].push(movie));
    }
  } catch (err) {
    console.error(err);
  }
};

const newMovie = async (event) => {
  event.preventDefault();
  let newMovieData = {
    name: document.getElementById("movieTitle").value,
    description: document.getElementById("movieDescription").value,
    category: document.getElementById("movieCategory").value.toLowerCase(),
    imageUrl: document.getElementById("movieImageUrl").value,
  };
  try {
    apiResponse = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(newMovieData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      let result = await apiResponse.json();
      makeLists();
      console.log(result);
    } else if (apiResponse.status > 400 && apiResponse.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResponse.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    console.error(err);
  }
};

const editMovie = async (data) => {
  try {
    apiResponse = await fetch(apiUrl + category, {
      method: "POST",
      body: JSON.stringify(newMovieData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MzI0Nzc3NTIsImV4cCI6MTYzMzY4NzM1Mn0.9NJdKWnPDGZUZcD28LDoMrAcw3lklr7M35Ufxptp_1o`,
      },
    });
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      let result = await apiResponse.json();
      makeLists();
      console.log(result);
    } else if (apiResponse.status > 400 && apiResponse.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResponse.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteMovie = async (query) => {
  try {
    apiResponse = await fetch(apiUrl + query, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MzI0Nzc3NTIsImV4cCI6MTYzMzY4NzM1Mn0.9NJdKWnPDGZUZcD28LDoMrAcw3lklr7M35Ufxptp_1o`,
      },
    });
    console.log(apiResponse);
    if (apiResponse.status === 200) {
      let result = await apiResponse.json();
      console.log(result);
      makeLists();
    } else if (apiResponse.status > 400 && apiResponse.status < 500) {
      throw new Error("Client Side Error");
    } else if (apiResponse.status > 500) {
      throw new Error("Server Side Error");
    }
  } catch (err) {
    console.error(err);
  }
};
/// Local Functions
const displayAlert = (text, seconds) => {};

const clearInputFields = () => {
  document.getElementById("movieTitle").value = "";
  document.getElementById("movieDescription").value = "";
  document.getElementById("movieCategory").value = "";
  document.getElementById("movieImageUrl").value = "";
};

const prepareMovies = async () => {
  for (category of categories) {
    await getMovies(category);
  }
};
const makeLists = async () => {
  categories = [];
  movies = {};
  await getCategories();
  await prepareMovies();
  displayCategoriesOffice();
  console.log(movies);
};
const displayCategoriesOffice = () => {
  let categorySelectors = document.getElementById("pills-tab");
  categorySelectors.innerHTML = "";
  let categoryLists = document.getElementById("pills-tabContent");
  categoryLists.innerHTML = "";
  for (category of categories) {
    categorySelectors.innerHTML += `<li class="dropdown-item">
        <a
          class="nav-link"
          id="pills-${category}-tab"
          data-toggle="pill"
          href="#pills-${category}"
          role="tab"
          aria-controls="pills-${category}"
          aria-selected="true"
          >${category.toUpperCase()}</a
        >
      </li>`;
    categoryLists.innerHTML += `<div
      class="tab-pane fade"
      id="pills-${category}"
      role="tabpanel"
      aria-labelledby="pills-${category}-tab"
    >
      <div class="row">
        <h3>${category.toUpperCase()}</h3>
        <table class="table table-striped table-dark text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">View Details</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody id="${category + "Table"}">
          </tbody>
        </table>
      </div>
    </div>`;
  }
  for (movie in movies) {
    for (let i = 0; i < movies[movie].length; i++) {
      let tableOfCategory = document.getElementById(
        `${movies[movie][i].category + "Table"}`
      );
      tableOfCategory.innerHTML += `
    <tr>
      <th scope="row">${movies[movie][i]._id}</th>
      <td>${movies[movie][i].name}</td>
      <td>${movies[movie][i].category}</td>
      <td><a href="detailspage?${movies[movie][i]._id}"><button class="btn btn-success">View Details</button></a></td>
      <td><button id="${movies[movie][i]._id}" class="btn btn-danger" onclick="deleteMovie(this.id)">Delete</button></td>
    </tr>`;
    }
  }
};

const displayMovies = (data) => {};

/// Window onload

window.onload = () => {
  makeLists();
};
