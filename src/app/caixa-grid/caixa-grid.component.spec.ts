import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaGridComponent } from './caixa-grid.component';

describe('CaixaGridComponent', () => {
  let component: CaixaGridComponent;
  let fixture: ComponentFixture<CaixaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
