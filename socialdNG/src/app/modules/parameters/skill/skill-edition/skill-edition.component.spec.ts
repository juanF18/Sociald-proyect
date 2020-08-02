import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEditionComponent } from './skill-edition.component';

describe('SkillEditionComponent', () => {
  let component: SkillEditionComponent;
  let fixture: ComponentFixture<SkillEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
