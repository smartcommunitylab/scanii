import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormD } from "src/app/core/common/form-D.model";
import { NavbarService } from "src/app/core/navbar/navbar.service";
import { Citizen } from "src/app/core/step-one/citizen.model";
import { Claimant } from "src/app/core/step-one/claimant.model";
import { Defendant } from "src/app/core/step-one/defendant.model";
import { Organisation } from "src/app/core/step-one/organisation.model";
import { RepresentativeCitizen } from "src/app/core/step-one/representative-citizen.model";
import { RepresentativeOrganisation } from "src/app/core/step-one/representative-organisation.model";
import { StepOne } from "src/app/core/step-one/step-one.model";
import { StepOneService } from "src/app/core/step-one/step-one.service";
import { StepTwoService } from "src/app/core/step-two/step-two.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Section, Row, CheckboxInput, RadioInput } from "pdfmake-form-elements";
import { TranslateService } from "@ngx-translate/core";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-preview-modal",
  templateUrl: "./preview-modal.component.html",
  styleUrls: ["./preview-modal.component.scss"],
})
export class PreviewModalComponent implements OnInit {
  stepOne: StepOne;
  stepTwo: any;
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
    private stepTwoService: StepTwoService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.stepOne = this.stepOneService.getStepOne();
    this.stepTwo = this.navbarService.getFormD().stepTwo;

    pdfMake.fonts = {
      FontAwesome: {
        normal: `${window.location.origin}/LiberationSans-Regular.ttf`,
        bold: `${window.location.origin}/LiberationSans-Bold.ttf`,
        italics: `${window.location.origin}/LiberationSans-Regular.ttf`,
      },
    };
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  isClaimant(
    obj: Claimant | RepresentativeCitizen | RepresentativeOrganisation
  ): obj is Claimant {
    return obj instanceof Claimant;
  }

  isClaimantRepresentative(
    obj: Claimant | RepresentativeCitizen | RepresentativeOrganisation
  ): obj is RepresentativeCitizen | RepresentativeOrganisation {
    return (
      obj instanceof RepresentativeCitizen ||
      obj instanceof RepresentativeOrganisation
    );
  }

  isDefendant(
    obj: Defendant | RepresentativeCitizen | RepresentativeOrganisation
  ): obj is Defendant {
    return obj instanceof Defendant;
  }

  isDefendantRepresentative(
    obj: Defendant | RepresentativeCitizen | RepresentativeOrganisation
  ): obj is RepresentativeCitizen | RepresentativeOrganisation {
    return (
      obj instanceof RepresentativeCitizen ||
      obj instanceof RepresentativeOrganisation
    );
  }

  isCitizen(obj: Citizen | Organisation): obj is Citizen {
    return obj instanceof Citizen;
  }

  isOrganisation(obj: Citizen | Organisation): obj is Organisation {
    return obj instanceof Organisation;
  }

  isRepresentativeCitizen(
    obj: RepresentativeCitizen | RepresentativeOrganisation
  ): obj is RepresentativeCitizen {
    return obj instanceof RepresentativeCitizen;
  }

