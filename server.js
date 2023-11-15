const http = require("http");
const url = require("url");
const fs = require("fs");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;

  if (path === "/") {
    // Serve your login page
    fs.readFile("login.html", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (path === "/login" && req.method === "POST") {
    // Handle login form submission
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const params = querystring.parse(body);

      // Check username and password (replace this with your authentication logic)
      if (params.username === "user" && params.password === "password") {
        res.writeHead(302, { Location: "/dashboard" });
        res.end();
      } else {
        res.writeHead(302, { Location: "/" });
        res.end();
      }
    });
  } else if (path === "/dashboard") {
    // Dashboard route (replace this with your dashboard logic)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Dashboard!");
  } else {
    // Handle other routes
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
