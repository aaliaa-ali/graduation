import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Meal } from '../model/meal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  SelectedMeal!: Meal;
  specialDishes=new Subject<Meal[]>()
  getAll(): Observable<Meal[]> {
    return this.Http.get<Meal[]>(environment.Api+'get-meal');
  }
  display(meal: Meal) {
    this.SelectedMeal = meal;
  }
  getById(): Observable<Meal> {
    return this.Http.get<Meal>(
      environment.Api+`get-meal/${this.SelectedMeal.id}`
    );
  }
 
  constructor(private Http: HttpClient) {}
  
}
