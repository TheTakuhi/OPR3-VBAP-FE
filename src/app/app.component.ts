import {Component, OnInit} from '@angular/core';
import {Car} from "./cars/car";
import {CarService} from "./cars/car.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public cars: Car[] | undefined;

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.getCars();
  }

  public getCars(): void{
    this.carService.getCars().subscribe((response: Car[]) => {this.cars = response},
      (error: HttpErrorResponse) => {alert(error.message);}
    );
  }
}
