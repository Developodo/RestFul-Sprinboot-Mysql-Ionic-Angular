import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment';
import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HTTP) {}
  /**
   * 
   * @param id is no está presenta realizará un getAll -> http://localhost:8080/item
   * , si existe realizará una selección por ID -> http://localhost:8080/item/id
   */
  public getItem(id?:number | string): Promise<Item[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiItem;
      if(id){
        endpoint+=id;
      }
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if(d) {
            resolve(JSON.parse(d.data));
          }else {
            resolve(null);
          }
        })
        .catch(err => reject(err));
    });
  }
  /**
   * 
   * @param value el criterio de búsqueda por título -> http://localhost:8080/item/search/value
   */
  public searchByTitle(value: string): Promise<Item[] | null>  {
    return this.getItem('search/' + value);
  }
  /**
   * 
   * @param item es un número -> id, item -> item.id
   */
  public removeItem(item: any): Promise<void> {
    const id: any = item.id ? item.id : item;
    const endpoint = environment.endpoint + environment.apiItem + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  public createItem(item: Item): Promise<void> {
    const endpoint = environment.endpoint + environment.apiItem;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }
  public updateItem(item: Item): Promise<void> {
    const endpoint = environment.endpoint + environment.apiItem;
    return new Promise((resolve, reject) => {
      if (item) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, item, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe item');
      }
    });
  }
  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
  }
}
