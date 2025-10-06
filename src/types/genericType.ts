export type Route = {
  method: string;
  path: string;
  handler: (req: any, res: any) => void; 
};

export type logger ={
  status : number;
  method : string;
  path : string;
}

export interface loggerInterface {
  (info: logger) : void;
}


