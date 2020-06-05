import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/category';
import { TemplateRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedCategory: Category;
  categories: Array<Category>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: CategoryService) {
    this.categories = new Array<Category>()
  }

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories() {
    this.service.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      })
  }

  addCategory() {
    this.editedCategory = new Category(0, '');
    this.categories.push(this.editedCategory)
    this.isNewRecord = true;
  }

  editCategory(category: Category) {
    this.editedCategory = new Category(category.id, category.name);
  }

  loadTemplate(category: Category) {
    if (this.editedCategory && this.editedCategory.id == category.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveCategory() {
    if (this.isNewRecord) {
      this.service.createCategory(this.editedCategory).subscribe(
        (data: Category[]) => {
          ; (this.statusMessage = 'Данные успешно добавлены'), this.categories = data
        })
      this.isNewRecord = false;
      this.editedCategory = null;
    } else {
      this.service.updateCategory(this.editedCategory.id, this.editedCategory).subscribe(
        (data: Category[]) => {
          ; (this.statusMessage = 'Данные успешно обновлены'), this.categories = data
        })
      this.editedCategory = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.categories.pop();
      this.isNewRecord = false;
    }
    this.editedCategory = null;
  }

  deleteCategory(category: Category) {
    this.service.deleteCategory(category.id).subscribe(
      (data: Category[]) => {
        ; (this.statusMessage = "Data deleted successfully"), this.categories = data
      })
  }



}
