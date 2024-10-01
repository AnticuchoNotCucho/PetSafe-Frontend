
export interface UserEntity {
  id: number; // Si tienes un campo ID
  username: string; // Nombre de usuario
  password: string;
  roleId: number;
  name: string;
  lastname: string;
  email: string; // Correo electrónico
  phone: string; // Teléfono (ajusta esto si tu modelo no lo tiene)
  // Agrega más campos según lo que tengas en tu modelo del backend
}
