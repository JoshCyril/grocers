import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './models/user.model';
import { Category } from './models/category.model';
import { Product } from './models/product.model';
import { Order } from './models/order.model';
import { Wishlist } from './models/wishlist.model';
import { UserDB } from './models/userDB.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:3000/api/";
  dbUser: string = "user";
  dbCategory: string = "category";
  dbOrder: string = "order";
  dbWishlist: string = "wishlist";

  // ! Users

  loginUser(name: string, email: string, password: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "login" + "?name=" + name + "&email=" + email + "&password=" + password);
  }
  chkUserExist(): Observable<UserDB[]> {
    return this.http.get<UserDB[]>(this.baseUrl + "reg");
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "all" + "?_db=" + this.dbUser);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }
  removeUserById(id: string) {
    return this.http.delete(this.baseUrl + "remove/" + id + "?_db=" + this.dbUser);
  }
  addUser(user: User) {
    return this.http.post(this.baseUrl + "add/user", user);
  }
  modifyUser(user: User, id: string) {
    return this.http.put(this.baseUrl + "modify/" + id + "?_db=" + this.dbUser, user);
  }
}
