import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationRequestEditionComponent } from './publication-request-edition.component';

describe('PublicationRequestEditionComponent', () => {
  let component: PublicationRequestEditionComponent;
  let fixture: ComponentFixture<PublicationRequestEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationRequestEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationRequestEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
