import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SizeService } from 'src/app/services/size/size.service';
import { Size } from 'src/app/objects/size';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedSize: Size;
  sizes: Array<Size>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: SizeService) {
    this.sizes = new Array<Size>()
  }

  ngOnInit() {
    this.loadSizes();
  }

  private loadSizes() {
    this.service.getSizes().subscribe(
      (data: Size[]) => {
        this.sizes = data;
      })
  }

  addSize() {
    this.editedSize = new Size(0, '');
    this.sizes.push(this.editedSize)
    this.isNewRecord = true;
  }

  editSize(size: Size) {
    this.editedSize = new Size(size.id, size.name);
  }

  loadTemplate(size: Size) {
    if (this.editedSize && this.editedSize.id == size.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveSize() {
    if (this.isNewRecord) {
      this.service.createSize(this.editedSize).subscribe(
        data => {
          ; (this.statusMessage = 'Данные успешно добавлены'), this.loadSizes()
        })
      this.isNewRecord = false;
      this.editedSize = null;
    } else {
      this.service.updateSize(this.editedSize.id, this.editedSize).subscribe(
        data => {
          ; (this.statusMessage = 'Данные успешно обновлены'), this.loadSizes()
        })
      this.editedSize = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.sizes.pop();
      this.isNewRecord = false;
    }
    this.editedSize = null;
  }

  deleteSize(size: Size) {
    this.service.deleteSize(size.id).subscribe(
      data => {
        ; (this.statusMessage = "Data deleted successfully"), this.loadSizes()
      })
  }

}
