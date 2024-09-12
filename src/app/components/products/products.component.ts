import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,TermtextPipe,TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);

  productDetails : IProduct [] = [] ;
  wishListDetails: string[] = [];

  ngOnInit(): void {

    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        const newData = res.data.map((item: any) => item._id)
        this.wishListDetails = newData;
        console.log(res);
      }
    });

    this._ProductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.productDetails = res.data; 
  }
})
  }
 favoriteProduct(id: string | null): void {
    this._WishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
     
        this._ToastrService.success(res.message);
        this.wishListDetails = res.data;
        this._WishlistService.wishListNumber.next(res.data.length)
      }
    })
  }
  removeProduct(id: string | null): void {
    this._WishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.wishListDetails = res.data;
        this._WishlistService.wishListNumber.next(res.data.length)
      }
    })
  }

  addProduct(id:string):void {
    this._CartService.addProductToCart(id).subscribe({
  
      next:(res)=>{
        this._ToastrService.success(res.message,'Fresh Cart')
        this._CartService.cartNumber.next(res.numOfCartItems
        )
  console.log(this._CartService.cartNumber);
  
      },
      error:(err)=>{
        console.log(err);
  
      }
    })
  }

}
