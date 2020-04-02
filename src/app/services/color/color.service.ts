import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from 'src/app/objects/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  public getColors() :Observable<any> {
    return this.http.get('http://localhost:8080/api/color');
  }

  public createColor(color :Color) {
    return this.http.post("http://localhost:8080/api/color/", color);
  }

  public deleteColor(id) {
    return this.http.delete("http://localhost:8080/api/color/" + id);
  }

  public updateColor(id: number, color: Color) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/color/", color, {params: urlParams})
  }
}
