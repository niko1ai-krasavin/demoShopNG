import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Type } from 'src/app/objects/type';
import { TypeService } from 'src/app/services/type/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedType: Type;
  types: Array<Type>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: TypeService) {
    this.types = new Array<Type>()
  }

  ngOnInit() {
    this.loadTypes();
  }

  private loadTypes() {
    this.service.getTypes().subscribe(
      (data: Type[]) => {
        this.types = data;
      })
  }

  addType() {
    this.editedType = new Type(0, '');
    this.types.push(this.editedType)
    this.isNewRecord = true;
  }

  editType(category: Type) {
    this.editedType = new Type(category.id, category.name);
  }

  loadTemplate(type: Type) {
    if (this.editedType && this.editedType.id == type.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveType() {
    if (this.isNewRecord) {
      this.service.createType(this.editedType).subscribe(
        (data: Type[]) => {
          ; (this.statusMessage = 'Данные успешно добавлены'), this.types = data
        })
      this.isNewRecord = false;
      this.editedType = null;
    } else {
      this.service.updateType(this.editedType.id, this.editedType).subscribe(
        (data: Type[]) => {
          ; (this.statusMessage = 'Данные успешно обновлены'), this.types = data
        })
      this.editedType = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.types.pop();
      this.isNewRecord = false;
    }
    this.editedType = null;
  }

  deleteType(type: Type) {
    this.service.deleteType(type.id).subscribe(
      (data: Type[]) => {
        ; (this.statusMessage = "Data deleted successfully"), this.types = data
      })
  }

}
