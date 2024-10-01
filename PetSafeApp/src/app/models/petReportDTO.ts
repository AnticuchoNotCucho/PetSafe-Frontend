export interface PetReportDTO {
  petDescription: string;
  reporterOrFinderId: number;
  status: string;
  reportedOrFoundAt: Date; // Utilizamos Date para manejar fechas en Angular
  image: string;
  name: string;
  typeId: number; // Asumo que los tipos son enteros
  coords: string; // Coordenadas en formato "latitud,longitud"
}
