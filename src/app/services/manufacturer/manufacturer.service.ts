import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from 'src/app/objects/manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) { }

  public getManufacturers() :Observable<any> {
    return this.http.get("http://localhost:8080/api/manufacturer");
  }

  public createManufacturer(manufacturer: Manufacturer) {
    return this.http.post("http://localhost:8080/api/manufacturer", manufacturer);
  }

  public deleteManufacturer(id) {
    return this.http.delete("http://localhost:8080/api/manufacturer/" + id);
  }

  public updateManufacturer(id: number, manufacturer: Manufacturer) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/manufacturer/", manufacturer, {params: urlParams})
  }
}
