import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Size } from 'src/app/objects/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  public getSizes() :Observable<any> {
    return this.http.get("http://localhost:8080/api/size");
  }

  public createSize(size: Size) {
    return this.http.post("http://localhost:8080/api/size", size);
  }

  public deleteSize(id) {
    return this.http.delete("http://localhost:8080/api/size/" + id);
  }

  public updateSize(id: number, size: Size) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/size/", size, {params: urlParams})
  }
}
