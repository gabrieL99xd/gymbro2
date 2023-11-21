import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPublicacaoComponent } from './criar-publicacao.component';

describe('CriarPublicacaoComponent', () => {
  let component: CriarPublicacaoComponent;
  let fixture: ComponentFixture<CriarPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarPublicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
