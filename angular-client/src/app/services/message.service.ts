import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: String[] = [];

  constructor() { }

  /**
   * Add message to the cache
   * @param {string} message
   * @memberof MessageService
   */
  add(message: String) {
    this.messages.push(message);
    console.log(message);
  }

  /**
   * Clear messages from the cache
   * @memberof MessageService
   */
  clear() {
    this.messages = [];
  }

  notify(message: String) {
    // todo open errors modal
    this.messages.push(message);
  }


}
