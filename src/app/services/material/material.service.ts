import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from 'src/app/objects/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  public getMaterials() :Observable<any> {
    return this.http.get("http://localhost:8080/api/material/");
  }

  public createMaterial(material: Material) {
    return this.http.post("http://localhost:8080/api/material/", material);
  }

  public deleteMaterial(id) {
    return this.http.delete("http://localhost:8080/api/material/" + id);
  }

  public updateMaterial(id: number, material: Material) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/material/", material, {params: urlParams})
  }
}
