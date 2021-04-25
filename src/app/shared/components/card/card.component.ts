import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { TasksService } from "src/app/module/task-manager/services/tasks-service.service";

@Component({
  selector: "card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input("cardType") cardType: string;
  @Input("data") data: any;

  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  onDeleteTask(id, msg) {
    this.onDelete.emit({ id: id, message: msg });
  }

  onUpdateTask(task) {
    this.onUpdate.emit(task);
  }
}
