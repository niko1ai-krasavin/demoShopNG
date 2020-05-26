import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Discount } from 'src/app/objects/discount';
import { DiscountService } from 'src/app/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedDiscount: Discount;
  discounts: Array<Discount>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: DiscountService) {
    this.discounts = new Array<Discount>()
  }

  ngOnInit() {
    this.loadDiscounts();
  }

  private loadDiscounts() {
    this.service.getDiscounts().subscribe(
      (data: Discount[]) => {
        this.discounts = data;
      })
  }

  addDiscount() {
    this.editedDiscount = new Discount(0, 0);
    this.discounts.push(this.editedDiscount)
    this.isNewRecord = true;
  }

  editDiscount(discount: Discount) {
    this.editedDiscount = new Discount(discount.id, discount.discountValue);
  }

  loadTemplate(discount: Discount) {
    if (this.editedDiscount && this.editedDiscount.id == discount.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveDiscount() {
    if (this.isNewRecord) {
      this.service.createDiscount(this.editedDiscount).subscribe(
        (data: Discount[]) => {
          ; (this.statusMessage = 'Данные успешно добавлены'), this.discounts = data
        })
      this.isNewRecord = false;
      this.editedDiscount = null;
    } else {
      this.service.updateDiscount(this.editedDiscount.id, this.editedDiscount).subscribe(
        (data: Discount[]) => {
          ; (this.statusMessage = 'Данные успешно обновлены'), this.discounts = data
        })
      this.editedDiscount = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.discounts.pop();
      this.isNewRecord = false;
    }
    this.editedDiscount = null;
  }

  deleteDiscount(discount: Discount) {
    this.service.deleteDiscount(discount.id).subscribe(
      (data: Discount[]) => {
        ; (this.statusMessage = "Data deleted successfully"), this.discounts = data
      })
  }

}
