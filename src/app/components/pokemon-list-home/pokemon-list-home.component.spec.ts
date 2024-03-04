import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListHomeComponent } from './pokemon-list-home.component';

describe('PokemonListHomeComponent', () => {
  let component: PokemonListHomeComponent;
  let fixture: ComponentFixture<PokemonListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
