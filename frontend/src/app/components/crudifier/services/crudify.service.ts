
/*
 * Copyright(c) Thomas Hansen thomas@servergardens.com, all right reserved
 */

// Angular and system imports.
import { Injectable } from '@angular/core';

// Application specific imports.
import { Crudify } from '../models/crudify.model';
import { LocResult } from '../models/loc-result.model';
import { HttpService } from '../../../services/http.service';

/**
 * Crudify service, allows you to crudify your databases.
 */
@Injectable({
  providedIn: 'root'
})
export class CrudifyService {

  /**
   * Creates an instance of your service.
   * 
   * @param httpService HTTP service to use for backend invocations
   */
  constructor(private httpService: HttpService) { }

  /**
   * Returns all available input reactors from backend.
   */
  public getInputReactor() {

    // Invoking backend and returning observable to caller.
    return this.httpService.get<any[]>('/magic/modules/system/crudifier/input-reactors');
  }

  /**
   * Crudifies a database table for a specified HTTP verb.
   * 
   * @param data Input for process
   */
  public crudify(data: Crudify) {

    // Invoking backend and returning observable to caller.
    return this.httpService.post<LocResult>('/magic/modules/system/crudifier/crudify', data);
  }

  /**
   * Generates an SQL endpoint for a specified HTTP verb.
   * 
   * @param data Input for process
   */
  public generateSqlEndpoint(data: any) {

    // Invoking backend and returning observable to caller.
    return this.httpService.post<Response>('/magic/modules/system/crudifier/custom-sql', data);
  }
}
