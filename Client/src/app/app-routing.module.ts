import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {IndexComponent} from './index/index.component';
import {CatalogComponent } from './catalog/catalog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UsersWishListComponent } from './users-wish-list/users-wish-list.component';
import { AllWishListComponent } from './all-wish-list/all-wish-list.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { NewCollectionComponent } from './new-collection/new-collection.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { DMCAComponent } from './dmca/dmca.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'shopping', component: ShoppingCartComponent},
  {path: 'userWishList', component: UsersWishListComponent},
  {path: 'allWishList', component: AllWishListComponent},
  {path: 'manageAccount', component: ManageAccountsComponent},
  {path: 'ManageProducts', component: ManageProductsComponent},
  {path: 'NewCollection', component: NewCollectionComponent},
  {path: 'policy', component: PrivacyPolicyComponent},
  {path: 'dmca' , component: DMCAComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
  
}
