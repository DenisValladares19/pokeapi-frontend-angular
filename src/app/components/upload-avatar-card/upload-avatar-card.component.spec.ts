import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAvatarCardComponent } from './upload-avatar-card.component';

describe('UploadAvatarCardComponent', () => {
  let component: UploadAvatarCardComponent;
  let fixture: ComponentFixture<UploadAvatarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAvatarCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadAvatarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
