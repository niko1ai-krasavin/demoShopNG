import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardModeratorComponent } from './board/board-moderator.component';
import { CategoryComponent } from './manage-category/category.component';
import { ColorComponent } from './manage-color/color.component';
import { DiscountComponent } from './manage-discount/discount.component';
import { ManufacturerComponent } from './manage-manufacturer/manufacturer.component';
import { MaterialComponent } from './manage-material/material.component';
import { SizeComponent } from './manage-size/size.component';
import { TypeComponent } from './manage-type/type.component';
import { ProductComponent } from './manage-product/product.component';



const managerRoutes: Routes = [
  {
    path: '', component: BoardModeratorComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'category', component: CategoryComponent },
          { path: 'color', component: ColorComponent },
          { path: 'discount', component: DiscountComponent },
          { path: 'manufacturer', component: ManufacturerComponent },
          { path: 'material', component: MaterialComponent },
          { path: 'size', component: SizeComponent },
          { path: 'type', component: TypeComponent },
          { path: 'product', component: ProductComponent},
          { path: '', redirectTo: 'category', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(managerRoutes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