  isRepresentativeOrganisation(
    obj: RepresentativeCitizen | RepresentativeOrganisation
  ): obj is RepresentativeOrganisation {
    return obj instanceof RepresentativeOrganisation;
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
      const classList = children[i].classList;
      if (classList.contains("pdf-line-field")) {
        this.handleLineField(children[i], addIndentation);
      } else if (classList.contains("pdf-div-field")) {
        this.handleDivField(children[i], addIndentation);
      } else if (classList.contains("pdf-radio-buttons")) {
        this.handleRadioButtons(children[i], addIndentation);
      } else if (classList.contains("pdf-fields-block")) {
        this.handleFieldsBlock(children[i], addIndentation);
      } else if (classList.contains("pdf-line-multiple-fields")) {
        this.handleLineMultipleFields(children[i], addIndentation);
      } else if (classList.contains("pdf-checkbox")) {
        this.handleCheckbox(children[i], addIndentation);
      } else if (classList.contains("pdf-text")) {
        this.handleText(children[i], addIndentation);
      } else if (classList.contains("pdf-primary-title")) {
        //primary title
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "primaryTitle",
        });
      } else if (classList.contains("pdf-secondary-title")) {
        //secondary title
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "secondaryTitle",
          marginLeft: addIndentation ? this.indentationCount * 15 : 0,
        });
      } else {
        if (!classList.contains("pdf-no-indentation")) this.indentationCount++;

        this.setPdfContent(children[i].children, true);

        if (!classList.contains("pdf-no-indentation")) this.indentationCount--;
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

  private handleRadioButtons(element: any, addIndentation: boolean) {
    const options = [];

    for (let i = 0; i < element.children.length; i++) {
      const optionElement =
        element.children[i].querySelector(".pdf-radio-button");
      const labelElement = element.children[i].querySelector(".pdf-label");

      const isChecked = optionElement.checked;
      const label = labelElement.innerText;

      const option = {
        itemLabel: label,
        selected: isChecked,
        width: "auto",
      };

      options.push(option);
    }

    const section = Section([Row([RadioInput("", options, "vertical")])]);

    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = 7;
    const marginBottom = 7;

    //set margin and font size
    for (let i = 0; i < options.length; i++) {
      const path = this.getPath(section, options[i].itemLabel);
      if (path) {
        let obj = section;
        for (let j = 0; j < path.length; j++) {
          obj = obj[path[j]];
          if (j === path.length - 3) {
            obj.columnGap = 10;
            obj.margin = [marginLeft, marginTop, 0, marginBottom];
          }
        }
        obj.fontSize = 13;
        obj.italics = false;
      }
    }

    this.documentDefinition.content.push(section);
  }

  private handleFieldsBlock(child: any, addIndentation: boolean): void {
    //fields of a claimant or defendant representative
    const blockLabelElement = child.querySelector(".pdf-block-label");
    const valueElement = child.querySelector(".pdf-values");

    if (blockLabelElement) {
      const label = {
        text: blockLabelElement.innerText,
      };
      const punctuation = this.getPunctuation(blockLabelElement);

      const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
      const marginTop = 7;
      const marginBottom = 7;

      this.documentDefinition.content.push({
        text: [label, punctuation],
        style: "field",
        margin: [marginLeft, marginTop, 0, marginBottom],
      });
    }

    if (valueElement) {
      if (!child.classList.contains("pdf-no-indentation"))
        this.indentationCount++;
      this.setPdfContent(valueElement.children, true);
      if (!child.classList.contains("pdf-no-indentation"))
        this.indentationCount--;
    }
  }

  private handleLineMultipleFields(
    element: any,
    addIndentation: boolean
  ): void {
    const fields = element.querySelectorAll(".pdf-line-multiple-field");
    const text = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      if (field.classList.contains("pdf-label")) {
        text.push({
          text: field.innerText,
        });
      } else if (field.classList.contains("pdf-value")) {
        text.push({
          text: field.innerText,
          style: "lineValue",
        });
      }
      text.push(this.getPunctuation(field));
    }

    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = addIndentation ? 7 : 10;
    const marginBottom = addIndentation ? 7 : 10;

    this.documentDefinition.content.push({
      text: text,
      style: "field",
      margin: [marginLeft, marginTop, 0, marginBottom],
    });
  }

  private handleCheckbox(element: any, addIndentation: boolean) {
    const checkboxElement = element.querySelector("input[type=checkbox]");
    const labelElement = element.querySelector(".pdf-label");

    const isChecked = checkboxElement.checked;
    const section = Section([
      Row([CheckboxInput(labelElement.innerText, isChecked)]),
    ]);

    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = 7;
    const marginBottom = 7;

    //set margin and font size
    const path = this.getPath(section, labelElement.innerText);
    if (path) {
      let obj = section;
      for (let j = 0; j < path.length; j++) {
        obj = obj[path[j]];
        if (j === path.length - 3) {
          obj.columnGap = 10;
          obj.margin = [marginLeft, marginTop, 0, marginBottom];
        }
      }
      obj.fontSize = 12;
      obj.italics = false;
    }

    this.documentDefinition.content.push(section);
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

  private getPath(obj: any, targetText: string, path: string[] = []): any {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          const newPath = this.getPath(obj[i], targetText, [
            ...path,
            String(i),
          ]);
          if (newPath) {
            return newPath;
          }
        }
      } else {
        if (obj.text && obj.text === targetText) {
          return [...path];
        } else if (obj.stack && obj.stack[0] === targetText) {
          return [...path];
        }

        for (const key in obj) {
          if (Object.hasOwn(obj, key)) {
            const newPath = this.getPath(obj[key], targetText, [...path, key]);
            if (newPath) {
              return newPath;
            }
          }
        }
      }
    }
    return null;
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
