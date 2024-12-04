import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,

  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private fromBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.fromBuilder.group({
      id: [''], // Tambahkan ID di form
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    // cek apakah punya id ?
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    // jika punya id tampilkan data sesuai id
    if (id) {
      this.reservationService.getReservation(id).subscribe((reservation) => {
        if (reservation) this.reservationForm.patchValue(reservation);
      });
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      // cek apakah punya id ?
      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // update
        this.reservationService
          .updateReservation(id, reservation)
          .subscribe(() => {
            console.log('request update process');
          });
      } else {
        // new
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('request add process');
        });
      }

      this.router.navigate(['/list']);
    }
  }
}
