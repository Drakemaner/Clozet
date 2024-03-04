import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClozetPage } from './clozet.page';

describe('ClozetPage', () => {
  let component: ClozetPage;
  let fixture: ComponentFixture<ClozetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClozetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
