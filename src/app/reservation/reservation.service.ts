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
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem('saveReservation', JSON.stringify(this.reservations));
  }

  // get reservation by ID
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex((res) => res.id === id);

    if (index !== -1) {
      // Pastikan ID lama tetap dipertahankan
      updatedReservation.id = id;

      // Perbarui data pada array
      this.reservations[index] = updatedReservation;

      // Simpan kembali ke localStorage
      localStorage.setItem(
        'saveReservation',
        JSON.stringify(this.reservations)
      );
    } else {
      console.error(`Reservation with ID ${id} not found.`);
    }
  }

  // delete
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }

    localStorage.setItem('saveReservation', JSON.stringify(this.reservations));
  }
}
