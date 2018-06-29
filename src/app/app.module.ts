import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';// Controlling forms in Angular
import { HttpClientModule } from '@angular/common/http';//HTTP requests
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';//It is used for Angular Bootstrap
import { MessageComponent } from './message/message.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

//Services to declare on providers
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostProductComponent } from './post-product/post-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';




@NgModule({
  declarations: [ //Components that are in our app
    AppComponent, HomeComponent, MessageComponent, RegistrationComponent, LoginComponent, ProfileComponent, SettingsComponent, AddressComponent, CategoriesComponent, PostProductComponent, MyProductsComponent, CategoryComponent, ProductComponent
  ],
  imports: [ //List of dependencies that are inside of our app
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [ RestApiService, DataService, AuthGuardService],//List of services that will be using in out app
  bootstrap: [AppComponent]//List of bootstrap components
})
export class AppModule { }
