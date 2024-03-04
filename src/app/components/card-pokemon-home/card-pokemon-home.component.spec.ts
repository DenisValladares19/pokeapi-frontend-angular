import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokemonHomeComponent } from './card-pokemon-home.component';

describe('CardPokemonHomeComponent', () => {
  let component: CardPokemonHomeComponent;
  let fixture: ComponentFixture<CardPokemonHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPokemonHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPokemonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
