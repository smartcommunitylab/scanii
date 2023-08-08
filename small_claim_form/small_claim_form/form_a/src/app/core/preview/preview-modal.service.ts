import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import jsPDF from "jspdf";

@Injectable({
  providedIn: "root",
})
export class PreviewModalService {
  showSpinner = false;
  previewElementClone: HTMLElement;
  cloneAlreadyChanged = false;

  constructor(private translateService: TranslateService) {}

  generatePdf(downloadPdf: boolean = true): Promise<File | null> {
    const pdf = new jsPDF("p", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const margin = 20;

    this.showSpinner = true;

    const yesNoRadioButtons = this.previewElementClone.querySelectorAll(
      ".yes-no-radio-button"
    );
    this.changePdfContent(
      yesNoRadioButtons,
      ".yes-no-radio-option-div",
      ".yes-no-radio-option",
      ".yes-no-title"
    );
    const contractualStatutoryRadioButtons =
      this.previewElementClone.querySelectorAll(
        ".contractual-statutory-radio-button"
      );
    this.changePdfContent(
      contractualStatutoryRadioButtons,
      ".contractual-statutory-radio-option-div",
      ".contractual-statutory-radio-option",
      ".contractual-statutory-title"
    );

    return new Promise<File | null>((resolve, reject) => {
      setTimeout(() => {
        pdf.html(this.previewElementClone, {
          callback: (pdf) => {
            this.showSpinner = false;

            if (downloadPdf) {
              pdf.save(this.getFileName());
              resolve(null);
            } else {
              const blob = pdf.output("blob");
              const file = new File([blob], this.getFileName(), {
                type: "application/pdf",
              });
              resolve(file);
            }
          },
          width: width,
          windowWidth: 950,
          autoPaging: "text",
          fontFaces: [
            {
              family: "FontAwesome",
              weight: "bold",
              src: [
                {
                  url: "assets/fonts/liberation/LiberationSans-Bold.ttf",
                  format: "truetype",
                },
              ],
            },
            {
              family: "FontAwesome",
              weight: "normal",
              src: [
                {
                  url: "assets/fonts/liberation/LiberationSans-Regular.ttf",
                  format: "truetype",
                },
              ],
            },
          ],
          margin: [margin, 0, margin, 0],
        });
      }, 100);
    });
  }

  private changePdfContent(
    elementsToChange: any,
    radioOptionDivClassName: string,
    radioOptionClassName: string,
    titleClassName: string
  ): void {
    if (!this.cloneAlreadyChanged) {
      this.cloneAlreadyChanged = true;
      for (let i = 0; i < elementsToChange.length; i++) {
        const radioOptionDivs = elementsToChange[i].querySelectorAll(
          radioOptionDivClassName
        );
        let value: string;
        let j: number = 0;
        let checkedElementFound = false;

        //find the checked radio button and get its value
        while (j < radioOptionDivs.length || !checkedElementFound) {
          //get the element inside the div with class "pdf-radio-button"
          const radioOption = radioOptionDivs[j].querySelector(
            radioOptionClassName
          ) as HTMLInputElement;
          if (radioOption.checked) {
            value = radioOption.getAttribute("value");
            checkedElementFound = true;
          }

          j++;
        }

        //append the value after the title
        const title = elementsToChange[i].querySelector(titleClassName);
        const text = title.firstElementChild.textContent;
        if (text[text.length - 1] === "?" || text[text.length - 1] === " ")
          title.firstElementChild.classList.add("space");
        else title.firstElementChild.classList.add("colon");
        const span = document.createElement("span");
        span.classList.add("fw-bold");
        span.style.fontFamily = "FontAwesome, LiberationSans";
        span.innerHTML = value;
        title.appendChild(span);

        //remove all divs with class "remove-radio-button-from-pdf"
        const length = radioOptionDivs.length;
        for (let k = 0; k < length; k++) {
          radioOptionDivs[k].remove();
        }
      }
    }
  }

  private getFileName(): string {
    return `SC_A_${this.formatDate(
      new Date()
    )}_${this.translateService.currentLang.toUpperCase()}.pdf`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}${month}${year}`;
  }
}
