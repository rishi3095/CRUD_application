import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";

@Component({
  selector: "searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit {
  @Output() searchCriteria = new EventEmitter<string>();
  @Input('searchWord') searchWord: string;
  constructor() {}

  ngOnInit() {}

  searchThis() {
    this.searchCriteria.emit(this.searchWord);
  }
}
