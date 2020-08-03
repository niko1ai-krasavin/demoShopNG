import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Material } from 'src/app/models/material';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedMaterial: Material;
  materials: Array<Material>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: MaterialService) {
    this.materials = new Array<Material>()
  }

  ngOnInit() {
    this.loadMaterials();
  }

  private loadMaterials() {
    this.service.getMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
      })
  }

  addMaterial() {
    this.editedMaterial = new Material(0, '');
    this.materials.push(this.editedMaterial)
    this.isNewRecord = true;
  }

  editMaterial(material: Material) {
    this.editedMaterial = new Material(material.id, material.name);
  }

  loadTemplate(material: Material) {
    if (this.editedMaterial && this.editedMaterial.id == material.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveMaterial() {
    if (this.isNewRecord) {
      this.service.createMaterial(this.editedMaterial).subscribe(
        (data: Material[]) => {
          ; (this.statusMessage = 'Data added successfully'), this.materials = data
        })
      this.isNewRecord = false;
      this.editedMaterial = null;
    } else {
      this.service.updateMaterial(this.editedMaterial.id, this.editedMaterial).subscribe(
        (data: Material[]) => {
          ; (this.statusMessage = 'Data updated successfully'), this.materials = data
        })
      this.editedMaterial = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.materials.pop();
      this.isNewRecord = false;
    }
    this.editedMaterial = null;
  }

  deleteMaterial(material: Material) {
    this.service.deleteMaterial(material.id).subscribe(
      (data: Material[]) => {
        ; (this.statusMessage = "Data deleted successfully"), this.materials = data
      })
  }

}
