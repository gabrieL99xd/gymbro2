import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAnotacaoComponent } from './criar-anotacao.component';

describe('CriarAnotacaoComponent', () => {
  let component: CriarAnotacaoComponent;
  let fixture: ComponentFixture<CriarAnotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarAnotacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarAnotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
