import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Color } from 'src/app/models/color';
import { Discount } from 'src/app/models/discount';
import { Manufacturer } from 'src/app/models/manufacturer';
import { Material } from 'src/app/models/material';
import { Size } from 'src/app/models/size';
import { Type } from 'src/app/models/type';

import { CategoryService } from 'src/app/services/category/category.service';
import { ColorService } from 'src/app/services/color/color.service';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { SizeService } from 'src/app/services/size/size.service';
import { TypeService } from 'src/app/services/type/type.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  idFromURL: number;
  selectedMaterials: Array<Material> = new Array<Material>();

  product: Product = new Product(0, "", 0, 0, "", null, null, null, null, null, null, null);

  categories: Array<Category>;
  colors: Array<Color>;
  discounts: Array<Discount>;
  manufacturers: Array<Manufacturer>;
  materials: Array<Material>;
  sizes: Array<Size>;
  types: Array<Type>;

  statusMessage: string;

  constructor(
    private route: ActivatedRoute,
    private serviceCategory: CategoryService,
    private serviceColor: ColorService,
    private serviceDiscount: DiscountService,
    private serviceManufacturer: ManufacturerService,
    private serviceMaterial: MaterialService,
    private serviceSize: SizeService,
    private serviceType: TypeService,
    private serviceProduct: ProductService
  ) { }

  ngOnInit() {
    this.preLoadOptions();
    this.loadProduct();
    this.selectMaterialsOfProduct();
  }

  preLoadOptions() {
    let respCat = this.serviceCategory.getCategories();
    let respCol = this.serviceColor.getColors();
    let respDis = this.serviceDiscount.getDiscounts();
    let respMan = this.serviceManufacturer.getManufacturers();
    let respMat = this.serviceMaterial.getMaterials();
    let respSiz = this.serviceSize.getSizes();
    let respTyp = this.serviceType.getTypes();

    respCat.subscribe((data: Category[]) => this.categories = data);
    respCol.subscribe((data: Color[]) => this.colors = data);
    respDis.subscribe((data: Discount[]) => this.discounts = data);
    respMan.subscribe((data: Manufacturer[]) => this.manufacturers = data);
    respMat.subscribe((data: Material[]) => this.materials = data);
    respSiz.subscribe((data: Size[]) => this.sizes = data);
    respTyp.subscribe((data: Type[]) => this.types = data);
  }

  loadProduct() {
    this.idFromURL = parseInt(this.route.snapshot.params['id']);
    let resp = this.serviceProduct.getProductById(this.idFromURL);

    //////////////////////////////////////////////////////////?
    resp.subscribe((data: Product) => {
      this.product = data;
      this.product.materials = new Array<Material>();
      ////////////////////////////////////////////////////////
      
      data.materials.forEach(element => {
        this.product.materials.push(new Material(element.id, element.name));
      });
    })
  }

  selectMaterialsOfProduct() {

    let PM : Material[] = this.product.materials;

    PM.forEach(element => {
      this.selectedMaterials.push(new Material(element.id, element.name));
    });
  }

  onChange(id: number, name: string, isChecked: boolean) {
    if (isChecked) {
      let newMaterial = new Material(id, name);
      this.selectedMaterials.push(newMaterial);
    } else {
      let index = this.selectedMaterials.findIndex(item => item.id == id);
      this.selectedMaterials.splice(index, 1);
    }
  }

  checkSelectedMaterials(idMaterial: number) {
    let check = false;
    this.selectedMaterials.forEach(element => {
      if (idMaterial == element.id) {
        check = true;
      }
    });
    return check;
  }


  saveProduct(productNameNg: NgModel, productCategoryNg: NgModel, productTypeNg: NgModel, productManufacturerNg: NgModel,
    productColorNg: NgModel, productSizeNg: NgModel, productQuantityInStockNg: NgModel, productDiscountNg: NgModel,
    productPriceNg: NgModel, productDescriptionNg: NgModel) {

    let selectedCategory: Category = this.categories[(parseInt(productCategoryNg.value) - 1)];
    let selectedType: Type = this.types[(parseInt(productTypeNg.value) - 1)];
    let selectedManufacturer: Manufacturer = this.manufacturers[(parseInt(productManufacturerNg.value) - 1)];
    let selectedColor: Color = this.colors[(parseInt(productColorNg.value) - 1)];
    let selectedSize: Size = this.sizes[(parseInt(productSizeNg.value) - 1)];
    let selectedDiscount: Discount = this.discounts[(parseInt(productDiscountNg.value) - 1)];

    this.product.name = productNameNg.value;
    this.product.quantityInStock = parseInt(productQuantityInStockNg.value);
    this.product.price = parseFloat(productPriceNg.value);
    this.product.description = productDescriptionNg.value;

    this.product.category = selectedCategory;
    this.product.type = selectedType;
    this.product.manufacturer = selectedManufacturer;
    this.product.color = selectedColor;
    this.product.size = selectedSize;
    this.product.discount = selectedDiscount;

    this.product.materials = this.selectedMaterials;

    this.serviceProduct.updateProduct(this.product.id, this.product).subscribe(
      data => {
        ; (this.statusMessage = 'Data changed successfully')
      })
  }
}
