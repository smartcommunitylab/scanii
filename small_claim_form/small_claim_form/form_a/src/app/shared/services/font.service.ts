import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Font } from "src/app/core/common/font.model";

@Injectable({
  providedIn: "root",
})
export class FontService {
  liberationSerifRegularBase64: string = "";
  fonts: Font[] = [];

  constructor(
    private http: HttpClient,
  ) {
    this.fonts.push(
      new Font("FontAwesome", "Arial.ttf", "normal")
    );
  }

  public getFonts(): Font[] {
    return this.fonts;
  }

  loadFont(): void {
    const fontPath = "assets/fonts/Arial.ttf";

    this.http.get(fontPath, { responseType: "arraybuffer" }).subscribe(
      (response: ArrayBuffer) => {
        const buffer = new Uint8Array(response);
        let binaryString = "";
        
        // number of bytes to process at a time
        const chunkSize = 8192;

        for (let i = 0; i < buffer.length; i += chunkSize) {
          const chunk = buffer.subarray(i, i + chunkSize);
          binaryString += String.fromCharCode.apply(null, chunk);
        }

        const base64String = btoa(binaryString);
        this.fonts[0].base64 = base64String;
      },
      (error) => {
        console.error("Error loading font file:", error);
      }
    );
  }
}
