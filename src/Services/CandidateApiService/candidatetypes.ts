// add product interface
export interface candidateTypes {
  name: string;
  resumeTitle: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  workExp: string;
  currentCTC: string;
  currentLocation: string;
  state: string;
  preferredLocation: string;
  dob: string;
  designation: string;
}
export interface candidateDataTypes {
  id: number;
  name: string;
  resumeTitle: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  workExp: string;
  currentCTC: string;
  currentLocation: string;
  state: string;
  preferredLocation: string;
  dob: string;
  Designation: {
    "title": string;
  };
}
// fetch product interface
export interface fetchproductinterface {}
