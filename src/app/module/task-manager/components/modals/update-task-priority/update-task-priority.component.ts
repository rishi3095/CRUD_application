import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { ConfirmationModalComponent } from "src/app/shared/components/modals/components/confirmation-modal/confirmation-modal.component";
import { NotifyService } from "src/app/shared/services/notify.service";
import { TaskPriority } from "../../../consts/Tasks";
import { TasksService } from "../../../services/tasks-service.service";

@Component({
  selector: "app-update-task-priority",
  templateUrl: "./update-task-priority.component.html",
  styleUrls: ["./update-task-priority.component.scss"],
})
export class UpdateTaskPriorityComponent implements OnInit {
  lowPriorityTaskList: any[] = [];
  highPriorityTaskList: any[] = [];
  mediumPriorityTaskList: any[] = [];

  blnAllListEmpty: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskPriorityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private taskService: TasksService,
    private _snakbar: MatSnackBar,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.getTasks();
  }

  closeModal() {
    this.dialogRef.close("close");
  }

  getTasks() {
    this.notifyService.notifyEnableSpinner(true);

    this.taskService.getTasksList().subscribe((data) => {
      if (data["status"] == "success" && data["tasks"].length > 0) {
        this.sortData(data);
      } else {
        this.blnAllListEmpty = true;
        this._snakbar.open("Error getting Tasks: " + data["error"], "Dismiss");
      }
      this.notifyService.notifyEnableSpinner(false);
    });
  }
  sortData(data) {
    if (data) {
      this.lowPriorityTaskList = data.tasks.filter(
        (el) => el.priority == TaskPriority.Low
      );
      this.mediumPriorityTaskList = data.tasks.filter(
        (el) => el.priority == TaskPriority.Medium
      );
      this.highPriorityTaskList = data.tasks.filter(
        (el) => el.priority == TaskPriority.High
      );
      this.blnAllListEmpty = false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.confirmTransferOfTask(event);
    }
  }

  confirmTransferOfTask(event) {
    let modal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Are You sure you want to change the priority?",
        buttons: [
          {
            label: "Yes",
            width: "",
            cssClass: "",
            color: "warn",
          },
          {
            label: "No",
            width: "",
            cssClass: "",
            color: "accent",
          },
        ],
      },
      height: "10.5rem",
    });

    modal.afterClosed().subscribe((data) => {
      if (data == "Yes") {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.moveToPriorityList(event);
      } else {
        // modal.close();
      }
    });
  }

  moveToPriorityList(event: CdkDragDrop<string[]>) {
    switch (event.container.id) {
      case "lowPriority":
        this.lowPriorityTaskList = event.container.data;
        this.updatePriorty(event.container.data, TaskPriority.Low);
        break;
      case "mediumPriority":
        this.mediumPriorityTaskList = event.container.data;
        this.updatePriorty(event.container.data, TaskPriority.Medium);
        break;
      case "highPriority":
        this.highPriorityTaskList = event.container.data;
        this.updatePriorty(event.container.data, TaskPriority.High);
        break;
      default:
        break;
    }
  }
  updatePriorty(data: any[], priority) {
    this.notifyService.notifyEnableSpinner(true);

    let task = data.find((el) => el.priority != priority);
    let formData;
    if (task != undefined) {
      formData = new FormData();
      formData.append("taskid", task.id);
      formData.append("priority", priority);
      this.taskService.updateTask(formData).subscribe((data) => {
        if (data["status"] == "success") {
          this.getTasks();
          this._snakbar.open("Priority updated successfully!", "Dismiss");
        } else {
          this._snakbar.open(
            "Error updating priority: " + data["error"],
            "Dismiss"
          );
        }
        this.notifyService.notifyEnableSpinner(false);
      });
    }
  }
}
