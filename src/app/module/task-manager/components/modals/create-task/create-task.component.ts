import { DatePipe, formatDate } from "@angular/common";
import { HttpHeaders } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Subscription } from "rxjs";
import { ConfirmationModalComponent } from "src/app/shared/components/modals/components/confirmation-modal/confirmation-modal.component";
import { NotifyService } from "src/app/shared/services/notify.service";
import { TaskPriority } from "../../../consts/Tasks";
import { TasksService } from "../../../services/tasks-service.service";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.scss"],
})
export class CreateTaskComponent implements OnInit {
  objCreateTaskSub: Subscription;
  objGetUsersSub: Subscription;

  formData: FormData;
  createTaskForm: FormGroup;
  updateTaskForm: FormGroup;

  selectedDueDate: any;
  usersDataList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TasksService,
    private dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private notifyService: NotifyService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getFormControl();
  }

  getFormControl() {
    if (this.data.type == "createTask") {
      this.createTaskForm = new FormGroup({
        message: new FormControl("", Validators.required),
        due_date: new FormControl(
          formatDate(new Date(), "YYYY-MM-DD HH:mm:ss", "en"),
          [Validators.required]
        ),
        priority: new FormControl(null, [
          Validators.max(TaskPriority.High),
          Validators.min(TaskPriority.Low),
        ]),
        assigned_to: new FormControl(null, [Validators.required]),
      });
    } else {
      this.selectedDueDate = new Date(this.data.taskDetails.due_date);
      this.updateTaskForm = new FormGroup({
        message: new FormControl(
          this.data.taskDetails.message,
          Validators.required
        ),
        due_date: new FormControl(
          formatDate(
            this.data.taskDetails.due_date,
            "YYYY-MM-DD HH:mm:ss",
            "en"
          ),
          [Validators.required]
        ),
        priority: new FormControl(Number(this.data.taskDetails.priority), [
          Validators.max(TaskPriority.High),
          Validators.min(TaskPriority.Low),
        ]),
        assigned_to: new FormControl(this.data.taskDetails.assigned_to, [
          Validators.required,
        ]),
      });
    }
  }

  getUsers() {
    this.notifyService.notifyEnableSpinner(true);
    this.objGetUsersSub = this.taskService.getUsersList().subscribe((data) => {
      if (data["status"] == "success" && data["users"].length > 0) {
        this.usersDataList = data["users"];
      } else {
        this._snackbar.open("Error getting users: " + data["error"], "Dismiss");
      }
      this.notifyService.notifyEnableSpinner(false);
    });
  }

  onCreateTask() {
    let modal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Are You sure you want to create a new task?",
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
        this.createTask();
      }
    });
  }

  createTask() {
    this.formData = new FormData();
    this.formData.append("message", this.createTaskForm.get("message").value);
    this.formData.append(
      "due_date",
      this.datePipe.transform(
        this.createTaskForm.get("due_date").value,
        "yyyy-MM-dd HH:mm:ss"
      )
    );
    this.formData.append("priority", this.createTaskForm.get("priority").value);
    this.formData.append(
      "assigned_to",
      this.createTaskForm.get("assigned_to").value
    );
    this.notifyService.notifyEnableSpinner(true);

    this.objCreateTaskSub = this.taskService
      .addTask(this.formData)
      .subscribe((data) => {
        if (data["status"] != "error") {
          this._snackbar.open("Task Created successfully!: ", "Dismiss");
        } else {
          this._snackbar.open(
            "Error Creating Task: " + data["error"],
            "Dismiss"
          );
        }
        this.notifyService.notifyEnableSpinner(false);
        this.objCreateTaskSub.unsubscribe();
      });
  }

  onUpdateTask() {
    let modal = this.dialog.open(ConfirmationModalComponent, {
      data: {
        title: "Are You sure you want to update task?",
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
        this.updateTask();
      }
    });
  }

  updateTask() {
    this.formData = new FormData();
    this.formData.append("taskid", this.data.taskDetails.id);
    this.formData.append("message", this.updateTaskForm.get("message").value);
    this.formData.append(
      "due_date",
      this.datePipe.transform(
        this.updateTaskForm.get("due_date").value
          ? this.updateTaskForm.get("due_date").value
          : this.selectedDueDate,
        "yyyy-MM-dd HH:mm:ss"
      )
    );
    this.formData.append("priority", this.updateTaskForm.get("priority").value);
    this.formData.append(
      "assigned_to",
      this.updateTaskForm.get("assigned_to").value
    );
    this.notifyService.notifyEnableSpinner(true);

    this.objCreateTaskSub = this.taskService
      .updateTask(this.formData)
      .subscribe((data) => {
        if (data["status"] != "error") {
          this._snackbar.open("Task Updated successfully!: ", "Dismiss");
        } else {
          this._snackbar.open(
            "Error Updating Task: " + data["error"],
            "Dismiss"
          );
        }
        this.notifyService.notifyEnableSpinner(false);
        this.objCreateTaskSub.unsubscribe();
      });
  }

  closeModal() {
    this.dialogRef.close("close");
  }
}
