import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000';
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  // CRUD

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations  ');
  }

  // Add
  addReservation(reservation: Reservation): Observable<void> {
    // reservation.id = Date.now().toString();
    // this.reservations.push(reservation);
    return this.http.post<void>(`${this.apiUrl}/reservation/`, reservation);
  }

  // get reservation by ID
  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  // getReservation(id: string): Observable<Reservation> {
  //   return this.http
  //     .get<Reservation[]>(`${this.apiUrl}/reservation/${id}`)
  //     .pipe(
  //       map((reservations) => reservations[0]) // Ambil elemen pertama dari array
  //     );
  // }

  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    // let index = this.reservations.findIndex((res) => res.id === id);

    // if (index !== -1) {
    //   // Pastikan ID lama tetap dipertahankan
    //   updatedReservation.id = id;

    //   // Perbarui data pada array
    //   this.reservations[index] = updatedReservation;
    // }
    return this.http.put<void>(
      `${this.apiUrl}/reservation/`,
      updatedReservation
    );
  }

  // delete
  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reservation/${id}`);

    // let index = this.reservations.findIndex((res) => res.id === id);
    // if (index !== -1) {
    //   this.reservations.splice(index, 1);
    // }
  }
}
