export interface RegistroConductor {
  cedula: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  fecha_nacimiento: string;
  telefono: string;
  sexo: string;
}

export interface RegistroVehiculo {
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;
  tipo: string;       // Sedan, SUV, etc.
}