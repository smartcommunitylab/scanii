import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-upload-result-modal",
  templateUrl: "./upload-result-modal.component.html",
  styleUrls: ["./upload-result-modal.component.scss"],
})
export class UploadResultModalComponent {
  @Input() public fileUploadedSuccessfully: boolean;

  constructor(
    public activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  close(): void {
    this.activeModal.close();
  }
}
