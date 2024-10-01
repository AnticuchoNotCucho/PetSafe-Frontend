import {LostPetReport} from "./LostPetReport";
import {FoundPetReport} from "./FoundPetReport";
import {PointInterest} from "./PointsInterest";

export interface PointsDTO {
  lostPets: LostPetReport[]; // Lista de reportes de mascotas perdidas
  foundPets: FoundPetReport[]; // Lista de reportes de mascotas encontradas
  pointsOfInterestEntities: PointInterest[]; // Lista de reportes de mascotas encontradas
}
