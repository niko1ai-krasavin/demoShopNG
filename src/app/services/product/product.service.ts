import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/objects/product';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getProducts() :Observable<any> {
    return this.http.get("http://localhost:8080/api/product");
  }

  public createProduct(product: Product) {
    return this.http.post("http://localhost:8080/api/product", product);
  }

  public deleteProduct(id) {
    return this.http.delete("http://localhost:8080/api/product/" + id);
  }

  public updateProduct(id: number, product: Product) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/product/", product, {params: urlParams})
  }
}
