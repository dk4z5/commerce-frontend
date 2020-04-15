import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSearchDialogComponent } from './produto-search-dialog.component';

describe('ProdutoSearchDialogComponent', () => {
  let component: ProdutoSearchDialogComponent;
  let fixture: ComponentFixture<ProdutoSearchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
