import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationEditionComponent } from './publication-edition.component';

describe('PublicationEditionComponent', () => {
  let component: PublicationEditionComponent;
  let fixture: ComponentFixture<PublicationEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
