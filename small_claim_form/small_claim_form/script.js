JSON_PATH = `${getBaseHref()}assets/json/`;
I18N_PATH = `${getBaseHref()}assets/i18n/`;

let version = "original";
let currentLang;
let currentStep = 1;
let interaction = null;
let translations = null;
let simplificatinBoxTooltipStyle;
let isWarningStepVisible = false;

this.initializeLanguage();
if (window.addEventListener) {
  window.addEventListener("storage", this.storageListener.bind(this), false);
}

initializeForm();

setInterval(function () {
  $("[data-bs-toggle='tooltip']").tooltip();
}, 1000);

function getBaseHref() {
  const base = document.querySelector("base");
  return base ? base.getAttribute("href") : "/";
}

function storageListener() {
  const lang = localStorage.getItem("lang");

  if (!lang || typeof lang !== "string") this.initializeLanguage();
  else currentLang = lang;

  resetForm();
  initializeForm().then(() => {
    translatePage();
  });
}

function initializeForm() {
  return new Promise((resolve) => {
    let model = null;
    main().then(() => {
      return resolve();
    });
  });
}

async function main() {
  return new Promise(async (resolve) => {
    let modelRequest = await fetch(JSON_PATH + "model.json");
    model = await modelRequest.json();

    let interactionRequest = await fetch(
      JSON_PATH + "interaction_" + currentLang + ".json"
    );
    interaction = await interactionRequest.json();

    let translationsRequest = await fetch(I18N_PATH + currentLang + ".json");
    translations = await translationsRequest.json();

    model.blocks.forEach((block) => {
      processBlock(block);
    });

    showInfo(currentStep);

    return resolve();
  });
}

function resetForm() {
  let elements = document.querySelectorAll("[concept]");
  elements.forEach((element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  });

  let divLegal = document.getElementById("legal_information");
  while (divLegal.firstChild) {
    divLegal.removeChild(divLegal.firstChild);
  }

  let divSynonyms = document.getElementById("synonyms_info");
  while (divSynonyms.firstChild) {
    divSynonyms.removeChild(divSynonyms.firstChild);
  }
  let ul = document.createElement("ul");
  divSynonyms.append(ul);

  if (version === "simplyfied") {
    version = "original";

    simplificatinBoxTooltipStyle.remove();

    setTimeout(() => {
      hideToast();
      setCompleteVersionButton(document.getElementById("simplyfied_btn"));
    }, 50);
  }
}

function initializeLanguage() {
  currentLang = localStorage.getItem("lang");
  if (!currentLang || typeof currentLang !== "string") {
    currentLang = "en";
    localStorage.setItem("lang", currentLang);
  }
}

function translatePage() {
  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    translateElement(element);
  });
}

function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const keys = key.split(".");
  let t = translations;
  keys.forEach((key) => {
    t = t[key];
  });
  element.innerText = t;
}

function closeAccordion(event) {
  if (event.target.getAttribute("accordion-is-collapsed") === "false") {
    // accordion is open and needs to be closed
    var accordionCntId = event.target.getAttribute("aria-controls");
    var accordionCnt = document.getElementById(accordionCntId);

    event.target.setAttribute(
      "accordion-is-collapsed",
      event.target.getAttribute("accordion-is-collapsed") === "true"
        ? "false"
        : "true"
    );

    setTimeout(function () {
      event.target.classList.add("collapsed");
      event.target.setAttribute("aria-expanded", "false");

      accordionCnt.classList.remove("show");
    }, 8);
  } else {
    // accordion is closed and the click on it opens it
    event.target.setAttribute(
      "accordion-is-collapsed",
      event.target.getAttribute("accordion-is-collapsed") === "true"
        ? "false"
        : "true"
    );
  }
}

function showInfo(step) {
  currentStep = step;
  showPdf(step);
  showSynonyms(step);
}

function showPdf(step) {
  divLegal = document.querySelectorAll("[scanii_pdf_step]");
  for (i = 0; i < divLegal.length; i++) {
    divLegal[i].style.display = "none";
  }

  // show pdf legal
  divLegal = document.querySelectorAll(
    '[scanii_pdf_step*="' + "step" + step + '"]'
  );

  let span = document.getElementById("no_pdf_label");

  if (divLegal.length > 0) {
    if (span) span.style.display = "none";
    divLegal.forEach((element) => {
      element.style.display = "initial";
    });
  } else {
    if (typeof span !== "undefined" && span !== null) {
      span.style.display = "contents";
    } else {
      span = document.createElement("span");
      span.setAttribute("id", "no_pdf_label");
      span.setAttribute("style", "display: contents;");
      span.setAttribute("data-i18n-key", "menu.noPDFs");
      const div = document.getElementById("legal_information");
      if (div) {
        const text = translations.menu.noPDFs;
        span.innerText = text;
        div.append(span);
      }
    }
  }

  document.activeElement.blur();
}

