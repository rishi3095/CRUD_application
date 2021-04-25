import { Component, OnInit } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Subscription } from "rxjs";
import { ConfirmationModalComponent } from "src/app/shared/components/modals/components/confirmation-modal/confirmation-modal.component";
import { NotifyService } from "src/app/shared/services/notify.service";
import { TasksService } from "../../services/tasks-service.service";
import { CreateTaskComponent } from "../modals/create-task/create-task.component";
import { UpdateTaskPriorityComponent } from "../modals/update-task-priority/update-task-priority.component";

@Component({
  selector: "task-panel",
  templateUrl: "./task-panel.component.html",
  styleUrls: ["./task-panel.component.scss"],
})
export class TaskPanelComponent implements OnInit {
  tasksList: any = {};
  tempTasksList: any;

  blnSortByPriority: boolean = false;
  blnSortByDueDate: boolean = false;

  objGetTasksSub: Subscription;
  objDeleteTasksSub: Subscription;
  content: any;
  searchWord: string = "";

  constructor(
    public dialog: MatDialog,
    private taskService: TasksService,
    private _snackbar: MatSnackBar,
    private notifyService: NotifyService
  ) {}

  ngOnInit() {
    this.getTasksList();
  }
  getTasksList() {
    this.searchWord = "";
    this.notifyService.notifyEnableSpinner(true);
    this.objGetTasksSub = this.taskService.getTasksList().subscribe((data) => {
      if (data["status"] == "success") {
        this.tasksList = data;
        this.tempTasksList = this.tasksList["tasks"].slice();
      }
      this.objGetTasksSub.unsubscribe();
      this.notifyService.notifyEnableSpinner(false);
    });
  }

  sortByPriority() {
    this.blnSortByPriority = true;
    this.blnSortByDueDate = false;
    this.tasksList.tasks.sort((a, b) => b.priority - a.priority);
  }

  sortByDueDate() {
    this.blnSortByPriority = false;
    this.blnSortByDueDate = true;
    this.tasksList.tasks.sort(
      (a, b) => +new Date(b.due_date) - +new Date(a.due_date)
    );
  }

  openCreateTask() {
    let modal = this.dialog.open(CreateTaskComponent, {
      width: "28rem",
      height: "",
      hasBackdrop: true,
      autoFocus: false,
      disableClose: true,
      data: { type: "createTask" },
    });

    modal.afterClosed().subscribe((data) => {
      if (data == "close") {
        this.getTasksList();
      }
    });
  }

  onUpdateTask(event: Event) {
    let modal = this.dialog.open(CreateTaskComponent, {
      width: "28rem",
      height: "",
      autoFocus: false,
      disableClose: true,
      data: { type: "updateTask", taskDetails: event },
    });

    modal.afterClosed().subscribe((data) => {
      if (data == "close") {
        this.getTasksList();
      }
    });
  }

  openUpdatePriority() {
    let modal = this.dialog.open(UpdateTaskPriorityComponent, {
      width: "",
      height: "30rem",
    });

    modal.afterClosed().subscribe((data) => {
      if (data == "close") {
        this.getTasksList();
      }
    });
  }

  onDeleteTask(event: any) {
    let modal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title:
          "Are You sure you want to delete the task " + event.message + "?",
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
        this.notifyService.notifyEnableSpinner(true);
        let formData;
        formData = new FormData();
        formData.append("taskid", event.id);
        this.objDeleteTasksSub = this.taskService
          .deleteTask(formData)
          .subscribe((data) => {
            if (data["status"] == "success") {
              this._snackbar.open("Task deleted successfully!", "Dismiss");
              this.getTasksList();
            } else {
              this._snackbar.open(
                "Task deletion failed: " + data["error"],
                "Dismiss"
              );
            }
            this.notifyService.notifyEnableSpinner(true);
            this.objDeleteTasksSub.unsubscribe();
          });
      } else {
        // modal.close();
      }
    });
  }

  searchThis(data) {
    this.blnSortByDueDate = this.blnSortByPriority = false;
    this.searchWord = data;
    this.content = this.tempTasksList.slice();
    if (data) {
      this.content = this.content.filter(function (ele, i, array) {
        let arrayelement = ele.message.toLowerCase();
        return arrayelement.includes(data);
      });
    }
    this.tasksList["tasks"] = this.content;
    console.log(this.content);
  }
}
