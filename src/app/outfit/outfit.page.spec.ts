import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutfitPage } from './outfit.page';

describe('OutfitPage', () => {
  let component: OutfitPage;
  let fixture: ComponentFixture<OutfitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
