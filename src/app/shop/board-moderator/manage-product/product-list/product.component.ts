import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product/product.service';

import { Product } from 'src/app/objects/product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<Product>;

  statusMessage: string;

  constructor(private serviceProduct: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    let resp = this.serviceProduct.getProducts();
    resp.subscribe((data: Product[]) => this.products = data);
  }

  deleteProduct(product: Product) {
    this.serviceProduct.deleteProduct(product.id).subscribe(
      data => {
        ; (this.statusMessage = "Data deleted successfully"), this.loadProducts()
      })
  }
}
