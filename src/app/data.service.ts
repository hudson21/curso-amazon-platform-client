import { Injectable } from '@angular/core';

import { NavigationStart, Router } from '@angular/router';

import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	message = '';
	messageType = 'danger';

	user: any;
	cartItems = 0;//This variable is for to store the products added to our shopping cart

  constructor(private router: Router, private rest:RestApiService){
  	this.router.events.subscribe(event =>{
  		if(event instanceof NavigationStart){
  			this.message = '';
  		}
  	});
  }

  error(message){
  	this.messageType = 'danger';
  	this.message = message;
  }

  success(message){
  	this.messageType ='success';
  	this.message = message;
  }

  warning(message){
  	this.messageType = 'warning';
  	this.message = message;
	}
	
	async getProfile(){
		try{
			if(localStorage.getItem('token')){
				const data = await this.rest.get(
					'http://localhost:3800/api/accounts/profile'
				);
				this.user = data['user'];
			}
		}catch(error){
			this.error(error);
		}
	}

  getCart(){
	const cart = localStorage.getItem('cart');
	return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: string){
	const cart: any = this.getCart();
	//This is for adding items to the shopping cart
	if(cart.find(data => JSON.stringify(data) === JSON.stringify(item))){
		return false;
	}else{
		cart.push(item);
		this.cartItems++;
		localStorage.setItem('cart', JSON.stringify(cart));
		return true;
	}
  }

  clearCart(){
	  this.cartItems = 0;
	  localStorage.setItem('cart', '[]');
  }

  removeFromCart(item: string){
	let cart: any = this.getCart();
	if(cart.find(data => JSON.stringify(data) === JSON.stringify(item))){
		cart = cart.filter(data => JSON.stringify(data) !== JSON.stringify(item));
		this.cartItems--;
		localStorage.setItem('cart', JSON.stringify(cart));
	}
  }

  	

  
}
