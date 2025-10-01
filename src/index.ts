import http from "http";


const requestListener = (req:http.IncomingMessage, res:http.ServerResponse)=>{
  
  // content type == application/json used for json data
 // res.setHeader("Content-Type", "application/json");
  // content type == text/csv used for csv data
 // res.setHeader("Content-Type", "text/csv");
  // content type == application/pdf used for pdf data
 // res.setHeader("Content-Type", "application/pdf");
  // to download the file instead of displaying it in browser
  //res.setHeader("Content-Disposition", "attachment;filename=test.pdf");
  //res.setHeader("Content-Disposition", "attachment;filename=test.txt");
 // res.setHeader("Content-Disposition", "attachment;filename=testing.pdf");

  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(`<h1>Hello World</h1>`);
}
const server = http.createServer(requestListener)



server.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})