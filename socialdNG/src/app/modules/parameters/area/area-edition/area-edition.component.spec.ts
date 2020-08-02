import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEditionComponent } from './area-edition.component';

describe('AreaEditionComponent', () => {
  let component: AreaEditionComponent;
  let fixture: ComponentFixture<AreaEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
