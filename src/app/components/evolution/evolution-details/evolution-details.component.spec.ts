import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionDetailsComponent } from './evolution-details.component';

describe('EvolutionDetailsComponent', () => {
  let component: EvolutionDetailsComponent;
  let fixture: ComponentFixture<EvolutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
