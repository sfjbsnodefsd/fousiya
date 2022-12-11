import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionerSearchComponent } from './pensioner-search.component';

describe('PensionerSearchComponent', () => {
  let component: PensionerSearchComponent;
  let fixture: ComponentFixture<PensionerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionerSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensionerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
