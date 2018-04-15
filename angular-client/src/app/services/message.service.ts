import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {

  messages: string[] = [];
  errorMessage: string;

  constructor() { }

  /**
   * Set error message
   *
   * @param {string} message
   * @memberof MessageService
   */
  setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  /**
   * Add message to the cache
   * @param {string} message
   * @memberof MessageService
   */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * Clear messages from the cache
   * @memberof MessageService
   */
  clear() {
    this.messages = [];
  }


}
