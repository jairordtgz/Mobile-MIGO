export interface CampaniaList {
    id?: number;
    nombre: string;
    responsable_nombre?: string | null;
    responsable_email?: string | null;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_limite_registro?: string | null;
    presupuesto_total: number;
    presupuesto_restante: number;
    km_minimo_conductor: number;
    limite_vehiculos: number;
    ciclo_pago?: "semanal" | "quincenal" | "mensual";
    activa?: boolean;
    estado?: string;
    fecha_creacion?: string;
    tipo_brandeo?: number | null;
    empresa: number;
    empresa_nombre?: string;
    sectores_info?: SectorInfo[];
    tarifas_info?: TarifaInfo[];
}

export interface SectorInfo {
  nombre: string;
}
export interface TarifaInfo {
  valor: string;
}
