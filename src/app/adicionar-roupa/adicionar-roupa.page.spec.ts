import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarRoupaPage } from './adicionar-roupa.page';

describe('AdicionarRoupaPage', () => {
  let component: AdicionarRoupaPage;
  let fixture: ComponentFixture<AdicionarRoupaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarRoupaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