function showSynonyms(step) {
  let listItems = document.querySelectorAll("[scanii_synonyms_step]");
  for (i = 0; i < listItems.length; i++) {
    listItems[i].style.display = "none";
  }

  listItems = document.querySelectorAll(
    '[scanii_synonyms_step*="' + "step" + step + '"]'
  );

  let span = document.getElementById("no_synonyms_label");

  if (listItems.length > 0) {
    if (span) span.style.display = "none";
    listItems.forEach((element) => {
      element.style.display = "list-item";
      element.style.width = "fit-content";
    });
  } else {
    if (typeof span !== "undefined" && span !== null) {
      span.style.display = "contents";
    } else {
      span = document.createElement("span");
      span.setAttribute("id", "no_synonyms_label");
      span.setAttribute("style", "display: contents;");
      span.setAttribute("data-i18n-key", "menu.noSynonyms");
      const div = document.getElementById("synonyms_info");
      if (div) {
        const text = translations.menu.noSynonyms;
        span.innerText = text;
        div.append(span);
      }
    }
  }

  document.activeElement.blur();
}

function showText(type, hideToast) {
  bookIcon = document.getElementById("initial_icon");
  if (bookIcon) {
    bookIcon.style.display = "none";
  }
  divLegal = document.querySelectorAll("[simplyfied]");
  for (i = 0; i < divLegal.length; i++) {
    divLegal[i].style.display = "none";
  }
  divLegal = document.querySelectorAll("[original]");
  for (i = 0; i < divLegal.length; i++) {
    divLegal[i].style.display = "none";
  }
  divLegal = document.querySelectorAll("[" + type + "");
  for (i = 0; i < divLegal.length; i++) {
    divLegal[i].style.display = "block";
    divLegal[i].classList.add("simplified_description");
  }

  btn = document.getElementById("simplyfied_btn");
  const toastClosureBtn = document.getElementById("close_warning_toast_button");

  const toastElement = document.getElementById("warning_toast");
  toast = new bootstrap.Toast(toastElement);

  if (type.includes("simplyfied")) {
    version = "simplyfied";

    setSimplifiedVersioButton(btn);

    //add simplification box tooltip style
    simplificatinBoxTooltipStyle = document.head.appendChild(
      document.createElement("style")
    );
    simplificatinBoxTooltipStyle.innerHTML =
      ".simplification-box .tooltip-inner { background-color: rgb(247, 250, 160) !important;} .simplification-box .tooltip-arrow::before { border-top-color: rgb(247, 250, 160) !important; }";

    if (typeof hideToast === "undefined") {
      toast.show();
      isWarningStepVisible = true;

      btn.setAttribute("onClick", 'showText("original")');
      toastClosureBtn.setAttribute("onClick", "hideToast()");
    }

    // hide pdf legal
    simplificationBoxs = document.querySelectorAll(
      "[scanii_simplificationBox]"
    );

    const word = translations.menu.simplifiedText;
    for (i = 0; i < divLegal.length; i++) {
      simplificationBoxs[i].style =
        "margin-top: 20px; background-color: #F7FAA0 ; padding: 10px; border: 0px; ";

      const text =
        "<span data-i18n-key='menu.simplifiedText'>" + word + "</span>";
      simplificationBoxs[i].setAttribute("data-bs-original-title", text);
    }
  } else {
    version = "original";

    simplificatinBoxTooltipStyle.remove();

    setCompleteVersionButton(btn);

    simplificationBoxs = document.querySelectorAll(
      "[scanii_simplificationBox]"
    );

    const word = translations.menu.originalText;
    for (i = 0; i < divLegal.length; i++) {
      simplificationBoxs[i].style =
        "margin-top: 20px; background-color: #cce6ff ; padding: 10px; border: 0px ";

      const text =
        "<span data-i18n-key='menu.originalText'>" + word + "</span>";
      simplificationBoxs[i].setAttribute("data-bs-original-title", text);
    }

    this.hideToast();
  }
}

