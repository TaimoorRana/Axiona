
import {of as observableOf,  Observable } from 'rxjs';

export class MockAuthenticationService {
    public loggedIn = true;
    heartbeat (): Observable<any>  {
        return observableOf({ loggedIn: this.loggedIn });
      }
}
