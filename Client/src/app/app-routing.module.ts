import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {IndexComponent} from './index/index.component';
import {CatalogComponent } from './catalog/catalog.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'shopping', component: ShoppingCartComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
  
}
