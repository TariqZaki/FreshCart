import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
private readonly _BrandsService = inject(BrandsService);

brands:IBrands [] = [];

ngOnInit(): void {
  this._BrandsService.getAllBrands().subscribe( {
    next: (res)=>{
      console.log(res);
      this.brands = res.data;
    },
    error: (err)=>{
      console.log(err);
    }
  } )
}


}
