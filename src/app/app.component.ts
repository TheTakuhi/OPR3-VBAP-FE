import {Component, OnInit} from '@angular/core';
import {Car} from "./cars/car";
import {CarService} from "./cars/car.service";
import {HttpErrorResponse} from "@angular/common/http";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public cars: Car[];
  public editCar: Car;
  public deleteCar: Car;

  constructor(private carService: CarService){}

  ngOnInit() {
    this.getCars();
  }

  public getCars(): void{
    this.carService.getCars().subscribe((response: Car[]) => {this.cars = response; console.log(this.cars);},
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }

  public onAddCar(addForm: NgForm): void {
    document.getElementById('add-car-form').click();
    this.carService.addCars(addForm.value).subscribe(
      (response: Car) => {
        console.log(response);
        this.getCars();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCar(car: Car): void {
    this.carService.updateCars(car).subscribe(
      (response: Car) => {
        console.log(response);
        this.getCars();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCar(carId: number): void {
    this.carService.deleteCars(carId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCars();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCars(key: string): void {
    console.log(key);
    const results: Car[] = [];
    for (const car of this.cars) {
      if (car.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(car);
      }
    }
    this.cars = results;
    if (results.length === 0 || !key) {
      this.getCars();
    }
  }

  public onOpenModal(car: Car, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCar = car;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCar = car;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}
