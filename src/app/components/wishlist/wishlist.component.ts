import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CurrencyPipe , TermtextPipe,TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ToastrService = inject(ToastrService);

  products: IProduct[] = [];
  wishListData: string = "";

  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.products = res.data;
        const newData = res.data.map((item: any) => item._id)
        this.wishListData = newData;
      }
    })
  }

  favoriteProduct(id: string | null): void {
    this._WishlistService.addProductToWishlist(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishListData = response.data;
        this._WishlistService.wishListNumber.next(response.data.length)
      }
    })
  }
  removeProduct(id: string | null): void {
    this._WishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this.wishListData = res.data;
        this._WishlistService.wishListNumber.next(res.data.length);

        const newProdData = this.products.filter((item: any) => this.wishListData.includes(item._id));

        this.products = newProdData;
      }
    })
  }

addProduct(id:any):void{
  this._CartService.addProductToCart(id).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success(res.message);
      this._CartService.cartNumber.next(res.numOfCartItems)
    }
})
}}
