import { Lesson } from './lesson';

export interface Module {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}
