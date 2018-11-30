import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {IndexComponent} from './index/index.component';
import {CatalogComponent } from './catalog/catalog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UsersWishListComponent } from './users-wish-list/users-wish-list.component';
import { AllWishListComponent } from './all-wish-list/all-wish-list.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'shopping', component: ShoppingCartComponent},
  {path: 'userWishList', component: UsersWishListComponent},
  {path: 'allWishList', component: AllWishListComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
  
}
