import { Moment } from 'moment';

export interface Profile {
  name: string;
  hobbies: string[];
  birthDate: Moment;
  document?: string;
  minorityCard?: string;
  image: string;
}
