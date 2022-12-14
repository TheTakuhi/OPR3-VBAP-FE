import { Component, OnInit } from '@angular/core';
import {Motorcycle} from './motorcycle';
import {MotorcycleService} from './motorcycle.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html',
  styleUrls: ['./motorcycle.component.css']
})
export class MotorcycleComponent implements OnInit {
  public motorcycles: Motorcycle[];
  public editMotorcycle: Motorcycle;
  public deleteMotorcycle: Motorcycle;

  constructor(private motorcycleService: MotorcycleService) { }

  ngOnInit() {
    this.getMotorcycles();
  }

  public getMotorcycles(): void {
    this.motorcycleService.getMotorcycles().subscribe(
      (response: Motorcycle[]) => {
        this.motorcycles = response;
        console.log(this.motorcycles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMotorcycle(addForm: NgForm): void {
    document.getElementById('add-motorcycle-form').click();
    this.motorcycleService.addMotorcycle(addForm.value).subscribe(
      (response: Motorcycle) => {
        console.log(response);
        this.getMotorcycles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMotorcycle(motorcycle: Motorcycle): void {
    this.motorcycleService.updateMotorcycle(motorcycle).subscribe(
      (response: Motorcycle) => {
        console.log(response);
        this.getMotorcycles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMotorcycle(motorcycleId: number): void {
    this.motorcycleService.deleteMotorcycle(motorcycleId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMotorcycles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMotorcycles(key: string): void {
    console.log(key);
    const results: Motorcycle[] = [];
    for (const motorcycle of this.motorcycles) {
      if (motorcycle.brand.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || motorcycle.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || motorcycle.price
        || motorcycle.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(motorcycle);
      }
    }
    this.motorcycles = results;
    if (results.length === 0 || !key) {
      this.getMotorcycles();
    }
  }

  public onOpenModal(motorcycle: Motorcycle, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMotorcycleModal');
    }
    if (mode === 'edit') {
      this.editMotorcycle = motorcycle;
      button.setAttribute('data-target', '#updateMotorcycleModal');
    }
    if (mode === 'delete') {
      this.deleteMotorcycle = motorcycle;
      button.setAttribute('data-target', '#deleteMotorcycleModal');
    }
    container.appendChild(button);
    button.click();
  }
}

