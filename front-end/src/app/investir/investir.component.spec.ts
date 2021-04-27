import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestirComponent } from './investir.component';

describe('InvestirComponent', () => {
  let component: InvestirComponent;
  let fixture: ComponentFixture<InvestirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
