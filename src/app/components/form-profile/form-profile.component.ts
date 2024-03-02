import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { SelectComponent } from '../../shared/select/select.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { SelectOption } from '../../interfaces/SelectOption';
import { default as moment, Moment } from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from '../../interfaces/Profile';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setDataProfile } from '../../store/actions/Profile.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.scss',
})
export class FormProfileComponent {
  @Input() imageUrl: string = '';
  favoriteHobbies: SelectOption[] = [
    { key: '1', value: 'Jugar Fútbol' },
    { key: '2', value: 'Jugar Basketball' },
    { key: '3', value: 'Jugar Tennis' },
    { key: '4', value: 'Jugar Voleibol' },
    { key: '5', value: 'Jugar Fifa' },
    { key: '6', value: 'Jugar Videojuegos' },
  ];

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      hobbies: [[]],
      birthDate: [null, [Validators.required]],
      document: [''],
      minorityCard: [''],
    });
  }

  getMaxDate(): Moment {
    return moment();
  }

  isAdult(date: Moment): boolean {
    if (!date) return false;
    const age = moment().diff(date, 'years');

    if (age < 18) {
      this.form.controls['document'].removeValidators(Validators.required);
      return false;
    }

    this.form.controls['document'].addValidators(Validators.required);
    return true;
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (!this.imageUrl) {
      this.snackBar.open('La imagen de perfil es requerida', 'OK', {
        duration: 2000,
      });
      return;
    }

    const newProfile: Profile = {
      name: this.form.value.name,
      birthDate: moment(this.form.value.birthDate),
      image: this.imageUrl,
      hobbies: this.getFavoriteHobbies(this.form.value.hobbies),
      document: this.form.value.document,
      minorityCard: this.form.value.minorityCard,
    };

    this.store.dispatch(setDataProfile({ data: newProfile }));
    this.router.navigateByUrl('/pokemons');
  }

  private getFavoriteHobbies(hobbiesId?: string[]): string[] {
    if (!hobbiesId) return [];
    if (!Array.isArray(hobbiesId)) return [];

    const result = this.favoriteHobbies
      .filter((hobby) => {
        return hobbiesId.find((item) => item === hobby.key);
      })
      .map((hobby) => hobby.value);

    return result;
  }
}
