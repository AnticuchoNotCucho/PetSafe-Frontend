import {Component, Inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ReportsService} from "../services/reports.service";
import {PetReportDTO} from "../models/petReportDTO";

@Component({
  selector: 'app-point-interest-modal',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './point-interest-modal.component.html',
  styleUrl: './point-interest-modal.component.css'
})
export class PointInterestModalComponent {
  selectedImage: string | ArrayBuffer | null = null;
  petName: string = '';
  description: string = '';
  latitude: number | null = null;
  longitude: number | null = null;

  constructor(private reportsService: ReportsService,
              public dialogRef: MatDialogRef<PointInterestModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del modal
  ) {
    // Inicializar latitud y longitud con los datos recibidos
    if (data) {
      this.latitude = data.lat;
      this.longitude = data.lng;
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    const lostPetData = {
      petName: this.petName,
      description: this.description,
      image: this.selectedImage,
      latitude: this.latitude,   // Incluyendo latitud
      longitude: this.longitude   // Incluyendo longitud
    };

    const userDetailsString = localStorage.getItem('userDetails');
    // Comprobar si el objeto existe
    if (userDetailsString) {
      // Convertir la cadena JSON de nuevo a un objeto
      const userDetails = JSON.parse(userDetailsString);

      // Crear un petReportDTO utilizando la interfaz
      const petReportDTO: PetReportDTO = {
        petDescription: lostPetData.description, // Mapeando descripción de la mascota
        reporterOrFinderId: userDetails.id, // ID del reportador o encontrador
        status: "Lost", // Estado (puedes cambiarlo si es necesario)
        reportedOrFoundAt: new Date(), // Ahora es un objeto Date
        image: typeof lostPetData.image === 'string' ? lostPetData.image : '', // Asegúrate de que sea un string
        name: lostPetData.petName, // Mapeando nombre de la mascota
        typeId: 3, // ID del tipo de mascota
        coords: `${lostPetData.latitude},${lostPetData.longitude}` // Concatenando latitud y longitud
      };
      console.log(petReportDTO)
      this.reportsService.savePetReport(petReportDTO).subscribe(response => {
        console.log('Reporte de mascota guardado:', response);
      });
      this.dialogRef.close(lostPetData); // Cerrar el modal y devolver los datos
    }
  }
}
