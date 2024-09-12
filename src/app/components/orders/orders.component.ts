import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  orders: FormGroup = this._FormBuilder.group( {
    details: [null],
    phone: [null, [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null]
  } )

  cartId:string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( {
      next: (params)=>{
        console.log(params);
        this.cartId = params.get('id');
      }
    } )
  }
  
  orderSubmit():void {
    console.log(this.orders.value);
    this._OrdersService.checkOut(this.cartId , this.orders.value).subscribe( {
      next: (res)=>{
        console.log(res);
        if (res.status == 'success') {
          // res.session.url ;
          window.open(res.session.url , '_self')
        }
      },
      error: (err)=>{
        console.log(err);
      }
    } )
  }
}
