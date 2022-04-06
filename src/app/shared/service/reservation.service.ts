import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Meal } from '../model/meal';
import { Reservation } from '../model/reservation';
import { OrderService } from './order.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  paymentLoading = new Subject<boolean>();
  ReservationChecked = new Subject<boolean>();
  reservationData = new Subject<Reservation>();
  SendData: any[] = [];

  TableCheck(data: Reservation) {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('toke') ?? '',
    });
    return this.Http.post<Reservation>(environment.Api + 'get-table', data, {
      headers,
    });
  }
  ColectData(data: Reservation) {
    this.SendData.push(data);
    console.log(this.SendData);
  }
  saveReservation(order: Meal[], price: any) {
    if (this.SendData[0]?.table_id) {
      this.loadStripe(price);
      this.SendData.splice(1);
      this.SendData.push(order, price);
    } else {
      this.router.navigateByUrl('#' + 'reserve');
    }
  }

  GetUserReservation() {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('toke') ?? '',
    });
    return this.Http.get<Reservation>(environment.Api + 'get-reservation', {
      headers,
    });
  }
  loadStripe(amount: number) {
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KX58pBmVrP9kTEPu5BezVgAPsbulPVD70Pd8OkRf0TXE6E4BgoyEJw0qATrbRp9ymZMPtqmhkWQqN5a0RHQnKRY00Zb43DjCN',
      locale: 'auto',
      token: (token: any) => {
        this.payment(token.id, amount);
      },
    });
    handler.open({
      amount: amount,
      name: 'Resto Restautant',
      currency: 'egp',
    });
  }

  payment(token: any, amount: number) {
    this.paymentLoading.next(true);

    let data = { token: token, price: amount };
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('toke') ?? '',
    });
    this.Http.post(environment.Api + `payment`, data, { headers }).subscribe(
      (next) => {
        this.Http.post<Reservation>(
          environment.Api + 'reserve',
          this.SendData,
          { headers }
        ).subscribe((ResData) => {
          this.OrderService.DeleteOrder();
          this.SendData.length = 0;
          this.ReservationChecked.next(true);
        });
      }
    );
  }
  constructor(
    private Http: HttpClient,
    private OrderService: OrderService,
    private router: Router
  ) {}
}