function setCompleteVersionButton(btn) {
  // add button icon
  const icon =
    '<svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: text-top;"><path d="M3.54545 11.7188C4.15909 11.7188 4.75284 11.8164 5.3267 12.0117C5.90057 12.207 6.46591 12.5 7.02273 12.8906V2.88281C6.51136 2.41406 5.95739 2.05078 5.3608 1.79297C4.7642 1.53516 4.15909 1.40625 3.54545 1.40625C3.11364 1.40625 2.69034 1.48047 2.27557 1.62891C1.8608 1.77734 1.44318 1.96094 1.02273 2.17969V12.3516C1.375 12.1328 1.77557 11.9727 2.22443 11.8711C2.6733 11.7695 3.11364 11.7188 3.54545 11.7188ZM8.04545 12.8906C8.61364 12.5 9.17045 12.207 9.71591 12.0117C10.2614 11.8164 10.8409 11.7188 11.4545 11.7188C11.8864 11.7188 12.3324 11.7656 12.7926 11.8594C13.2528 11.9531 13.6477 12.0781 13.9773 12.2344V2.17969C13.5909 1.91406 13.1818 1.71875 12.75 1.59375C12.3182 1.46875 11.8864 1.40625 11.4545 1.40625C10.8409 1.40625 10.2472 1.53516 9.6733 1.79297C9.09943 2.05078 8.55682 2.41406 8.04545 2.88281V12.8906ZM7.53409 15C6.95455 14.4062 6.32386 13.9492 5.64205 13.6289C4.96023 13.3086 4.26136 13.1484 3.54545 13.1484C3.125 13.1484 2.71591 13.2188 2.31818 13.3594C1.92045 13.5 1.52273 13.6719 1.125 13.875C0.863636 14.0469 0.610795 14.0234 0.366477 13.8047C0.122159 13.5859 0 13.2734 0 12.8672V2.01562C0 1.78125 0.0397727 1.56641 0.119318 1.37109C0.198864 1.17578 0.318182 1.02344 0.477273 0.914062C0.954545 0.601562 1.4517 0.371094 1.96875 0.222656C2.4858 0.0742189 3.01136 0 3.54545 0C4.26136 0 4.95739 0.132813 5.63352 0.398438C6.30966 0.664063 6.94318 1.07031 7.53409 1.61719C8.11364 1.07031 8.7358 0.664063 9.40057 0.398438C10.0653 0.132813 10.75 0 11.4545 0C11.9886 0 12.5114 0.0742189 13.0227 0.222656C13.5341 0.371094 14.0284 0.601562 14.5057 0.914062C14.6648 1.02344 14.7869 1.17578 14.8722 1.37109C14.9574 1.56641 15 1.78125 15 2.01562V12.8672C15 13.3047 14.8722 13.6367 14.6165 13.8633C14.3608 14.0898 14.108 14.0937 13.858 13.875C13.4716 13.6562 13.0795 13.4805 12.6818 13.3477C12.2841 13.2148 11.875 13.1484 11.4545 13.1484C10.7386 13.1484 10.0511 13.3125 9.39205 13.6406C8.73295 13.9687 8.11364 14.4219 7.53409 15Z" fill="white"/></svg>';
  const text = translations.menu.completeVersion;
  btn.innerHTML =
    icon +
    '<i style="cursor: default;">&nbsp;</i><span style="cursor: pointer;" data-i18n-key="menu.completeVersion">' +
    text +
    "</span>";
}

function setSimplifiedVersioButton(btn) {
  // add button icon
  const icon =
    '<svg width="17" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: text-bottom"><path d="M7.5 15C6.95455 14.5128 6.36364 14.1346 5.72727 13.8654C5.09091 13.5962 4.43182 13.4615 3.75 13.4615C3.27273 13.4615 2.80398 13.5321 2.34375 13.6731C1.88352 13.8141 1.44318 14.0128 1.02273 14.2692C0.784091 14.4103 0.553977 14.4038 0.332386 14.25C0.110795 14.0962 0 13.8718 0 13.5769V4.30769C0 4.16667 0.03125 4.03205 0.09375 3.90385C0.15625 3.77564 0.25 3.67949 0.375 3.61538C0.897727 3.30769 1.44318 3.07692 2.01136 2.92308C2.57955 2.76923 3.15909 2.69231 3.75 2.69231C4.40909 2.69231 5.05398 2.78846 5.68466 2.98077C6.31534 3.17308 6.92045 3.46154 7.5 3.84615V13.5769C8.07955 13.1538 8.6875 12.8365 9.32386 12.625C9.96023 12.4135 10.6023 12.3077 11.25 12.3077C11.6591 12.3077 12.1051 12.3526 12.5881 12.4423C13.071 12.5321 13.5341 12.7179 13.9773 13V3.28846C14.0909 3.33974 14.2017 3.39103 14.3097 3.44231C14.4176 3.49359 14.5227 3.55128 14.625 3.61538C14.7386 3.69231 14.8295 3.79167 14.8977 3.91346C14.9659 4.03526 15 4.16667 15 4.30769V13.5769C15 13.8718 14.8892 14.0962 14.6676 14.25C14.446 14.4038 14.2159 14.4103 13.9773 14.2692C13.5568 14.0128 13.1165 13.8141 12.6562 13.6731C12.196 13.5321 11.7273 13.4615 11.25 13.4615C10.5682 13.4615 9.90909 13.5962 9.27273 13.8654C8.63636 14.1346 8.04545 14.5128 7.5 15ZM8.52273 11.7885V5L12.9545 0V7.44231L8.52273 11.7885ZM6.47727 13V4.55769C6.09091 4.3141 5.64205 4.13462 5.13068 4.01923C4.61932 3.90385 4.15909 3.84615 3.75 3.84615C3.21591 3.84615 2.71875 3.91026 2.25852 4.03846C1.7983 4.16667 1.38636 4.33333 1.02273 4.53846V13C1.42045 12.7821 1.84943 12.6122 2.30966 12.4904C2.76989 12.3686 3.25568 12.3077 3.76705 12.3077C4.26705 12.3077 4.74432 12.3686 5.19886 12.4904C5.65341 12.6122 6.07955 12.7821 6.47727 13Z" fill="white"/></svg>';
  const text = translations.menu.simplifiedVersion;
  btn.innerHTML =
    icon +
    '<i style="cursor: default;">&nbsp;</i><span style="cursor: pointer;" data-i18n-key="menu.simplifiedVersion">' +
    text +
    "</span>";
}

