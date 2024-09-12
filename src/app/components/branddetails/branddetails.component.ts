import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [],
  templateUrl: './branddetails.component.html',
  styleUrl: './branddetails.component.scss'
})
export class BranddetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService);

  brandId:string | null = '';
  brandDetails: IBrands = {} as IBrands;

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params)=>{
        console.log(params);
        let id = params.get('id');

        this._BrandsService.getSpecificBrands(id).subscribe({
          next: (res)=>{
            console.log(res);
            this.brandDetails  = res.data;
          }
        })
      }
    })
}

}
