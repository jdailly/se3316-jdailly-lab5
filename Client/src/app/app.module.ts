import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './auth.service';


import {UserDataBaseService} from './user-data-base.service';
import{  ProductsDataBaseService} from './products-data-base.service';
import { CatalogComponent } from './catalog/catalog.component';
import { HeaderComponent } from './header/header.component';
import {CommentsDataBaseService} from './comments-data-base.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {CartDataBaseService} from './cart-data-base.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {WishListDataBaseService} from './wish-list-data-base.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UsersWishListComponent } from './users-wish-list/users-wish-list.component';
import { AllWishListComponent } from './all-wish-list/all-wish-list.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NewCollectionComponent } from './new-collection/new-collection.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {PolicyDataBaseService} from './policy-data-base.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CatalogComponent,
    HeaderComponent,
    ShoppingCartComponent,
    UsersWishListComponent,
    AllWishListComponent,
    ManageAccountsComponent,
    ManageProductsComponent,
    NewCollectionComponent,
    FooterComponent,
    PrivacyPolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [AuthService,
    UserDataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
