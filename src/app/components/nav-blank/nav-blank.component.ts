import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  readonly _AuthService = inject(AuthService);
  readonly _CartService = inject(CartService);
  readonly _WishlistService = inject(WishlistService);
  private readonly _MytranslateService = inject(MytranslateService);
   readonly _TranslateService = inject(TranslateService);


 countNum:number = 0;
 wishListNum:number = 0;
 


change(lang:string):void {
this._MytranslateService.changeLang( lang )
}


 ngOnInit(): void {
     this._CartService.getProductsCart().subscribe({
      next:(res)=>{
        this.countNum=res.numOfCartItems
     }
    })

    this._CartService.cartNumber.subscribe({
      next:(num)=>{
        this.countNum = num
      },
      
    })


    this._WishlistService.wishListNumber.subscribe({
      next:(num)=>{
       console.log(num);
       this.wishListNum=num;     
      }
    })

      this._WishlistService.getLoggedUserWishlist().subscribe({
        next:(res)=>{
          this.wishListNum=res.count;
          console.log(res);
    
        }
      })

 }







}
