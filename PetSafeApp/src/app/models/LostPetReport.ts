export interface LostPetReport {
  id: number;
  petDescription: string; // Descripción de la mascota
  reporterId: number; // ID del reportero
  status?: string; // Estado del reporte (opcional)
  reportedAt: string; // Fecha y hora en que se reportó (como string, puede ser ISO 8601)
  image?: string; // URL o ruta de la imagen (opcional)
  name?: string; // Nombre de la mascota (opcional)
  typeId?: number; // ID del tipo de punto (opcional)
  coords?: string; // Coordenadas de la mascota (opcional)
}
