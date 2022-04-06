import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../shared/model/category';
import { CategoryService } from '../shared/service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories!:any
  constructor(private CategoryService:CategoryService,
    private router:Router) { }

  ngOnInit(): void {
   this.CategoryService.getAll().subscribe(categories=>{
    this.categories=categories
    });
  }

  goMenu(categoryName:string) {
    this.router.navigate(
      ['/menu'],
      { queryParams: { category: categoryName } }
    );
  }



}
