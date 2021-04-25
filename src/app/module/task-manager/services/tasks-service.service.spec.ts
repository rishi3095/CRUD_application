import { TestBed } from '@angular/core/testing';

import { TasksServiceService } from './tasks-service.service';

describe('TasksServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksServiceService = TestBed.get(TasksServiceService);
    expect(service).toBeTruthy();
  });
});
