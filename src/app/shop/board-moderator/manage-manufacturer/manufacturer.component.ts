import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Manufacturer } from 'src/app/models/manufacturer';
import { ManufacturerService } from 'src/app/services/manufacturer/manufacturer.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedManufacturer: Manufacturer;
  manufacturers: Array<Manufacturer>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private service: ManufacturerService) {
    this.manufacturers = new Array<Manufacturer>()
  }

  ngOnInit() {
    this.loadManufacturers();
  }

  private loadManufacturers() {
    this.service.getManufacturers().subscribe(
      (data: Manufacturer[]) => {
        this.manufacturers = data;
      })
  }

  addManufacturer() {
    this.editedManufacturer = new Manufacturer(0, '');
    this.manufacturers.push(this.editedManufacturer)
    this.isNewRecord = true;
  }

  editManufacturer(manufacturer: Manufacturer) {
    this.editedManufacturer = new Manufacturer(manufacturer.id, manufacturer.name);
  }

  loadTemplate(manufacturer: Manufacturer) {
    if (this.editedManufacturer && this.editedManufacturer.id == manufacturer.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveManufacturer() {
    if (this.isNewRecord) {
      this.service.createManufacturer(this.editedManufacturer).subscribe(
        (data: Manufacturer[]) => {
          ; (this.statusMessage = 'Data added successfully'), this.manufacturers = data
        })
      this.isNewRecord = false;
      this.editedManufacturer = null;
    } else {
      this.service.updateManufacturer(this.editedManufacturer.id, this.editedManufacturer).subscribe(
        (data: Manufacturer[]) => {
          ; (this.statusMessage = 'Data updated successfully'), this.manufacturers = data
        })
      this.editedManufacturer = null;
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.manufacturers.pop();
      this.isNewRecord = false;
    }
    this.editedManufacturer = null;
  }

  deleteManufacturer(manufacturer: Manufacturer) {
    this.service.deleteManufacturer(manufacturer.id).subscribe(
      (data: Manufacturer[])=> {
        ; (this.statusMessage = "Data deleted successfully"), this.manufacturers = data
      })
  }
}
