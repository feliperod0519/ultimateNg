import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurInfoComponent } from './our-info.component';

describe('OurInfoComponent', () => {
  let component: OurInfoComponent;
  let fixture: ComponentFixture<OurInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
