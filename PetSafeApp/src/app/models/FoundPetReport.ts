export interface FoundPetReport {
  id: number;
  petDescription: string; // Descripción de la mascota encontrada
  finderId: number; // ID de quien encontró la mascota
  status?: string; // Estado del reporte (opcional)
  foundAt: string; // Fecha y hora en que se encontró (como string, puede ser ISO 8601)
  image?: string; // URL o ruta de la imagen (opcional)
  name?: string; // Nombre de la mascota (opcional)
  typeId?: number; // ID del tipo de punto (opcional)
  coords?: string; // Coordenadas donde se encontró la mascota (opcional)
}
