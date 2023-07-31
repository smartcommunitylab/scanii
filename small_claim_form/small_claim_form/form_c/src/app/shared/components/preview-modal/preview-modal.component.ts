import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { StepOne } from "src/app/core/step-one/step-one.model";
import { StepOneService } from "src/app/core/step-one/step-one.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TranslateService } from "@ngx-translate/core";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-preview-modal",
  templateUrl: "./preview-modal.component.html",
  styleUrls: ["./preview-modal.component.scss"],
})
export class PreviewModalComponent implements OnInit {
  stepOne: StepOne;
  showSpinner = false;
  languages: string;
  documentDefinition = {
    content: [],
    styles: {
      lineValue: {
        bold: true,
      },
      divValue: {
        bold: true,
      },
      primaryTitle: {
        fontSize: 18,
        bold: true,
        margin: [0, 10, 0, 10],
      },
      secondaryTitle: {
        fontSize: 16,
        margin: [0, 10, 0, 10],
      },
      field: {
        fontSize: 12,
        alignment: "justify",
        lineHeight: 1.2,
      },
    },
    pageSize: "A4",
    defaultStyle: {
      font: "FontAwesome",
    },
  };
  indentationCount = 0;

  constructor(
    private activeModal: NgbActiveModal,
    public navbarService: NavbarService,
    private stepOneService: StepOneService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.stepOne = this.stepOneService.getStepOne();
    this.languages = this.setLanguagesString();

    pdfMake.fonts = {
      FontAwesome: {
        normal: `${window.location.origin}/LiberationSans-Regular.ttf`,
        bold: `${window.location.origin}/LiberationSans-Bold.ttf`,
      },
    };
  }

  private setLanguagesString(): string {
    let languagesString = "";
    if (this.stepOne.languagesNames.length > 0) {
      this.stepOne.languagesNames.forEach((language) => {
        languagesString += language + ", ";
      });
      languagesString = languagesString.slice(0, -2);
    }
    return languagesString;
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  downloadPdf(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.documentDefinition.content = [];

      const children = document.getElementById("content").children;
      this.setPdfContent(children, false);

      const gen = pdfMake.createPdf(this.documentDefinition);
      gen.download(this.getFileName());

      this.showSpinner = false;
    }, 10);
  }

  private setPdfContent(children: any, addIndentation: boolean): void {
    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains("pdf-line-field")) {
        this.handleLineField(children[i], addIndentation);
      } else if (children[i].classList.contains("pdf-div-field")) {
        this.handleDivField(children[i], addIndentation);
      } else if (children[i].classList.contains("pdf-representative-field")) {
        this.handleRepresentativeField(children[i], addIndentation);
      } else if (children[i].classList.contains("pdf-text")) {
        this.handleText(children[i], addIndentation);
      } else if (children[i].classList.contains("pdf-primary-title")) {
        //primary title
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "primaryTitle",
        });
      } else if (children[i].classList.contains("pdf-secondary-title")) {
        //secondary title
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "secondaryTitle",
          marginLeft: addIndentation ? this.indentationCount * 15 : 0,
        });
      } else {
        if (!children[i].classList.contains("pdf-no-indentation"))
          this.indentationCount++;

        this.setPdfContent(children[i].children, true);

        if (!children[i].classList.contains("pdf-no-indentation"))
          this.indentationCount--;
      }
    }
  }

  private handleLineField(child: any, addIndentation: boolean): void {
    //field with label and value on the same line
    const labelElement = child.querySelector(".pdf-label");
    const valueElement = child.querySelector(".pdf-value");

    const label = {
      text: labelElement.innerText,
    };
    const punctuation = this.getPunctuation(labelElement);

    let value = {};
    if (valueElement) {
      value = {
        text: valueElement.innerText,
        style: "lineValue",
      };
    }

    const dot = this.getPunctuation(child);

    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = addIndentation ? 7 : 10;
    const marginBottom = addIndentation ? 7 : 10;

    this.documentDefinition.content.push({
      text: [label, punctuation, value, dot],
      style: "field",
      margin: [marginLeft, marginTop, 0, marginBottom],
    });
  }

  private handleDivField(child: any, addIndentation: boolean): void {
    //field with label and value on different lines
    const labelElement = child.querySelector(".pdf-label");
    const valueElement = child.querySelector(".pdf-value");

    const label = {
      text: labelElement.innerText,
    };
    const punctuation = this.getPunctuation(labelElement);

    const labelMarginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const labelMarginTop = addIndentation ? 7 : 10;
    const labelMarginBottom = 5;

    this.documentDefinition.content.push({
      text: [label, punctuation],
      style: "field",
      margin: [labelMarginLeft, labelMarginTop, 0, labelMarginBottom],
    });

    if (valueElement.innerText) {
      let value = {};
      if (valueElement) {
        value = {
          text: valueElement.innerText,
        };
      }

      const marginLeft = addIndentation ? this.indentationCount * 15 + 15 : 15;
      const marginTop = 5;
      const marginBottom = addIndentation ? 7 : 10;

      this.documentDefinition.content.push({
        text: value,
        style: ["field", "divValue"],
        margin: [marginLeft, marginTop, 0, marginBottom],
      });
    }
  }

  private handleRepresentativeField(child: any, addIndentation: boolean): void {
    //fields of a claimant or defendant representative
    const labelElement = child.querySelector(".pdf-label");
    const valueElement = child.querySelector(".pdf-values");

    const label = {
      text: labelElement.innerText,
    };
    const punctuation = this.getPunctuation(labelElement);

    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = 7;
    const marginBottom = 7;

    this.documentDefinition.content.push({
      text: [label, punctuation],
      style: "field",
      margin: [marginLeft, marginTop, 0, marginBottom],
    });

    if (valueElement) {
      if (!child.classList.contains("pdf-no-indentation"))
        this.indentationCount++;
      this.setPdfContent(valueElement.children, true);
      if (!child.classList.contains("pdf-no-indentation"))
        this.indentationCount--;
    }
  }

  private handleText(child: any, addIndentation: boolean): void {
    //text
    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = addIndentation ? 7 : 10;
    const marginBottom = addIndentation ? 7 : 10;

    this.documentDefinition.content.push({
      text: child.innerText,
      style: "field",
      margin: [marginLeft, marginTop, 0, marginBottom],
    });
  }

  private getPunctuation(element: any): string {
    if (element.classList.contains("colon")) return ": ";
    else if (element.classList.contains("dot")) return ".";
    else if (element.classList.contains("space")) return " ";
    else return "";
  }

  private getFileName(): string {
    return `SC_B_${this.formatDate(
      new Date()
    )}_${this.translateService.currentLang.toUpperCase()}`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}${month}${year}`;
  }
}
