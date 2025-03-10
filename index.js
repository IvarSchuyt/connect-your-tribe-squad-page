import express from "express";

const url = "https://whois.fdnd.nl/api/v1/squad/";

// Maak een nieuwe express app
const app = express();

// Stel in hoe we express gebruiken
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Maak een route voor de index
app.get("/", (request, response) => {
  console.log(request.query.squad);

  let slug = request.query.squad || "squad-b-2022";
  let orderBy = request.query.orderBy || "name";
  let squadUrl = url + slug + "?orderBy=" + orderBy + "&direction=ASC";

  fetchJson(squadUrl).then((data) => {
    response.render("index", data);
  });
});

// Stel het poortnummer in en start express
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}
