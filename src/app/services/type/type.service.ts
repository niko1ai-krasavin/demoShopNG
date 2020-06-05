import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from 'src/app/models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  public getTypes() :Observable<any> {
    return this.http.get('http://localhost:8080/api/type');
  }

  public createType(type :Type) {
    return this.http.post("http://localhost:8080/api/type", type);
  }

  public deleteType(id) {
    return this.http.delete("http://localhost:8080/api/type/" + id);
  }

  public updateType(id: number, type: Type) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/type/", type, {params: urlParams})
  }
}
