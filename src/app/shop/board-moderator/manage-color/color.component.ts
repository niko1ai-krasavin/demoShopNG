import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedColor: Color;
  colors: Array<Color>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: ColorService) {
    this.colors = new Array<Color>()
  }

  ngOnInit() {
    this.loadColors();
  }

  private loadColors() {
    this.service.getColors().subscribe(
      (data: Color[]) => {
        this.colors = data;
      })
  }

  addColor() {
    this.editedColor = new Color(0, '');
    this.colors.push(this.editedColor)
    this.isNewRecord = true;
  }

  editColor(color: Color) {
    this.editedColor = new Color(color.id, color.name);
  }

  loadTemplate(color: Color) {
    if (this.editedColor && this.editedColor.id == color.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveColor() {
    if (this.isNewRecord) {
      this.service.createColor(this.editedColor).subscribe(
        (data: Color[]) => {
          ; (this.statusMessage = 'Данные успешно добавлены'), this.colors = data
        })
      this.isNewRecord = false;
      this.editedColor = null;
    } else {
      this.service.updateColor(this.editedColor.id, this.editedColor).subscribe(
        (data: Color[]) => {
          ; (this.statusMessage = 'Данные успешно обновлены'), this.colors = data
        })
      this.editedColor = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.colors.pop();
      this.isNewRecord = false;
    }
    this.editedColor = null;
  }

  deleteColor(color: Color) {
    this.service.deleteColor(color.id).subscribe(
      (data: Color[]) => {
        ; (this.statusMessage = "Data deleted successfully"), this.colors = data
      })
  }

}