function pdfShow(pdfId) {
  divLink = document.getElementById(pdfId);
  if (divLink) {
    divLink.classList.add("pop-outin");
  }
}

function pdfHide(pdfId) {
  divLink = document.getElementById(pdfId);
  if (divLink) {
    divLink.classList.remove("pop-outin");
  }
}

function processBlock(block) {
  console.log("processing block " + block.id);

  if (typeof block.concept != "undefined" && block.concept) {
    processConcept(block.id, block.concept);
  }

  if (typeof block.blocks != "undefined" && block.blocks) {
    block.blocks.forEach((subBlock) => {
      processBlock(subBlock);
    });
  }
}

function processLegalInfo(blockId, concept, infoElement) {
  divLegal = document.getElementById("legal_information");
  if (divLegal) {
    console.log("blockId=" + blockId);

    infoElement.link.forEach((link) => {
      if (
        typeof link !== "undefined" &&
        link !== null &&
        link.url !== "" &&
        link.type === "LEGAL_LINK"
      ) {
        let div = document.getElementById(link.url);

        if (typeof div != "undefined" && div !== null) {
          let attributeValue = div.getAttribute("scanii_pdf_step");
          div.setAttribute("scanii_pdf_step", attributeValue + "," + blockId);
        } else {
          div = document.createElement("div");
          div.setAttribute("scanii_pdf_step", blockId);
          div.setAttribute("id", link.url);
          div.className = "list-item";
          a = document.createElement("a");
          a.href = link.url;
          a.setAttribute("target", "_blank");
          a.text = link.name;
          a.setAttribute("data-bs-toggle", "tooltip");
          a.setAttribute("data-bs-placement", "top");
          a.setAttribute("data-bs-custom-class", "tooltip pdf-tooltip");
          a.setAttribute("data-bs-title", link.description);
          div.append(a);
          divLegal.append(div);
        }
      }
    });
  }
}

function processConcept(blockId, concept) {
  console.log(" processing concept " + concept);
  if (concept.includes("ONE_OR_MANY")) {
    let length = concept.toString().length;
    length = length - 13;
    concept = concept.substr(12, length);
  }
  console.log(" find concept " + concept);

  let interactionElements = interaction.concepts.filter(
    (element) => element.id == concept || element.id.includes(concept + ".")
  );
  if (typeof interactionElements != "undefined" && interactionElements) {
    interactionElements.forEach((interactionElement) => {
      interactionElement.infoElements.forEach((infoElement) => {
        processInfoElement(blockId, interactionElement.id, infoElement);
      });
    });
  }
}

function processInfoElement(
  blockId,
  concept,
  infoElement,
  addOnlyToLast = false
) {
  console.log(" processing infoElement " + infoElement.type);
  if (infoElement.type == "DESCRIPTION")
    processInfoElementDescription(concept, infoElement, blockId);

  processLegalInfo(blockId, concept, infoElement);

  if (infoElement.type == "INFORMATION")
    processInfoElementInformation(concept, infoElement, blockId, addOnlyToLast);
}

