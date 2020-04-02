import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category} from '../../objects/category';


@Injectable(
  {providedIn: 'root'}
  )
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getCategories() :Observable<any> {
    return this.http.get("http://localhost:8080/api/category");
  }

  public createCategory(category: Category) {
    return this.http.post("http://localhost:8080/api/category", category);
  }

  public deleteCategory(id) {
    return this.http.delete("http://localhost:8080/api/category/" + id);
  }

  public updateCategory(id: number, category: Category) {
    const urlParams = new HttpParams().set('id', id.toString())
    return this.http.put("http://localhost:8080/api/category/", category, {params: urlParams})
  }
}
