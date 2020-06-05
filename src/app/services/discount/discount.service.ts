import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Discount } from 'src/app/models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  public getDiscounts() :Observable<any> {
    return this.http.get("http://localhost:8080/api/discount/");
  }

  public createDiscount(discount: Discount) {
    return this.http.post("http://localhost:8080/api/discount/", discount);
  }

  public deleteDiscount(id) {
    return this.http.delete("http://localhost:8080/api/discount/" + id);
  }

  public updateDiscount(id: number, discount: Discount) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/discount/", discount, {params: urlParams})
  }
}
