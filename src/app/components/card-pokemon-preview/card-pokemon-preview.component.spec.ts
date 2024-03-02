import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokemonPreviewComponent } from './card-pokemon-preview.component';

describe('CardPokemonPreviewComponent', () => {
  let component: CardPokemonPreviewComponent;
  let fixture: ComponentFixture<CardPokemonPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPokemonPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPokemonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
