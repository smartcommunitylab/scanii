import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import jsPDF from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Section, Row, CheckboxInput, RadioInput } from "pdfmake-form-elements";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class PreviewModalService {
  showSpinner = false;
  preview: HTMLElement;
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
      tertiaryTitle: {
        fontSize: 14,
        margin: [0, 10, 0, 10],
      },
      field: {
        fontSize: 12,
        alignment: "justify",
        lineHeight: 1.2,
      },
      secondaryField: {
        fontSize: 16,
      },
      tertiaryField: {
        fontSize: 14,
      },
    },
    pageSize: "A4",
    defaultStyle: {
      font: "FontAwesome",
    },
  };
  indentationCount = 0;

  constructor(private translateService: TranslateService) {
    pdfMake.fonts = {
      FontAwesome: {
        normal: `${window.location.origin}${window.location.pathname}assets/fonts/liberation/LiberationSans-Regular.ttf`,
        bold: `${window.location.origin}${window.location.pathname}assets/fonts/liberation/LiberationSans-Bold.ttf`,
        italics: `${window.location.origin}${window.location.pathname}assets/fonts/liberation/LiberationSans-Regular.ttf`,
      },
    };
  }

  generatePdf(downloadPdf: boolean = true): Promise<File | null> {
    this.showSpinner = true;

    return new Promise<File | null>((resolve, reject) => {
      setTimeout(() => {
        this.documentDefinition.content = [];

        this.setPdfContent(this.preview.children, false);

        const gen = pdfMake.createPdf(this.documentDefinition);

        if (downloadPdf) {
          gen.download(this.getFileName());
          resolve(null);
        } else {
          gen.getBlob((blob: Blob) => {
            const file = new File([blob], this.getFileName(), {
              type: "application/pdf",
            });
            resolve(file);
          });
        }

        this.showSpinner = false;
      }, 10);
    });
  }

  private setPdfContent(children: any, addIndentation: boolean): void {
    for (let i = 0; i < children.length; i++) {
      const classList = children[i].classList;
      if (classList.contains("pdf-line-field")) {
        this.handleLineField(children[i], addIndentation);
      } else if (classList.contains("pdf-div-field")) {
        this.handleDivField(children[i], addIndentation);
      } else if (classList.contains("pdf-fields-block")) {
        this.handleFieldsBlock(children[i], addIndentation);
      } else if (classList.contains("pdf-line-multiple-fields")) {
        this.handleLineMultipleFields(children[i], addIndentation);
      } else if (classList.contains("pdf-checkbox")) {
        this.handleCheckbox(children[i], addIndentation);
      } else if (classList.contains("pdf-radio-buttons")) {
        this.handleRadioButtons(children[i], addIndentation);
      } else if (classList.contains("pdf-text")) {
        this.handleText(children[i], addIndentation);
      } else if (classList.contains("pdf-primary-title")) {
        //primary title (class: "pdf-primary-title")
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "primaryTitle",
        });
      } else if (classList.contains("pdf-secondary-title")) {
        //secondary title (class: "pdf-secondary-title")
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "secondaryTitle",
          marginLeft: addIndentation ? this.indentationCount * 15 : 0,
        });
      } else if (classList.contains("pdf-tertiary-title")) {
        //tertiary title (class: "pdf-tertiary-title")
        this.documentDefinition.content.push({
          text: children[i].innerText,
          style: "tertiaryTitle",
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
    //field with label and value on the same line (class: "pdf-line-field")
    const labelElement = child.querySelector(".pdf-label");
    const valueElement = child.querySelector(".pdf-value");
    const isInvertedOrderRequired =
      child.classList.contains("pdf-inverted-order");

    const label = {
      text: labelElement.innerText,
    };
    const labelPunctuation = this.getPunctuation(labelElement);

    let value = {};
    if (valueElement) {
      value = {
        text: valueElement.innerText,
        style: "lineValue",
      };
    }
    const valuePunctuation = this.getPunctuation(valueElement);

    const marginLeft = addIndentation ? this.indentationCount * 15 : 0;
    const marginTop = addIndentation ? 7 : 10;
    const marginBottom = addIndentation ? 7 : 10;

    const style = ["field"];
    if (child.classList.contains("pdf-secondary-field"))
      style.push("secondaryField");
    else if (child.classList.contains("pdf-tertiary-field"))
      style.push("tertiaryField");

    this.documentDefinition.content.push({
      text: !isInvertedOrderRequired
        ? [label, labelPunctuation, value, valuePunctuation]
        : [value, valuePunctuation, label, labelPunctuation],
      style: style,
      margin: [marginLeft, marginTop, 0, marginBottom],
    });
  }

  private handleDivField(child: any, addIndentation: boolean): void {
    //field with label and value on different lines (class: "pdf-div-field")
    const labelElement = child.querySelector(".pdf-label");
    const valueElement = child.querySelector(".pdf-value");

    if (labelElement) {
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
    }

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
    //radio buttons (class: "pdf-radio-buttons")
    let options = [];

    let i = 0;
    let innerFieldsFound = false;

    while (i < element.children.length && !innerFieldsFound) {
      const option = this.getRadioOption(element, i);
      options.push(option);

      const innerFieldsElement = element.children[i].querySelector(
        ".pdf-radio-button-inner-fields"
      );

      if (innerFieldsElement) {
        innerFieldsFound = true;

        this.addSection(options, addIndentation);

        if (!innerFieldsElement.classList.contains("pdf-no-indentation")) {
          this.indentationCount++;
        }
        this.setPdfContent(innerFieldsElement.children, true);
        if (!innerFieldsElement.classList.contains("pdf-no-indentation"))
          this.indentationCount--;
      }

      i++;
    }

    if (innerFieldsFound && i < element.children.length) {
      options = [];
      for (let j = i; j < element.children.length; j++) {
        const option = this.getRadioOption(element, j);
        options.push(option);
      }
      this.addSection(options, addIndentation);
    } else if (!innerFieldsFound) {
      this.addSection(options, addIndentation);
    }
  }

  private getRadioOption(element: any, i: number): any {
    const optionElement =
      element.children[i].querySelector(".pdf-radio-button");
    const labelElement = element.children[i].querySelector(".pdf-label");
    const valueElement = element.children[i].querySelector(
      ".pdf-radio-option-value"
    );

    const isChecked = optionElement.checked;
    let text = labelElement.innerText;

    const punctuation = this.getPunctuation(labelElement);
    text += punctuation;

    if (valueElement) text += valueElement.innerText;

    const option = {
      itemLabel: text,
      selected: isChecked,
      width: "auto",
    };

    return option;
  }

  private addSection(options: any, addIndentation: boolean): void {
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
        obj.fontSize = 12;
        obj.italics = false;
      }
    }

    this.documentDefinition.content.push(section);
  }

  private handleFieldsBlock(child: any, addIndentation: boolean): void {
    //block with a label and multiple inner fields (class: "pdf-fields-block")
    const blockLabelElement = child.querySelector(".pdf-block-label");
    const valuesElement = child.querySelector(".pdf-values");

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

    if (valuesElement) {
      if (!child.classList.contains("pdf-no-indentation"))
        this.indentationCount++;
      this.setPdfContent(valuesElement.children, true);
      if (!child.classList.contains("pdf-no-indentation"))
        this.indentationCount--;
    }
  }

  private handleLineMultipleFields(
    element: any,
    addIndentation: boolean
  ): void {
    //line with multiple fields and labels (class: "pdf-line-multiple-fields")
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
    //checkbox (class: "pdf-checkbox")
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
    //text (class: "pdf-text")
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
    else if (element.classList.contains("percentage")) return "% ";
    else return "";
  }

  private getFileName(): string {
    return `SC_A_PDF_${this.formatDate(
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
