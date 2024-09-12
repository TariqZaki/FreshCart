import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss',
})
export class CategorydetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);

  categoryId:string | null = '';

  categoryDetails:ICategory = {} as ICategory;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        let categoryId = params.get('id');

        this._CategoriesService.getSpecificCategories(categoryId).subscribe({
          next: (res) => {
            console.log(res);
            this.categoryDetails = res.data;
          },
        });
      },
    });
  }
}
