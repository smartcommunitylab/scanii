import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  //append the JS tag to the Document Body.
  public loadScript(renderer: Renderer2, src: string): HTMLScriptElement {
    const script = renderer.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    renderer.appendChild(this.document.body, script);
    return script;
  }
}
