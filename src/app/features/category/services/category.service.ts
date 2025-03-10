import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  addCategory(model: AddCategoryRequest): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Category?addAuth=true`, model);
  }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Category`);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Category/${id}`)
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/Category/${id}?addAuth=true`, updateCategoryRequest);
  }

  deleteCategory(id: string): Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Category/${id}?addAuth=true`);
  }
}
