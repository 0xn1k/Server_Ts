import http from "http";
import { MyServerRequest } from "../types/requestType";

export function jsonPareser(req:MyServerRequest, res:http.ServerResponse, next: ()=>void){
  let body = '';
  console.log("Inside JSON parser middleware");
  if(req.headers['content-type'] === 'application/json'){
    req.on('data', chunk => {
      body += chunk.toString(); 
    });
    req.on('end', ()=>{
      try{
        req.body = JSON.parse(body);
      } catch (e){
        req.body = {};
        return;
      }
      next();
    })
    next();
    
  }
  else{
    next();
  }
}


