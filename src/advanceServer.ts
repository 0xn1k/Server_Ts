import http from "http";
import { MyServerRequest } from "./types/requestType";
import { jsonPareser } from "./middleware/jsonPareser";
import { Route , logger , loggerInterface } from "./types/genericType";

function myOwnServer(){

    const routes : Route[] = [];
    const middlewares : ((req:MyServerRequest, res:http.ServerResponse, next: ()=>void)=>void)[] = [];

    function get(path: string ,handler :(req:MyServerRequest, res:http.ServerResponse)=>void){
        routes.push({path, method: "GET", handler});
    }
    
    function post(path:string , handler : (req:MyServerRequest , res: http.ServerResponse)=>void){
        routes.push({path, method: "POST", handler});
    }

    function put(path:string , handler : (req:MyServerRequest , res: http.ServerResponse)=>void){
        routes.push({path, method: "PUT", handler});
    }

    function del(path:string , handler : (req:MyServerRequest , res: http.ServerResponse)=>void){
        routes.push({path, method: "DELETE", handler});
    } 

    function handler(req:MyServerRequest, res :http.ServerResponse) {
      let idx = 0;
      function next(){
        const middleware = middlewares[idx];
        idx++;
        if(middleware){
          middleware(req, res, next);
        } else {
          processRequest(req, res);
        }
      }
      next();
    
     function processRequest(req:MyServerRequest, res:http.ServerResponse){
        console.log("Request received:", req.method, req.url);
        const route = routes.find((r: Route) => r.method === req.method && r.path === req.url);   
        if (route) {
        route.handler(req, res);
        logger({status: res.statusCode, method: req.method, path: req.url} as logger)
        } else {
        logger({status: 404, method: req.method, path: req.url} as logger)
        res.statusCode = 404;
        res.end('Not Found');
        }
      }
    }

    function use(middleware: (req:MyServerRequest, res:http.ServerResponse, next: ()=>void)=>void)  {
      middlewares.push(middleware);
    }

    const logger : loggerInterface = (info: logger) => {
      const log = `[${new Date().toISOString()}] ${info.method} ${info.path} - ${info.status}`;
      console.log(log);
    }

  function listen(port : number, callback : ()=>void) {
    const server = http.createServer(handler);
    server.listen(port, callback);
  }
  return { get, listen ,post , put , del  , use };
}

const app = myOwnServer();

app.use(jsonPareser);
app.get('/', (req, res) => {
  res.statusCode = 200;
  res.end('Hello from / directory 🚀');
});
app.get('/test', (req, res) => {
  res.statusCode = 200;
  res.end('Hello from /test route 🚀');
});

app.put('/test-put', (req, res) => {
  res.statusCode = 200;
  res.end('PUT request received');
});

app.post('/test-post', (req, res) => {
 console.log('Request Body:', req.body);
  res.statusCode = 200;
  res.end('POST request received');
});

app.del('/test-delete', (req, res) => {
  res.statusCode = 200;
  res.end('DELETE request received');
});

app.listen(3000, () => console.log('Server running on port 3000'));
