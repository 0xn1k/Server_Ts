import http from "http";
// MY OWN SERVER AT SCALE

type Route = {
  method: string;
  path: string;
  handler: (req: any, res: any) => void;
};


function myOwnServer(){

    const routes : Route[] = [];

    function get(path: string ,handler :(req:http.IncomingMessage, res:http.ServerResponse)=>void){
        console.log("Registering GET route:", path);
        console.log("Current routes:", routes);
        console.log("methods", routes.map(r=>r.method));
        routes.push({path, method: "GET", handler});
        console.log("Updated routes:", routes);
    }

    function handler(req:http.IncomingMessage, res :http.ServerResponse) {
        const route = routes.find(
       (r: Route) => r.method === req.method && r.path === req.url);   
        if (route) {
        route.handler(req, res);
        } else {
        res.statusCode = 404;
        res.end('Not Found');
        }
  }

  // Start server
  function listen(port : number, callback : ()=>void) {
    console.log("Starting server on port", port);
    console.log("Registered routes:", routes);
    const server = http.createServer(handler);
    server.listen(port, callback);
  }

  return { get, listen };


}

const app = myOwnServer();

app.get('/', (req, res) => {
  console.log("hiii")
  res.statusCode = 200;
  res.end('Hello from custom mini-framework 🚀');
});

app.get('/test', (req, res) => {
  console.log("hiii")
  res.statusCode = 200;
  res.end('Hello from custom mini-framework 🚀');
});

app.listen(3000, () => console.log('Server running on port 3000'));