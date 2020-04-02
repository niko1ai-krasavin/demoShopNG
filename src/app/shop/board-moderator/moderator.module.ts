import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModeratorRoutingModule } from './moderator-routing.module';

import { BoardModeratorComponent } from './board/board-moderator.component';
import { CategoryComponent } from './manage-category/category.component';
import { ColorComponent } from './manage-color/color.component';
import { DiscountComponent } from './manage-discount/discount.component';
import { ManufacturerComponent } from './manage-manufacturer/manufacturer.component';
import { MaterialComponent } from './manage-material/material.component';
import { SizeComponent } from './manage-size/size.component';
import { TypeComponent } from './manage-type/type.component';
import { ProductComponent } from './manage-product/product.component';



@NgModule({
  declarations: [
    BoardModeratorComponent,
    CategoryComponent,
    ColorComponent,
    DiscountComponent,
    ManufacturerComponent,
    MaterialComponent,
    SizeComponent,
    TypeComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ModeratorRoutingModule,
    FormsModule
  ]
})
export class ModeratorModule { }
