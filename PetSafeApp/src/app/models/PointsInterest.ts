export interface PointInterest {
  id: number; // ID del punto de interés
  description: string; // Descripción del punto de interés
  reporterId: number; // ID de quien reportó el punto de interés
  status?: string; // Estado del reporte (opcional)
  reportedAt: string; // Fecha y hora del reporte (como string, puede ser ISO 8601)
  image?: string; // URL o ruta de la imagen (opcional)
  name?: string; // Nombre del punto de interés (opcional)
  typeId?: number; // ID del tipo de punto de interés (opcional)
  coords?: string; // Coordenadas del punto de interés (opcional)
}