function processInfoElementDescription(concept, infoElement, blockId) {
  elements = $('[concept="' + concept + '"]');
  let description = infoElement.text;

  // process description text start
  // process the words
  let list = [];
  let pos = 0;

  const parentElement = document.getElementById("synonyms_info");
  if (parentElement) {
    const ul = parentElement.querySelector("ul");

    infoElement.words.forEach((word) => {
      keyPos = word.position.substr(0, word.position.indexOf("-"));
      keyLen = word.position.substr(word.position.indexOf("-") + 1);
      keyPos = keyPos - 1;
      key = description.substr(keyPos, keyLen);
      preText = document.createElement("span");
      preText.innerHTML = description.substr(
        pos,
        parseInt(keyPos) - parseInt(pos)
      );

      pos = parseInt(keyPos) + parseInt(keyLen);
      list.push(preText);
      keyTextNode = document.createTextNode(key);

      span = document.createElement("span");
      span.setAttribute("style", "background-color: #B7CCF4;");
      text = word.definition;
      if (
        typeof word.synonyms != "undefined" &&
        word.synonyms &&
        word.synonyms.length > 0
      ) {
        synmsList = "<ul>";
        for (let i = 0; i < word.synonyms.length; i++) {
          synmsList += "<li>" + word.synonyms[i] + "</li>";
        }
        synmsList += "</ul>";

        synms = "";
        for (let i = 0; i < word.synonyms.length; i++) {
          if (i == word.synonyms.length - 1)
            synms += uncapitalizeFirstLetter(word.synonyms[i]) + ".";
          else synms += uncapitalizeFirstLetter(word.synonyms[i]) + ", ";
        }

        text =
          text +
          " <span data-i18n-key='menu.synonyms'>" +
          translations.menu.synonyms +
          "</span>: " +
          synms;

        const id = convertToCamelCase(word.text);
        let li = document.getElementById(id);

        if (typeof li != "undefined" && li !== null) {
          let attributeValue = li.getAttribute("scanii_synonyms_step");
          li.setAttribute(
            "scanii_synonyms_step",
            attributeValue + "," + blockId
          );
        } else {
          li = document.createElement("li");
          li.setAttribute("scanii_synonyms_step", blockId);
          li.setAttribute("id", id);
          li.setAttribute("data-bs-toggle", "tooltip");
          li.setAttribute("data-bs-placement", "top");
          li.setAttribute("data-bs-html", "true");
          li.setAttribute("data-bs-custom-class", "tooltip synonym-tooltip");
          li.setAttribute("data-bs-title", synmsList);
          li.innerText = capitalizeFirstLetter(word.text);
          ul.append(li);
        }
      }
      span.setAttribute("data-bs-toggle", "tooltip");
      span.setAttribute("data-bs-placement", "top");
      span.setAttribute("data-bs-html", "true");
      span.setAttribute("data-bs-custom-class", "tooltip word-tooltip");
      span.setAttribute("data-bs-title", text);

      span.append(keyTextNode);

      list.push(span);
    });
  }

  text = document.createElement("span");
  text.innerHTML = description.substr(pos);
  list.push(text);

  descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("original", "");
  descriptionDiv.setAttribute("class", "description");
  list.forEach((tmp) => {
    descriptionDiv.append(tmp);
  });
  htmlFragment = descriptionDiv.innerHTML;

  // process links
  infoElement.link.forEach((link) => {
    if (typeof link.url != "undefined" && link.url && link.url != "") {
      replaceText = "";
      if (
        typeof link.description != "undefined" &&
        link.description &&
        link.description != ""
      )
        //replaceText = '<a target=”_blank” title="' + link.description + '" href="' + link.url + '" onmouseover="pdfShow(\''+link.url+'"\')">' + link.name + '</a>';
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.name +
          "</a>";
      else
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.name +
          "</a>";
      htmlFragment = htmlFragment.replaceAll(link.url, replaceText);
    }
    if (typeof link.text != "undefined" && link.text && link.text != "") {
      replaceText = "";
      if (
        typeof link.description != "undefined" &&
        link.description &&
        link.description != ""
      )
        //replaceText = '<a target=”_blank” title="' + link.description + '" href="' + link.url + '" onmouseover="pdfShow(\''+link.url+'"\')">' + link.name + '</a>';
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.text +
          "</a>";
      else
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.text +
          "</a>";
      htmlFragment = htmlFragment.replaceAll(link.text, replaceText);
    }
  });

  descriptionDiv.innerHTML = htmlFragment;
  // process description text end

  //add simplyfied text
  divSimp = document.createElement("div");
  divSimp.setAttribute("simplyfied", "");
  divSimp.innerHTML = infoElement.simplifiedText;
  divSimp.style.display = "none";

  // add simplification box
  simplificationBox = document.createElement("div");
  simplificationBox.style =
    "min-height: 1px;max-height: 3px;margin-top: 20px;background-color: #cce6ff ; padding: 10px; border: 0px";
  simplificationBox.setAttribute("data-bs-toggle", "tooltip");
  simplificationBox.setAttribute("data-bs-placement", "top");
  simplificationBox.setAttribute("data-bs-html", "true");
  simplificationBox.setAttribute(
    "data-bs-custom-class",
    "tooltip simplification-box box-tooltip"
  );
  const word = translations.menu.originalText;
  simplificationBox.setAttribute(
    "data-bs-original-title",
    "<span data-i18n-key='menu.originalText'>" + word + "</span>"
  );

  simplificationBox.setAttribute("scanii_simplificationBox", "");
  simplificationBox.setAttribute("class", "description");

  //separatore div
  separatorBox = document.createElement("span");
  separatorBox.style = "padding: 10px; ";

  // add yellow box start
  accordionDiv = document.createElement("div");
  accordionDiv.setAttribute("class", "accordion bs-success-rgb");
  accordionDiv.style =
    "background-color: #F9E79F ; padding: 10px; border: 1px solid green;";
  accordionItm = document.createElement("div");
  accordionItm.setAttribute("class", "accordion-item");
  accordionCnt = document.createElement("div");
  accordionCnt.setAttribute("id", concept);
  accordionCnt.setAttribute("class", "accordion-collapse collapse");
  accordionCnt.setAttribute("aria-labelledby", concept);

  yellowDiv = document.createElement("div");
  yellowDiv.setAttribute("class", "accordion-body");

  accordionCnt.append(yellowDiv);
  accordionCnt.style =
    "background-color: #F9E79F ; padding: 10px; border: 0px ";
  accordionBtn = document.createElement("button");
  accordionBtn.setAttribute("class", "accordion-button collapsed ");
  accordionBtn.setAttribute("type", "button");
  accordionBtn.setAttribute("data-bs-toggle", "collapse");
  accordionBtn.setAttribute("data-bs-target", "#" + concept);
  accordionBtn.setAttribute("aria-expanded", "true");
  accordionBtn.setAttribute("accordion-is-collapsed", "true");
  accordionBtn.setAttribute("aria-controls", concept);
  accordionBtn.style =
    "background-color: #F9E79F; color: black; font-size:15px;";

  accordionBtn.innerHTML =
    "<span data-i18n-key='menu.details'>" +
    translations.menu.details +
    "</span>";
  accordionBtn.setAttribute("onClick", "closeAccordion(event)");
  accordionItm.append(accordionBtn);
  accordionItm.append(accordionCnt);
  accordionDiv.append(accordionItm);
  accordionDiv.style = "background-color: #F9E79F ;";

  infoElement.link.forEach((link) => {
    if (link.type == "HOW_TO_LINK" || link.type == "DESCRIPTION_LINK") {
      a = document.createElement("a");
      a.href = link.url;
      a.setAttribute("target", "_blank");
      //a.title = link.description;
      a.innerText = link.name;
      text = document.createElement("span");
      text.innerText = " " + link.description;
      yellowDiv.append(a);
      yellowDiv.append(text);
      //yellowDiv.setAttribute('title', link.description);
      yellowDiv.append(document.createElement("br"));
    }
    if (link.type == "SERVICE_LINK") {
      if (typeof link.htmlFragment != "undefined" && link.htmlFragment != "") {
        divTmp = document.createElement("div");
        divTmp.innerHTML = link.htmlFragment;
        text = document.createElement("span");
        text.innerText = " " + link.description;
        yellowDiv.append(text);
        yellowDiv.append(divTmp);

        yellowDiv.append(document.createElement("br"));
      }
      if (typeof link.url != "undefined" && link.url != "") {
        a = document.createElement("a");
        a.href = link.url;
        a.setAttribute("target", "_blank");
        a.innerText = link.name;
        text = document.createElement("span");
        text.innerText = " " + link.description;
        yellowDiv.append(a);
        yellowDiv.append(text);
        yellowDiv.append(document.createElement("br"));
      }
    }
  });
  // add yellow box end

  let divToAdd = document.createElement("div");
  divToAdd.append(descriptionDiv);
  divToAdd.append(divSimp);
  divToAdd.append(simplificationBox);
  divToAdd.append(separatorBox);
  if (yellowDiv.innerHTML != "") divToAdd.append(accordionDiv);

  for (let i = 0; i < elements.length; i++) {
    const clone = divToAdd.cloneNode(true);
    elements[i].insertBefore(clone, elements[i].firstChild);
  }
}

