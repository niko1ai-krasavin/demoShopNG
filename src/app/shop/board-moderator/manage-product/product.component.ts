import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product/product.service';

import { Product } from 'src/app/objects/product';
import { Discount } from 'src/app/objects/discount';
import { Category } from 'src/app/objects/category';
import { Manufacturer } from 'src/app/objects/manufacturer';
import { Color } from 'src/app/objects/color';
import { Material } from 'src/app/objects/material';
import { Size } from 'src/app/objects/size';
import { Type } from 'src/app/objects/type';

import { CategoryService } from 'src/app/services/category/category.service';
import { ColorService } from 'src/app/services/color/color.service';
import { DiscountService } from 'src/app/services/discount/discount.service';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { SizeService } from 'src/app/services/size/size.service';
import { TypeService } from 'src/app/services/type/type.service';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product(0, "", 0, 0, "", null, null, null, null, null, null, null);

  products: Array<Product>;

  categories: Array<Category>;
  colors: Array<Color>;
  discounts: Array<Discount>;
  manufacturers: Array<Manufacturer>;
  selectedMaterials: Array<Material> = new Array<Material>();
  materials: Array<Material> = new Array<Material>();
  sizes: Array<Size>;
  types: Array<Type>;

  statusMessage: string;

  constructor(
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
    this.loadProducts();
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

  loadProducts() {
    let resp = this.serviceProduct.getProducts();
    resp.subscribe((data: Product[]) => this.products = data);
  }

  onChange(id: number, name: string, isChecked: boolean) {
    if (isChecked) {
      let newMaterial = new Material(id, name);
      this.selectedMaterials.push(newMaterial);
    }
  }


  saveProduct(productNameNg: NgModel, productCategoryNg: NgModel, productTypeNg: NgModel, productManufacturerNg: NgModel,
    productColorNg: NgModel, productSizeNg: NgModel, productQuantityInStockNg: NgModel, productDiscountNg: NgModel,
    productPriceNg: NgModel, productDescriptionNg: NgModel) {


    let selectedCategory: Category = this.categories[(parseInt(productCategoryNg.value) - 1)];
    let selectedType: Type = this.types[(parseInt(productTypeNg.value) - 1)];
    let selectedManufacturer: Manufacturer = this.manufacturers[(parseInt(productManufacturerNg.value) - 1)];
    let selectedColor : Color = this.colors[(parseInt(productColorNg.value) - 1)];
    let selectedSize : Size = this.sizes[(parseInt(productSizeNg.value) - 1)];
    let selectedDiscount : Discount = this.discounts[(parseInt(productDiscountNg.value) - 1)];


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


    this.serviceProduct.createProduct(this.product).subscribe(
      data => {
        ; (this.statusMessage = 'Данные успешно добавлены')
      })
  }

  deleteProduct(product: Product) {
    this.serviceProduct.deleteProduct(product.id).subscribe(
      data => {
        ; (this.statusMessage = "Data deleted successfully"), this.loadProducts()
      })
  }

  cancel() {
    this.preLoadOptions();
  }

  editProduct(product: Product) {

    //this.statusMessage = "" + product.id + " " + product.name + " " + product.category + " "
  }

  addProduct() {
    //null;
  }
}
