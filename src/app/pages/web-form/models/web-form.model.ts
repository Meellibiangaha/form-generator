export type WebFormModel = {
  id: number | null;
  name: string;
  age: number;
  maritalStatus: number; // Можно через enum сделать
  skils?: number[];
  university?: string[];
}
