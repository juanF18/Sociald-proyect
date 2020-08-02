import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationRequestListComponent } from './publication-request-list.component';

describe('PublicationRequestListComponent', () => {
  let component: PublicationRequestListComponent;
  let fixture: ComponentFixture<PublicationRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
