import http from "http";

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);


const requestListener = (req:http.IncomingMessage, res:http.ServerResponse)=>{
  console.log(req.url);

  res.setHeader("Content-Type", "application/json");
  switch(req.url){
    case "/books":
      res.writeHead(200);
      res.end(books);
      return;
    case "/authors":
      res.writeHead(200);
      res.end(authors);
      return;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({message: "Resource not found"}));
      return;
  }
}
const server = http.createServer(requestListener)



server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})