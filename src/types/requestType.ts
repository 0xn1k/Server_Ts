import { IncomingMessage } from 'http';

export interface MyServerRequest extends IncomingMessage {
  body?: any;
}