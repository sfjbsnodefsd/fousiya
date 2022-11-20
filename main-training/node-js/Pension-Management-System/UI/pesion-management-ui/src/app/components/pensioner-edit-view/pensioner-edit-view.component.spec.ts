import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionerEditViewComponent } from './pensioner-edit-view.component';

describe('PensionerEditViewComponent', () => {
  let component: PensionerEditViewComponent;
  let fixture: ComponentFixture<PensionerEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionerEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensionerEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
