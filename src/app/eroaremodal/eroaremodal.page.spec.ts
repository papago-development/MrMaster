import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EroaremodalPage } from './eroaremodal.page';

describe('EroaremodalPage', () => {
  let component: EroaremodalPage;
  let fixture: ComponentFixture<EroaremodalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EroaremodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
