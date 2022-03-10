import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/app/shared/model/meal';
import { MealService } from 'src/app/shared/service/meal.service';

@Component({
  selector: 'app-special-dishes',
  templateUrl: './special-dishes.component.html',
  styleUrls: ['./special-dishes.component.css']
})
export class SpecialDishesComponent implements OnInit {

  SpecialMeal!:any
  constructor(private MealService:MealService,private router:Router) { }

  ngOnInit(): void {
    this.MealService.getAll().subscribe(meals=>{
      this.SpecialMeal=meals
      this.SpecialMeal.slice(0,2)
    });

  }
  freg(reserve:string)
  {
    this.router.navigateByUrl('#'+reserve);
  }

}
