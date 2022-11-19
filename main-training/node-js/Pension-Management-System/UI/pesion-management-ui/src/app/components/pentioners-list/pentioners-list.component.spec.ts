import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionersListComponent } from './pentioners-list.component';

describe('PentionersListComponent', () => {
  let component: PentionersListComponent;
  let fixture: ComponentFixture<PentionersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PentionersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PentionersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
