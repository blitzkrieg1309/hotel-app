import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    let savedReservation = localStorage.getItem('saveReservation');
    this.reservations = savedReservation ? JSON.parse(savedReservation) : [];
  }

  // CRUD
  getReservations(): Reservation[] {
    return this.reservations;
  }

  // Add
  addReservation(reservation: Reservation): void {
    reservation.id = Date.now();
    this.reservations.push(reservation);
    localStorage.setItem('saveReservation', JSON.stringify(this.reservations));
  }

  // get reservation by ID
  getReservation(id: number): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  // update
  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(
      (res) => res.id === updatedReservation.id
    );
    this.reservations[index] = updatedReservation;
    localStorage.setItem('saveReservation', JSON.stringify(this.reservations));
  }

  // delete
  deleteReservation(id: number): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }

    localStorage.setItem('saveReservation', JSON.stringify(this.reservations));
  }
}
