import { Component, OnInit } from '@angular/core';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: any;

  myReview ={
    title: '',
    description: '',
    rating: 0
  };

  btnDisabled = false;

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res =>{
      this.rest.get(`http://localhost:3800/api/product/${res['id']}`)
        .then(data =>{
          data['success']
            ? (this.product = data['product'])
            : this.router.navigate(['/']);
        }).catch(error => this.data.error(error['message']));
    });
  }

  async postReview(){
    this.btnDisabled = true;
    try{
      const data = await this.rest.post(
        'http://localhost:3800/api/review',
        {
          productId: this.product._id,
          title: this.myReview.title,
          description: this.myReview.description,
          rating: this.myReview.rating
        }
      );
      data['success']
        ? this.data.success(data['message'])
        : this.data.error(data['message']);

    }catch(error){
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  addToCart(){
    this.data.addToCart(this.product)
      ? this.data.success('Product successfully added to cart :)')
      : this.data.error('Product has already been added to cart ;)'); 
  }

}
