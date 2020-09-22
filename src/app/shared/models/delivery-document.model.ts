export interface DeliveryDocument {
  statusError: boolean;
  dateDocument: Date;
  unityCompany: string;
  distribution: string;
  piece: string;
  timeStreet: string;
  motiveNotDelivery: string;
  StatusDeliveryId: number;
  id?: string | number;
}
