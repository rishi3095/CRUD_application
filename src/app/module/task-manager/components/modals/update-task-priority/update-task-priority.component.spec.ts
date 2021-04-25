import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskPriorityComponent } from './update-task-priority.component';

describe('UpdateTaskPriorityComponent', () => {
  let component: UpdateTaskPriorityComponent;
  let fixture: ComponentFixture<UpdateTaskPriorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTaskPriorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTaskPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
