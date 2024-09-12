import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { ICategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);


  categoriesDetails:ICategory[] = [];

 ngOnInit(): void {
  this._CategoriesService.getAllCategories().subscribe( {
    next: (res)=>{
      console.log(res.data);
      this.categoriesDetails = res.data;
    },
    error: (err)=>{
      console.log(err);
    }
  } )
 }
}
