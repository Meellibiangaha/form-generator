export type WebFormModel = {
  /** Id анкеты */
  id: number | null;
  /** Имя заполненное в анкете */
  name: string;
  /** Возраст */
  age: number;
  /** Семейное положение */
  maritalStatus: number; // Можно через enum сделать
  /** Навыки */
  skils?: number[];
  /** ВУЗ(ы) */
  university?: string[];
}
