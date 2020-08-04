import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationCreationComponent } from './publication-creation.component';

describe('PublicationCreationComponent', () => {
  let component: PublicationCreationComponent;
  let fixture: ComponentFixture<PublicationCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
