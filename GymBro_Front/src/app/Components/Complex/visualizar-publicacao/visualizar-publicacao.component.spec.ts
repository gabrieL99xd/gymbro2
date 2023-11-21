import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPublicacaoComponent } from './visualizar-publicacao.component';

describe('VisualizarPublicacaoComponent', () => {
  let component: VisualizarPublicacaoComponent;
  let fixture: ComponentFixture<VisualizarPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarPublicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
