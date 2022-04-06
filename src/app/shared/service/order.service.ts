import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../model/meal';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private Http: HttpClient) {}
  cartArray: Meal[] = [];
  orderarray: Meal[] = [];
  uniqueOrder: Meal[] = [];

  addorder(meal: Meal) {
    let found = (element: any) => element.id === meal.id;

    if (this.orderarray.some(found)) {
      var index = this.uniqueOrder.findIndex((x) => x.id == meal.id);
      this.orderarray.push(meal);
      this.uniqueOrder[index].count++;
    } else {
      meal.count = 1;
      this.orderarray.push(meal);
      this.uniqueOrder.push(meal);
    }
  }
  additemtochart(product: Meal): Meal[] {
    var index = this.cartArray.findIndex((x) => x.id == product.id);
    if (index === -1) {
      this.cartArray.push(product);
    }
    const res = this.cartArray;
    console.log(res);
    return res;
  }
  addQty(meal: Meal) {
    meal.count++;
    this.orderarray.push(meal);
  }
  decQty(meal: Meal) {
    const index = this.orderarray.findIndex((element) => element.id == meal.id);
    meal.count--;
    this.orderarray.splice(index, 1);
    if (meal.count == 0) {
      const index = this.uniqueOrder.findIndex(
        (element) => element.id == meal.id
      );
      this.uniqueOrder.splice(index, 1);
    }
  }
  deleteMeal(meal: Meal) {
    const index = this.uniqueOrder.findIndex(
      (element) => element.id == meal.id
    );
    this.uniqueOrder.splice(index, 1);
    for (var i = this.orderarray.length - 1; i >= 0; i--) {
      if (this.orderarray[i].id == meal.id) {
        this.orderarray.splice(i, 1);
      }
    }
    meal.count = 0;
  }
  DeleteOrder() {
    this.orderarray.length = 0;
    this.uniqueOrder.length = 0;
  }
}
