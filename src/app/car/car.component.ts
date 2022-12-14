import { Component, OnInit } from '@angular/core';
import {Car} from './car';
import {CarService} from './car.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public cars: Car[];
  public editCar: Car;
  public deleteCar: Car;

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.getCars();
  }

  public getCars(): void {
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        console.log(this.cars);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCar(addForm: NgForm): void {
    document.getElementById('add-car-form').click();
    this.carService.addCar(addForm.value).subscribe(
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
    this.carService.updateCar(car).subscribe(
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
    this.carService.deleteCar(carId).subscribe(
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
      if (car.brand.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.price
        || car.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
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
      button.setAttribute('data-target', '#addCarModal');
    }
    if (mode === 'edit') {
      this.editCar = car;
      button.setAttribute('data-target', '#updateCarModal');
    }
    if (mode === 'delete') {
      this.deleteCar = car;
      button.setAttribute('data-target', '#deleteCarModal');
    }
    container.appendChild(button);
    button.click();
  }
}
