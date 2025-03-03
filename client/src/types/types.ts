export interface Diagnosis {
    icdCode: string;
    conditionName: string;
    timestamp: Date;
  }
  
  export interface Participant {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    phoneNumber: number;
    patientNotes: string | null;
    diagnoses: Diagnosis[];
  }