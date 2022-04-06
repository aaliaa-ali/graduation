import { Component,OnInit } from '@angular/core';
import { Category } from '../shared/model/category';
import { Meal } from '../shared/model/meal';
import { FavouriteService } from '../shared/service/favourite.service';
import { MealService } from '../shared/service/meal.service';
import { OrderService } from '../shared/service/order.service';

@Component({
  selector: 'app-meal-page',
  templateUrl: './meal-page.component.html',
  styleUrls: ['./meal-page.component.css']
})
export class MealPageComponent implements OnInit {
  SelectedMeal!:Meal
  Category!:Category

  constructor(private MealService:MealService,
    private OrderService:OrderService ,
    private FavouriteService:FavouriteService) { }

  ngOnInit(): void {
    this.SelectedMeal=this.MealService.SelectedMeal
  }
  addorder(mymeal:any){
    this.OrderService.addorder(mymeal);
  }
  
  addFavourite(mymeal:any)
  {
    if(localStorage.getItem('toke')){
      let data={id:mymeal.id}
      console.log(data)
       this.FavouriteService.sendfev(data).subscribe(
         (next)=>{console.log(next)},
         (error)=>{console.log(error)}
       );      
    }else{
      this.FavouriteService.addToLocalFev(mymeal);    }
  }
}