function convertToCamelCase(word) {
  const words = word.split(" ");

  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  return camelCaseWords.join("");
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function uncapitalizeFirstLetter(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

function waitForElements(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve();
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelectorAll(selector)) {
        resolve();
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function processClaimantDefendantRepresentativeConcept(
  blockId,
  concept,
  addOnlyToLast = false
) {
  console.log("processing representative concept " + concept);

  if (!interaction) {
    let interactionRequest = await fetch(
      JSON_PATH + "interaction_" + currentLang + ".json"
    );
    interaction = await interactionRequest.json();
  }

  const interactionElement = interaction.concepts.find(
    (element) => element.id == concept
  );

  if (typeof interactionElement != "undefined" && interactionElement) {
    interactionElement.infoElements.forEach((infoElement) => {
      processInfoElement(
        blockId,
        interactionElement.id,
        infoElement,
        addOnlyToLast
      );
    });
  }

  if (version === "simplyfied") {
    showText("simplyfied", true);
  }

  waitForElements("[data-bs-toggle='tooltip']").then(() => {
    $("[data-bs-toggle='tooltip']").tooltip();
  });
}

function processInfoElementInformation(
  concept,
  infoElement,
  blockId,
  addOnlyToLast = false
) {
  elements = $('[concept="' + concept + '"]');
  let description = infoElement.text;

  // process information text start
  // process the words
  let list = [];
  let pos = 0;

  const parentElement = document.getElementById("synonyms_info");
  if (parentElement) {
    const ul = parentElement.querySelector("ul");

    infoElement.words.forEach((word) => {
      keyPos = word.position.substr(0, word.position.indexOf("-"));
      keyLen = word.position.substr(word.position.indexOf("-") + 1);
      keyPos = keyPos - 1;
      key = description.substr(keyPos, keyLen);
      preText = document.createElement("span");
      preText.innerHTML = description.substr(
        pos,
        parseInt(keyPos) - parseInt(pos)
      );

      pos = parseInt(keyPos) + parseInt(keyLen);
      list.push(preText);
      keyTextNode = document.createTextNode(key);

      span = document.createElement("span");
      span.setAttribute("style", "background-color: #B7CCF4;");
      text = word.definition;
      if (
        typeof word.synonyms != "undefined" &&
        word.synonyms &&
        word.synonyms.length > 0
      ) {
        synmsList = "<ul>";
        for (let i = 0; i < word.synonyms.length; i++) {
          synmsList += "<li>" + word.synonyms[i] + "</li>";
        }
        synmsList += "</ul>";

        synms = "";
        for (let i = 0; i < word.synonyms.length; i++) {
          if (i == word.synonyms.length - 1)
            synms += uncapitalizeFirstLetter(word.synonyms[i]) + ".";
          else synms += uncapitalizeFirstLetter(word.synonyms[i]) + ", ";
        }

        text =
          text +
          " <span data-i18n-key='menu.synonyms'>" +
          translations.menu.synonyms +
          "</span>: " +
          synms;

        const id = convertToCamelCase(word.text);
        let li = document.getElementById(id);

        if (typeof li != "undefined" && li !== null) {
          let attributeValue = li.getAttribute("scanii_synonyms_step");
          li.setAttribute(
            "scanii_synonyms_step",
            attributeValue + "," + blockId
          );
        } else {
          li = document.createElement("li");
          li.setAttribute("scanii_synonyms_step", blockId);
          li.setAttribute("id", id);
          li.setAttribute("data-bs-toggle", "tooltip");
          li.setAttribute("data-bs-placement", "top");
          li.setAttribute("data-bs-html", "true");
          li.setAttribute("data-bs-custom-class", "tooltip synonym-tooltip");
          li.setAttribute("data-bs-title", synmsList);
          li.innerText = capitalizeFirstLetter(word.text);
          ul.append(li);
        }
      }
      span.setAttribute("data-bs-toggle", "tooltip");
      span.setAttribute("data-bs-placement", "top");
      span.setAttribute("data-bs-html", "true");
      span.setAttribute("data-bs-custom-class", "tooltip word-tooltip");
      span.setAttribute("data-bs-title", text);

      span.append(keyTextNode);

      list.push(span);
    });
  }

  text = document.createElement("span");
  text.innerHTML = description.substr(pos);
  list.push(text);

  descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("original", "");
  descriptionDiv.setAttribute("class", "description");
  list.forEach((tmp) => {
    descriptionDiv.append(tmp);
  });
  htmlFragment = descriptionDiv.innerHTML;

  // process links
  infoElement.link.forEach((link) => {
    if (typeof link.url != "undefined" && link.url && link.url != "") {
      replaceText = "";
      if (
        typeof link.description != "undefined" &&
        link.description &&
        link.description != ""
      )
        //replaceText = '<a target=”_blank” title="' + link.description + '" href="' + link.url + '" onmouseover="pdfShow(\''+link.url+'"\')">' + link.name + '</a>';
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.name +
          "</a>";
      else
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.name +
          "</a>";
      htmlFragment = htmlFragment.replaceAll(link.url, replaceText);
    }
    if (typeof link.text != "undefined" && link.text && link.text != "") {
      replaceText = "";
      if (
        typeof link.description != "undefined" &&
        link.description &&
        link.description != ""
      )
        //replaceText = '<a target=”_blank” title="' + link.description + '" href="' + link.url + '" onmouseover="pdfShow(\''+link.url+'"\')">' + link.name + '</a>';
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.text +
          "</a>";
      else
        replaceText =
          '<a  target=”_blank” href="' +
          link.url +
          '" onmouseout="pdfHide(\'' +
          link.url +
          "')\"" +
          '" onmouseover="pdfShow(\'' +
          link.url +
          "')\">" +
          link.text +
          "</a>";
      htmlFragment = htmlFragment.replaceAll(link.text, replaceText);
    }
  });

  descriptionDiv.innerHTML = htmlFragment;
  // process information text end

  //add simplyfied text
  divSimp = document.createElement("div");
  divSimp.setAttribute("simplyfied", "");
  divSimp.innerHTML = infoElement.simplifiedText;
  divSimp.style.display = "none";

  // add simplification box
  simplificationBox = document.createElement("div");
  simplificationBox.style =
    "min-height: 1px;max-height: 3px;margin-top: 20px;background-color: #cce6ff ; padding: 10px; border: 0px";
  simplificationBox.setAttribute("data-bs-toggle", "tooltip");
  simplificationBox.setAttribute("data-bs-placement", "top");
  simplificationBox.setAttribute("data-bs-html", "true");
  simplificationBox.setAttribute(
    "data-bs-custom-class",
    "tooltip simplification-box box-tooltip"
  );
  const word = translations.menu.originalText;
  simplificationBox.setAttribute(
    "data-bs-original-title",
    "<span data-i18n-key='menu.originalText'>" + word + "</span>"
  );

  simplificationBox.setAttribute("scanii_simplificationBox", "");
  simplificationBox.setAttribute("class", "description");

  //separatore div
  separatorBox = document.createElement("span");
  separatorBox.style = "padding: 10px; ";

  // add yellow box start
  accordionDiv = document.createElement("div");
  accordionDiv.setAttribute("class", "accordion bs-success-rgb");
  accordionDiv.style =
    "background-color: #F9E79F ; padding: 10px; border: 1px solid green;";
  accordionItm = document.createElement("div");
  accordionItm.setAttribute("class", "accordion-item");
  accordionCnt = document.createElement("div");
  accordionCnt.setAttribute("id", concept);
  accordionCnt.setAttribute("class", "accordion-collapse collapse");
  accordionCnt.setAttribute("aria-labelledby", concept);

  yellowDiv = document.createElement("div");
  yellowDiv.setAttribute("class", "accordion-body");

  accordionCnt.append(yellowDiv);
  accordionCnt.style =
    "background-color: #F9E79F ; padding: 10px; border: 0px ";
  accordionBtn = document.createElement("button");
  accordionBtn.setAttribute("class", "accordion-button collapsed ");
  accordionBtn.setAttribute("type", "button");
  accordionBtn.setAttribute("data-bs-toggle", "collapse");
  accordionBtn.setAttribute("data-bs-target", "#" + concept);
  accordionBtn.setAttribute("aria-expanded", "true");
  accordionBtn.setAttribute("accordion-is-collapsed", "true");
  accordionBtn.setAttribute("aria-controls", concept);
  accordionBtn.style =
    "background-color: #F9E79F; color: black; font-size:15px;";

  accordionBtn.innerHTML =
    "<span data-i18n-key='menu.details'>" +
    translations.menu.details +
    "</span>";
  accordionBtn.setAttribute("onClick", "closeAccordion(event)");
  accordionItm.append(accordionBtn);
  accordionItm.append(accordionCnt);
  accordionDiv.append(accordionItm);
  accordionDiv.style = "background-color: #F9E79F ;";

  infoElement.link.forEach((link) => {
    if (link.type == "HOW_TO_LINK" || link.type == "DESCRIPTION_LINK") {
      a = document.createElement("a");
      a.href = link.url;
      a.setAttribute("target", "_blank");
      //a.title = link.description;
      a.innerText = link.name;
      text = document.createElement("span");
      text.innerText = " " + link.description;
      yellowDiv.append(a);
      yellowDiv.append(text);
      //yellowDiv.setAttribute('title', link.description);
      yellowDiv.append(document.createElement("br"));
    }
    if (link.type == "SERVICE_LINK") {
      if (typeof link.htmlFragment != "undefined" && link.htmlFragment != "") {
        divTmp = document.createElement("div");
        divTmp.innerHTML = link.htmlFragment;
        text = document.createElement("span");
        text.innerText = " " + link.description;
        yellowDiv.append(text);
        yellowDiv.append(divTmp);

        yellowDiv.append(document.createElement("br"));
      }
      if (typeof link.url != "undefined" && link.url != "") {
        a = document.createElement("a");
        a.href = link.url;
        a.setAttribute("target", "_blank");
        a.innerText = link.name;
        text = document.createElement("span");
        text.innerText = " " + link.description;
        yellowDiv.append(a);
        yellowDiv.append(text);
        yellowDiv.append(document.createElement("br"));
      }
    }
  });
  // add yellow box end

  let divToAdd = document.createElement("div");
  divToAdd.append(descriptionDiv);
  divToAdd.append(divSimp);
  divToAdd.append(simplificationBox);
  divToAdd.append(separatorBox);
  if (yellowDiv.innerHTML != "") divToAdd.append(accordionDiv);

  if (!addOnlyToLast) {
    for (let i = 0; i < elements.length; i++) {
      const clone = divToAdd.cloneNode(true);
      elements[i].insertBefore(clone, elements[i].firstChild);
    }
  } else {
    const lastElement = elements[elements.length - 1];
    const clone = divToAdd.cloneNode(true);
    lastElement.insertBefore(clone, lastElement.firstChild);
  }
}

function hideToast() {
  var btn = document.getElementById("simplyfied_btn");

  //hide the toast
  toast.hide();

  const argument = version === "simplyfied" ? "original" : "simplyfied";
  btn.setAttribute("onClick", 'showText("' + argument + '")');

  setTimeout(function () {
    isWarningStepVisible = false;
    document.dispatchEvent(new Event("click"));
  }, 150);
}

function getIsWarningStepVisible() {
  return isWarningStepVisible;
}
