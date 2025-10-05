import http from "http";
// MY OWN SERVER AT SCALE

type Route = {
  method: string;
  path: string;
  handler: (req: any, res: any) => void; 
};

type logger ={
  status : number;
  method : string;
  path : string;
}

interface loggerInterface {
  (info: logger) : void;
}


function myOwnServer(){

    const routes : Route[] = [];

    function get(path: string ,handler :(req:http.IncomingMessage, res:http.ServerResponse)=>void){
        routes.push({path, method: "GET", handler});
    }
    
    function post(path:string , handler : (req:http.IncomingMessage , res: http.ServerResponse)=>void){
        routes.push({path, method: "POST", handler});
    }

    function put(path:string , handler : (req:http.IncomingMessage , res: http.ServerResponse)=>void){
        routes.push({path, method: "PUT", handler});
    }

    function del(path:string , handler : (req:http.IncomingMessage , res: http.ServerResponse)=>void){
        routes.push({path, method: "DELETE", handler});
    } 

    function handler(req:http.IncomingMessage, res :http.ServerResponse) {
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

    const logger : loggerInterface = (info: logger) => {
      const log = `[${new Date().toISOString()}] ${info.method} ${info.path} - ${info.status}`;
      console.log(log);
    }

  function listen(port : number, callback : ()=>void) {
    const server = http.createServer(handler);
    server.listen(port, callback);
  }
  return { get, listen ,post , put , del };
}

const app = myOwnServer();
app.get('/', (req, res) => {
  res.statusCode = 200;
  res.end('Hello from custom mini-framework 🚀');
});
app.get('/test', (req, res) => {
  res.statusCode = 200;
  res.end('Hello from custom mini-framework 🚀');
});

app.put('/test-put', (req, res) => {
  res.statusCode = 200;
  res.end('PUT request received');
});

app.post('/test-post', (req, res) => {
  res.statusCode = 200;
  res.end('POST request received');
});

app.del('/test-delete', (req, res) => {
  res.statusCode = 200;
  res.end('DELETE request received');
});

app.listen(3000, () => console.log('Server running on port 3000'));
