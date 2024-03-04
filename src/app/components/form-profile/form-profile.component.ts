import { Component, Input, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import {
  selectIsComplete,
  selectProfileData,
} from '../../store/selectors/Profile.selector';

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
export class FormProfileComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() filename: string = '';
  favoriteHobbies: SelectOption[] = [
    { key: '1', value: 'Jugar Fútbol' },
    { key: '2', value: 'Jugar Basketball' },
    { key: '3', value: 'Jugar Tennis' },
    { key: '4', value: 'Jugar Voleibol' },
    { key: '5', value: 'Jugar Fifa' },
    { key: '6', value: 'Jugar Videojuegos' },
  ];

  form: FormGroup;
  private profile$: Observable<Profile>;
  private isCompleted: boolean = false;

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
    this.profile$ = this.store.select(selectProfileData);
  }

  ngOnInit(): void {
    this.profile$.subscribe({
      next: (profile) => {
        this.setFormValues(profile);
      },
    });

    this.store
      .select(selectIsComplete)
      .subscribe({ next: (value) => (this.isCompleted = value) });
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
      hobbies: this.getFavoriteHobbies(this.form.value.hobbies, 'key', 'value'),
      document: this.form.value.document,
      minorityCard: this.form.value.minorityCard,
      filename: this.filename,
    };

    this.store.dispatch(setDataProfile({ data: newProfile }));
    if (this.isCompleted) {
      this.router.navigateByUrl('/home');
      return;
    }
    this.router.navigateByUrl('/pokemons');
  }

  private getFavoriteHobbies(
    hobbiesId: string[],
    keyValidate: keyof SelectOption,
    keyReturn: keyof SelectOption
  ): string[] {
    if (!hobbiesId) return [];
    if (!Array.isArray(hobbiesId)) return [];

    const result = this.favoriteHobbies
      .filter((hobby) => {
        return hobbiesId.find((item) => item === hobby[keyValidate]);
      })
      .map((hobby) => hobby[keyReturn]);

    return result;
  }

  setFormValues(profile: Profile) {
    if (profile.name === '') return;
    this.form.controls['name'].setValue(profile.name);
    this.form.controls['birthDate'].setValue(profile.birthDate);
    this.form.controls['document'].setValue(profile.document);
    this.form.controls['minorityCard'].setValue(profile.minorityCard);
    this.form.controls['hobbies'].setValue(
      this.getFavoriteHobbies(profile.hobbies, 'value', 'key')
    );
  }
}
