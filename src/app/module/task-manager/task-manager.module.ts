import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskPanelComponent } from "./components/task-panel/task-panel.component";
import { CreateTaskComponent } from "./components/modals/create-task/create-task.component";
import { TasksService } from "./services/tasks-service.service";
import { UpdateTaskPriorityComponent } from "./components/modals/update-task-priority/update-task-priority.component";
import { SharedModule } from "src/app/shared/shared.module";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
  declarations: [
    TaskPanelComponent,
    CreateTaskComponent,
    UpdateTaskPriorityComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [TasksService],
  exports: [TaskPanelComponent],
  entryComponents: [CreateTaskComponent, UpdateTaskPriorityComponent],
})
export class TaskManagerModule {}
