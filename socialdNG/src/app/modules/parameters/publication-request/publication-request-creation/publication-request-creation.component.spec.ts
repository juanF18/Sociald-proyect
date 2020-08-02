import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationRequestCreationComponent } from './publication-request-creation.component';

describe('PublicationRequestCreationComponent', () => {
  let component: PublicationRequestCreationComponent;
  let fixture: ComponentFixture<PublicationRequestCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationRequestCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationRequestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
