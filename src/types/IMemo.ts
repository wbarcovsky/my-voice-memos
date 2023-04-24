export interface IMemo {
  id?: string; // If there is no id, then this memo is not added to DB yet
  text: string;
}
