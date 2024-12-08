export interface VehicleData {
    allVehicles: number;
    inService: number;
    inServiceChange?: number; // Opciós, mivel néha nem érkezik ilyen adat
  }
  
  export interface Case {
    id: number;
    category: string;
    licensePlate: string;
    type: string;
    description: string;
    solution?: string; // Opciós
  }
  
  export interface NewCase {
    id: number | null;
    category: string | undefined;
    licensePlate: string;
    type: string;
    description: string;
    solution: string;
  }