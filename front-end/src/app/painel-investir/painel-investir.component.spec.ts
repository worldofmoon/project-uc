import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelInvestirComponent } from './painel-investir.component';

describe('PainelInvestirComponent', () => {
  let component: PainelInvestirComponent;
  let fixture: ComponentFixture<PainelInvestirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelInvestirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelInvestirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
