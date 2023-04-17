$wt.cck={regenerate:function(params){document.lang=$wt.lang(!0);this.container.params=$wt.mergeParams(this.container.params,params||{});this.run(this.container)},reset:function(){$wt.cookie.remove('cck1');this.run(this.container)},getContent:function(content,lang){if(content){var isTranslate=content[lang]||content.en||!1;var finalContent=(isTranslate)?isTranslate:(typeof content==='string')?content:'';return(finalContent+"").replace("{lang}",lang)}
return''},run:function(obj){this.container=obj;try{if(window.location!==window.parent.location&&top.location.hostname===location.hostname){$wt.next(obj);return}}catch(error){console.log("WTINFO - Can't access properties of parent frame on external domain.")}
if(window.euCookieConsent){console.log("WTINFO - Please remove 'consent.js' from your page before using the new CCK.");$wt.next(obj);return}
if(!$wt.cookie.exists('cck1')){$wt.cookie.consent.set({'cm':!1,'all1st':!1,'closed':!1})}
var params=this.params=$wt.mergeParams({appendix:!1,lang:document.lang,url:!1,policyUrl:{"ec.europa.eu":"https://ec.europa.eu/info/cookies_{lang}","europa.eu":"https://europa.eu/european-union/abouteuropa/cookies_{lang}"},target:!1},obj.params);params.url=params.policyUrl[$wt.cookie.getHost()]||params.url||params.policyUrl[$wt.cookie.getDomain()]||params.policyUrl[/europa\.eu$/g.exec($wt.cookie.getDomain())]||!1;if(!params.url){console.error('WTINFO - Please indicate in the UEC embed code, the URL(s) to your Cookie Notice Page before you can run the CCK.');$wt.next(obj);return}
if(!$wt.cookie.consent.is.bannerClosed()||!$wt.cookie.consent.is.choiceMade()){$wt.on(window,"cck_banner_hidden",function(){$wt.remove(obj)});$wt.on(window,"cck_all_accepted",function(){switchBannesState()});$wt.on(window,"cck_technical_accepted",function(){switchBannesState()});var icons={'info':'<span class="wt-icon-information wt-ecl-icon--l wt-ecl-icon--primary"></span>','success':'<span class="wt-icon-check-filled wt-ecl-icon--l wt-ecl-color-success"></span>','close':'<span class="wt-icon-close-filled wt-ecl-icon--s"></span>'};var css=($wt.isCSP)?'':'<style>@media print{.cck-container{display:none}}body .cck-container{font-family:Arial,sans-serif;background-color:#ebebeb;line-height:30px;font-size:16px;padding:24px;position:fixed;z-index:100;bottom:0;right:0;left:0;color:#444}.cck-container a:not(.wt-ecl-button){color:#004494;text-decoration:underline}.cck-container .cck-wrapper{display:flex}.cck-container .cck-wrapper .cck-content{display:flex;margin-right:1.5rem;flex-grow:2}.cck-container .cck-wrapper .cck-content p{margin:0}.cck-container .cck-wrapper .cck-content .cck-content-icon{margin-right:1.5rem}.cck-container .cck-wrapper .cck-actions a{white-space:nowrap}.cck-container .cck-wrapper .cck-actions a.cck-actions-button{margin-top:1.5rem}.cck-container .cck-wrapper .cck-actions a svg{margin-left:.75rem}@media only screen and (min-width:1199px){.cck-container{padding:1.5rem 0}.cck-container .cck-wrapper{margin:0 auto;max-width:1170px;display:flex}}.cck-container .cck-wrapper{flex-direction:column}.cck-container .cck-wrapper .cck-actions{display:flex;align-items:flex-start;justify-content:flex-end;flex-wrap:wrap}.cck-container .cck-wrapper .cck-actions a:last-child{margin-left:.5rem}.cck-container .cck-wrapper .cck-actions a.ea_close{display:flex;align-items:center;margin-left:-.4rem}@media only screen and (min-width:768px){.cck-container .cck-wrapper{flex-direction:row}.cck-container .cck-wrapper .cck-actions{flex-wrap:nowrap}.cck-container .cck-wrapper .cck-actions a.cck-actions-button{margin-top:0}}</style>';if($wt.isCSP){obj.style.display="none";$wt.include($wt.root+"/webtools.cck.css",function(){obj.style.display="block"})}
var target=params.target?'_blank':'_self';var bannerComplete=$wt.template(`

        <div class="cck-container">
          <div class="cck-wrapper">
            <div class="cck-content">
              <div aria-hidden="true" class="cck-content-icon">{icon_success}</div>
              <div class="cck-content-complete">
                <p class="wt-paragraph">{complete}</p>
              </div>
            </div>
            <div class="cck-actions">
             <button class="wt-ecl-button wt-ecl-button--ghost wt-ecl-message__close" type="button">
                <span class="wt-ecl-button__container">
                  <span class="wt-ecl-button__label">
                    {close_label}
                  </span>
                  <span class="wt-icon-close-filled wt-ecl-icon--s wt-ecl-button__icon wt-ecl-button__icon--after">
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        {css}

      `,{icon_success:icons.success,close_label:$wt.label('cck','close',params.lang),complete:$wt.label('cck','complete',params.lang).replace('{cookie_policy_link}',this.getContent(params.url,params.lang)).replace('{cnp_target}',target),css:css});var banner=$wt.template(['<div class="cck-container">','  <div class="cck-wrapper">','    <div class="cck-content">','      <div aria-hidden="true" class="cck-content-icon">{icon_info}</div>','      <div class="cck-content-content">','        <p class="wt-paragraph">{uses_cookies}</p>','        {appendix}','      </div>','    </div>','    <div class="cck-actions">','      <a href="#accept" class="wt-link wt-ecl-button wt-ecl-button--primary cck-actions-button">{acceptAll}</a>','      <a href="#refuse" class="wt-link wt-ecl-button wt-ecl-button--primary cck-actions-button ea_ignore">{onlyTechnical}</a>','    </div>','  </div>','</div>','{css}'].join(""),{icon_info:icons.info,uses_cookies:$wt.label('cck','uses_cookies',params.lang).replace('{cookie_policy_link}',this.getContent(params.url,params.lang)).replace('{cnp_target}',target),acceptAll:$wt.label('cck','acceptAll',params.lang),onlyTechnical:$wt.label('cck','onlyTechnical',params.lang),appendix:$wt.cleanHTML(this.getContent(params.appendix||'',params.lang),{valid_elements:'a p br'}),css:css});var cck_here=document.getElementById("cck_here");if(cck_here){cck_here.appendChild(obj)}else{document.body.insertBefore(obj,document.body.firstChild)}
setTimeout(function(){var globan=document.getElementById("globan");if(globan&&!cck_here){$wt.after(obj,globan)}},0);obj.id="cookie-consent-banner";obj.className="cck-banner";obj.innerHTML=$wt.cookie.consent.is.choiceMade()&&!$wt.cookie.consent.is.bannerClosed()?bannerComplete:banner;$wt.trigger(window,"cck_banner_displayed");var switchBannesState=function(){obj.innerHTML=bannerComplete;bindActions()};var bindActions=function(){[].forEach.call(obj.querySelectorAll(".cck-actions a"),function(link){link.addEventListener("click",function(e){e.preventDefault();(this.hash.split("#")[1]==="accept")?$wt.cookie.consent.accept.all():$wt.cookie.consent.accept.onlyTechnical()})});let btn=obj.querySelector("button");if(btn){btn.addEventListener("click",()=>{$wt.cookie.consent.closedBanner();$wt.trigger(window,"cck_banner_hidden")})}};bindActions()}
$wt.next(obj)}};$wt.addTranslation({"cck":{"en":{"close":"Close","uses_cookies":"This site uses cookies to offer you a better browsing experience. Find out more on <a href=\"{cookie_policy_link}\"  class=\"wt-link\" target=\"{cnp_target}\">how we use cookies.<\/a>","acceptAll":"Accept all cookies","onlyTechnical":"Accept only essential cookies","complete":"Your cookie preferences have been saved. To change your preferences at any time, see our\u00a0<a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">cookies policy<\/a> or visit the link in the page footer."},"bg":{"close":"\u0417\u0430\u0442\u0432\u0430\u0440\u044f\u043d\u0435","uses_cookies":"\u0417\u0430 \u0434\u0430 \u043d\u0430\u043f\u0440\u0430\u0432\u0438\u043c \u0438\u0437\u043f\u043e\u043b\u0437\u0432\u0430\u043d\u0435\u0442\u043e \u043d\u0430 \u0442\u043e\u0437\u0438 \u0443\u0435\u0431\u0441\u0430\u0439\u0442 \u043f\u043e-\u043b\u0435\u0441\u043d\u043e \u0438 \u0443\u0434\u043e\u0431\u043d\u043e, \u0438\u0437\u043f\u043e\u043b\u0437\u0432\u0430\u043c\u0435 \u0431\u0438\u0441\u043a\u0432\u0438\u0442\u043a\u0438. \u041d\u0430\u0443\u0447\u0435\u0442\u0435 \u043f\u043e\u0432\u0435\u0447\u0435 \u0437\u0430 \u0442\u043e\u0432\u0430 \u043a\u0430\u043a <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">\u0438\u0437\u043f\u043e\u043b\u0437\u0432\u0430\u043c\u0435 \u0431\u0438\u0441\u043a\u0432\u0438\u0442\u043a\u0438.<\/a>","acceptAll":"\u041f\u0440\u0438\u0435\u043c\u0430\u043d\u0435 \u043d\u0430 \u0432\u0441\u0438\u0447\u043a\u0438 \u0431\u0438\u0441\u043a\u0432\u0438\u0442\u043a\u0438","onlyTechnical":"\u041f\u0440\u0438\u0435\u043c\u0430\u043d\u0435 \u0441\u0430\u043c\u043e \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u043d\u0438\u0442\u0435 \u0431\u0438\u0441\u043a\u0432\u0438\u0442\u043a\u0438","complete":"\u0412\u0430\u0448\u0438\u0442\u0435 \u043f\u0440\u0435\u0434\u043f\u043e\u0447\u0438\u0442\u0430\u043d\u0438\u044f \u0437\u0430 \u0431\u0438\u0441\u043a\u0432\u0438\u0442\u043a\u0438\u0442\u0435 \u0431\u044f\u0445\u0430 \u0437\u0430\u043f\u0430\u0437\u0435\u043d\u0438. \u041c\u043e\u0436\u0435\u0442\u0435 \u0434\u0430 \u043f\u0440\u043e\u043c\u0435\u043d\u044f\u0442\u0435 \u043f\u0440\u0435\u0434\u043f\u043e\u0447\u0438\u0442\u0430\u043d\u0438\u044f\u0442\u0430 \u0441\u0438 \u043f\u043e \u0432\u0441\u044f\u043a\u043e \u0432\u0440\u0435\u043c\u0435 \u2014 \u0437\u0430 \u0446\u0435\u043b\u0442\u0430 \u0432\u0438\u0436\u0442\u0435 \u043d\u0430\u0448\u0430\u0442\u0430 <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">\u043f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u0437\u0430 \u0431\u0438\u0441\u043a\u0432\u0438\u0442\u043a\u0438\u0442\u0435<\/a> \u0438\u043b\u0438 \u043e\u0442\u0432\u043e\u0440\u0435\u0442\u0435 \u0432\u0440\u044a\u0437\u043a\u0430\u0442\u0430 \u0432 \u0434\u043e\u043b\u043d\u0430\u0442\u0430 \u0447\u0430\u0441\u0442 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430\u0442\u0430."},"es":{"close":"Cerrar","uses_cookies":"Este sitio utiliza cookies para ofrecer una mejor experiencia de navegaci\u00f3n. M\u00e1s informaci\u00f3n sobre <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">c\u00f3mo utilizamos las cookies.<\/a>","acceptAll":"Aceptar todas las cookies","onlyTechnical":"Aceptar solo las cookies esenciales","complete":"Se han guardado sus preferencias en cuanto a cookies. Para cambiar sus preferencias en cualquier momento, consulte nuestra <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">pol\u00edtica de cookies<\/a> o siga el enlace que figura a pie de p\u00e1gina."},"cs":{"close":"Zav\u0159\u00edt","uses_cookies":"Tyto str\u00e1nky vyu\u017e\u00edvaj\u00ed soubory cookies, kter\u00e9 usnad\u0148uj\u00ed jejich prohl\u00ed\u017een\u00ed. Dal\u0161\u00ed informace o tom, <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">jak pou\u017e\u00edv\u00e1me cookies.<\/a>","acceptAll":"P\u0159ijmout v\u0161echny soubory cookies","onlyTechnical":"P\u0159ijmout pouze z\u00e1kladn\u00ed soubory cookies","complete":"Va\u0161e preference ohledn\u011b soubor\u016f cookies byly ulo\u017eeny. Pokud byste cht\u011bli sv\u00e9 preference zm\u011bnit, p\u0159e\u010dt\u011bte si <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">p\u0159\u00edslu\u0161n\u00e9 pokyny<\/a> nebo klikn\u011bte na odkaz v z\u00e1pat\u00ed t\u00e9to str\u00e1nky."},"da":{"close":"Luk","uses_cookies":"Dette website bruger cookies for at give dig en bedre browsingoplevelse. L\u00e6s mere om, <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">hvordan vi bruger cookies.<\/a>","acceptAll":"Accepter alle cookies","onlyTechnical":"Accept\u00e9r kun n\u00f8dvendige cookies","complete":"Dine cookiepr\u00e6ferencer er gemt. Hvis du vil \u00e6ndre dine pr\u00e6ferencer og se vores <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">cookiepolitik<\/a>, kan du f\u00f8lge linket nederst p\u00e5 siden."},"de":{"close":"Schlie\u00dfen","uses_cookies":"Im Interesse der Benutzerfreundlichkeit verwenden wir auf unseren Seiten Cookies. Erfahren Sie mehr \u00fcber <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">unsere Cookie-Politik.<\/a>","acceptAll":"Alle Cookies akzeptieren","onlyTechnical":"Nur unbedingt notwendige Cookies akzeptieren","complete":"Ihre Cookie-Pr\u00e4ferenzen wurden gespeichert. Sie k\u00f6nnen sie jederzeit \u00e4ndern. Informieren Sie sich \u00fcber unsere <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">Cookie-Politik<\/a> oder klicken Sie auf den Link in der Fu\u00dfzeile."},"el":{"close":"\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf","uses_cookies":"\u0391\u03c5\u03c4\u03cc\u03c2 \u03bf \u03b9\u03c3\u03c4\u03cc\u03c4\u03bf\u03c0\u03bf\u03c2 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b5\u03af cookies \u03b3\u03b9\u03b1 \u03bd\u03b1 \u03c3\u03b1\u03c2 \u03c0\u03c1\u03bf\u03c3\u03c6\u03ad\u03c1\u03b5\u03b9 \u03ba\u03b1\u03bb\u03cd\u03c4\u03b5\u03c1\u03b7 \u03b5\u03bc\u03c0\u03b5\u03b9\u03c1\u03af\u03b1 \u03c0\u03b5\u03c1\u03b9\u03ae\u03b3\u03b7\u03c3\u03b7\u03c2. \u03a0\u03b5\u03c1\u03b9\u03c3\u03c3\u03cc\u03c4\u03b5\u03c1\u03b1 \u03b3\u03b9\u03b1 \u03c4\u03bf <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">\u03c0\u03ce\u03c2 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03bc\u03b5 \u03c4\u03b1 cookies<\/a>.","acceptAll":"\u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae \u03cc\u03bb\u03c9\u03bd \u03c4\u03c9\u03bd cookies","onlyTechnical":"\u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae \u03bc\u03cc\u03bd\u03bf \u03b2\u03b1\u03c3\u03b9\u03ba\u03ce\u03bd cookies","complete":"\u039f\u03b9 \u03c0\u03c1\u03bf\u03c4\u03b9\u03bc\u03ae\u03c3\u03b5\u03b9\u03c2 \u03c3\u03b1\u03c2 \u03c3\u03c7\u03b5\u03c4\u03b9\u03ba\u03ac \u03bc\u03b5 \u03c4\u03b1 cookies \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03cd\u03c4\u03b7\u03ba\u03b1\u03bd. \u0393\u03b9\u03b1 \u03bd\u03b1 \u03b1\u03bb\u03bb\u03ac\u03be\u03b5\u03c4\u03b5 \u03c4\u03b9\u03c2 \u03c0\u03c1\u03bf\u03c4\u03b9\u03bc\u03ae\u03c3\u03b5\u03b9\u03c2 \u03c3\u03b1\u03c2 \u03b1\u03bd\u03ac \u03c0\u03ac\u03c3\u03b1 \u03c3\u03c4\u03b9\u03b3\u03bc\u03ae, \u03b4\u03b9\u03b1\u03b2\u03ac\u03c3\u03c4\u03b5 \u03c4\u03b7\u03bd <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">\u03c0\u03bf\u03bb\u03b9\u03c4\u03b9\u03ba\u03ae \u03bc\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03c4\u03b1 cookies<\/a> \u03ae \u03b5\u03c0\u03b9\u03c3\u03ba\u03b5\u03c6\u03b8\u03b5\u03af\u03c4\u03b5 \u03c4\u03bf\u03bd \u03c3\u03cd\u03bd\u03b4\u03b5\u03c3\u03bc\u03bf \u03c3\u03c4\u03bf \u03c5\u03c0\u03bf\u03c3\u03ad\u03bb\u03b9\u03b4\u03bf."},"et":{"close":"Sulge","uses_cookies":"Sellel saidil kasutatakse mugavama sirvimise huvides k\u00fcpsiseid. Lisateave <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">k\u00fcpsiste kasutamise<\/a> kohta.","acceptAll":"N\u00f5ustun k\u00f5igi k\u00fcpsistega","onlyTechnical":"N\u00f5ustun ainult oluliste k\u00fcpsistega","complete":"K\u00fcpsiste parameetrid on salvestatud. Kui soovite valitud parameetreid muuta, siis minge <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">k\u00fcpsiste p\u00f5him\u00f5tteid kirjeldavale lehele<\/a> v\u00f5i kl\u00f5psake lehe jaluses oleval lingil."},"fi":{"close":"Sulje","uses_cookies":"T\u00e4ll\u00e4 sivustolla k\u00e4ytet\u00e4\u00e4n ev\u00e4steit\u00e4 sivuston k\u00e4yt\u00f6n helpottamiseksi. Lue lis\u00e4\u00e4 <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">ev\u00e4steiden k\u00e4yt\u00f6st\u00e4 sivustollamme<\/a>.","acceptAll":"Hyv\u00e4ksy kaikki ev\u00e4steet","onlyTechnical":"Hyv\u00e4ksy vain v\u00e4ltt\u00e4m\u00e4tt\u00f6m\u00e4t ev\u00e4steet","complete":"Ev\u00e4steasetuksesi on tallennettu. Voit muuttaa asetuksiasi milloin tahansa. Lis\u00e4tietoja <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">ev\u00e4stek\u00e4yt\u00e4nt\u00f6j\u00e4 koskevassa selosteessa<\/a> tai sivun alalaidassa olevan linkin kautta."},"fr":{"close":"Fermer","uses_cookies":"Ce site utilise des cookies pour am\u00e9liorer la navigation. En savoir plus sur <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">la mani\u00e8re dont nous utilisons les cookies<\/a>.","acceptAll":"Accepter tous les cookies","onlyTechnical":"N\u2019accepter que les cookies essentiels","complete":"Vos pr\u00e9f\u00e9rences en mati\u00e8re de cookies ont \u00e9t\u00e9 sauvegard\u00e9es. Pour modifier vos pr\u00e9f\u00e9rences \u00e0 tout moment, consultez notre <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">politique sur les cookies<\/a> ou cliquez sur le lien dans le pied de page."},"ga":{"close":"D\u00fan","uses_cookies":"\u00das\u00e1idtear fian\u00e1in ar an su\u00edomh seo le gur fearr a bheidh d'eisp\u00e9ireas brabhs\u00e1la. Faigh tuilleadh eolais maidir leis <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">an gcaoi a n-\u00fas\u00e1idimid fian\u00e1in<\/a>.","acceptAll":"Glac leis na fian\u00e1in go l\u00e9ir","onlyTechnical":"N\u00e1 glac ach leis na fian\u00e1in riachtanacha","complete":"S\u00e1bh\u00e1ladh do roghanna maidir le fian\u00e1in. Chun do roghanna a athr\u00fa tr\u00e1th ar bith, f\u00e9ach ar <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">\u00e1r mbeartas maidir le fian\u00e1in<\/a> n\u00f3 lean an nasc at\u00e1 i mbunt\u00e1sc an leathanaigh."},"hr":{"close":"Zatvori","uses_cookies":"Na na\u0161im internetskim stranicama upotrebljavamo kola\u010di\u0107e kako bismo vam omogu\u0107ili bolje korisni\u010dko iskustvo. Saznajte vi\u0161e o <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">na\u0161im pravilima o kola\u010di\u0107ima<\/a>.","acceptAll":"Prihvati sve kola\u010di\u0107e","onlyTechnical":"Prihvati samo neophodne kola\u010di\u0107e","complete":"Va\u0161e postavke za kola\u010di\u0107e su spremljene. Mo\u017eete ih promijeniti u bilo kojem trenutku. Za vi\u0161e informacija pogledajte na\u0161a <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">pravila o kola\u010di\u0107ima<\/a> ili kliknite na poveznicu na dnu stranice."},"hu":{"close":"Bez\u00e1r\u00e1s","uses_cookies":"Ez a webhely cookie-kat haszn\u00e1l, hogy jobb b\u00f6ng\u00e9sz\u00e9si \u00e9lm\u00e9nyt k\u00edn\u00e1ljon a felhaszn\u00e1l\u00f3knak. Tov\u00e1bbi inform\u00e1ci\u00f3k a <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">cookie-k haszn\u00e1lat\u00e1r\u00f3l<\/a>.","acceptAll":"Az \u00f6sszes cookie elfogad\u00e1sa","onlyTechnical":"Csak az alapvet\u0151 cookie-k elfogad\u00e1sa","complete":"A cookie-kal kapcsolatos be\u00e1ll\u00edt\u00e1sait elmentett\u00fck. Ha b\u00e1rmikor m\u00f3dos\u00edtani szeretn\u00e9 be\u00e1ll\u00edt\u00e1sait, l\u00e1togasson el a <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">cookie-kkal foglalkoz\u00f3 oldalunkra<\/a>, vagy kattintson a lap alj\u00e1n tal\u00e1lhat\u00f3 linkre."},"it":{"close":"Chiudi","uses_cookies":"Questo sito utilizza cookie per migliorare la navigazione. Scopri di pi\u00f9 su <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">come usiamo i cookie<\/a>.","acceptAll":"Accetta tutti i cookie","onlyTechnical":"Accetta solo i cookie essenziali","complete":"Le tue preferenze in fatto di cookie sono state salvate. Per cambiarle consulta la nostra <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">politica dei cookie<\/a> o il link in fondo alla pagina."},"lt":{"close":"U\u017edaryti","uses_cookies":"Kad nar\u0161yti b\u016bt\u0173 papras\u010diau, \u0161ioje svetain\u0117je naudojami slapukai. Su\u017einokite daugiau apie tai, <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">kaip naudojame slapukus<\/a>.","acceptAll":"Sutikti su visais slapukais","onlyTechnical":"Sutikti tik su b\u016btinais slapukais","complete":"J\u016bs\u0173 slapuk\u0173 parinktys i\u0161saugotos. \u0160ias parinktis galima bet kada pakeisti \u2013 susipa\u017einkite su m\u016bs\u0173 <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">slapuk\u0173 politika<\/a> arba atsidarykite puslapio pora\u0161t\u0117je pateikt\u0105 nuorod\u0105."},"lv":{"close":"Aizv\u0113rt","uses_cookies":"Lai jums b\u016btu \u0113rt\u0101k p\u0101rl\u016bkot, \u0161aj\u0101 vietn\u0113 tiek izmantoti s\u012bkfaili. Uzziniet vair\u0101k par to, <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">k\u0101 m\u0113s izmantojam s\u012bkfailus<\/a>.","acceptAll":"Akcept\u0113t visus s\u012bkfailus","onlyTechnical":"Akcept\u0113t tikai svar\u012bg\u0101kos s\u012bkfailus","complete":"J\u016bsu preferences attiec\u012bb\u0101 uz s\u012bkfailiem ir saglab\u0101tas. Jebkur\u0101 laik\u0101 varat izmain\u012bt savas preferences. Ja to v\u0113laties, iepaz\u012bstieties ar <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">m\u016bsu noteikumiem par s\u012bkfailiem<\/a> vai noklik\u0161\u0137iniet uz saites, kas ir \u0161\u012bs lapas apak\u0161\u0101."},"mt":{"close":"Ag\u0127laq","uses_cookies":"Dan is-sit ju\u017ca l-cookies biex joffrilek esperjenza a\u0127jar ta' bbraw\u017cjar. Skopri aktar dwar <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">kif nu\u017caw il-cookies<\/a>.","acceptAll":"A\u010b\u010betta l-cookies kollha","onlyTechnical":"A\u010b\u010betta biss il-cookies essenzjali","complete":"Il-preferenzi dwar il-cookies tieg\u0127ek \u0121ew issejvjati. Biex tibdel il-preferenzi tieg\u0127ek fi kwalunkwe \u0127in, ara <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">l-politika tag\u0127na dwar il-cookies<\/a> jew \u017cur il-link f\u2019qieg\u0127 il-pa\u0121na."},"nl":{"close":"Sluiten","uses_cookies":"Om het u makkelijker te maken, gebruiken we op deze site cookies. Lees meer over <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">hoe we cookies gebruiken<\/a>.","acceptAll":"Alle cookies accepteren","onlyTechnical":"Alleen essenti\u00eble cookies accepteren","complete":"Uw cookievoorkeuren zijn opgeslagen. U kunt uw voorkeuren altijd wijzigen (<a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">zie ons cookiebeleid<\/a> of klik op de link onderaan de pagina)."},"pl":{"close":"Zamknij","uses_cookies":"W celu zapewnienia wy\u017cszej jako\u015bci us\u0142ug na tej stronie u\u017cyto plik\u00f3w cookie. Dowiedz si\u0119 wi\u0119cej o tym, <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">jak u\u017cywamy plik\u00f3w cookie<\/a>.","acceptAll":"Akceptuj wszystkie pliki cookie","onlyTechnical":"Akceptuj tylko niezb\u0119dne pliki cookie","complete":"Preferencje dotycz\u0105ce plik\u00f3w cookie zosta\u0142y zapisane. Preferencje mo\u017cna zmieni\u0107 w dowolnym momencie \u2013 zapoznaj si\u0119 w tym celu z <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">naszymi zasadami wykorzystania plik\u00f3w cookie<\/a> lub kliknij link u do\u0142u strony."},"pt":{"close":"Fechar","uses_cookies":"Este s\u00edtio utiliza testemunhos (\u00abcookies\u00bb) para lhe proporcionar uma melhor experi\u00eancia de navega\u00e7\u00e3o. Saiba mais sobre a forma <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">como usamos os testemunhos<\/a>.","acceptAll":"Aceitar todos os testemunhos","onlyTechnical":"Aceitar apenas os testemunhos essenciais","complete":"As suas prefer\u00eancias para os testemunhos foram guardadas. Para alterar as suas prefer\u00eancias a qualquer momento, consulte a nossa <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">pol\u00edtica de testemunhos<\/a> ou consulte a liga\u00e7\u00e3o no rodap\u00e9 da p\u00e1gina."},"ro":{"close":"\u00cenchide","uses_cookies":"Acest site utilizeaz\u0103 module cookie pentru a facilita navigarea. Afla\u021bi mai multe despre <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">modul \u00een care utiliz\u0103m cookie-urile<\/a>.","acceptAll":"Accepta\u021bi toate modulele cookie","onlyTechnical":"Accepta\u021bi doar cookie-urile esen\u021biale","complete":"Preferin\u021bele dumneavoastr\u0103 privind modulele cookie au fost salvate. Pentru a v\u0103 schimba preferin\u021bele, consulta\u021bi <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">politica \u00een materie de cookie-uri<\/a> sau deschide\u021bi linkul din subsolul paginii."},"sk":{"close":"Zavrie\u0165","uses_cookies":"Toto webov\u00e9 s\u00eddlo pou\u017e\u00edva s\u00fabory cookie na zlep\u0161enie funkci\u00ed prehliadania. \u010eal\u0161ie inform\u00e1cie o tom, <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">ako pou\u017e\u00edvame s\u00fabory cookie<\/a>.","acceptAll":"Prija\u0165 v\u0161etky s\u00fabory cookie","onlyTechnical":"Prija\u0165 len z\u00e1kladn\u00e9 s\u00fabory cookie","complete":"Va\u0161e preferencie t\u00fdkaj\u00face sa s\u00faborov cookie boli ulo\u017een\u00e9. Preferencie m\u00f4\u017eete kedyko\u013evek zmeni\u0165; pozrite si na\u0161u <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">politiku t\u00fdkaj\u00facu sa s\u00faborov cookie<\/a> alebo kliknite na odkaz uveden\u00fd v dolnej \u010dasti strany."},"sl":{"close":"Zapri","uses_cookies":"Na na\u0161ih spletnih straneh uporabljamo pi\u0161kotke za bolj\u0161o uporabni\u0161ko izku\u0161njo. Ve\u010d o na\u0161i <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">politiki uporabe pi\u0161kotkov<\/a>.","acceptAll":"Sprejmi vse pi\u0161kotke","onlyTechnical":"Sprejmi samo nujne pi\u0161kotke","complete":"Va\u0161a izbira za uporabo pi\u0161kotkov je shranjena. Svoje nastavitve lahko vedno spremenite. Ve\u010d informacij v na\u0161i <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">politiki o uporabi pi\u0161kotkov<\/a> ali prek povezave na dnu strani."},"sv":{"close":"St\u00e4ng","uses_cookies":"Vi anv\u00e4nder kakor f\u00f6r att f\u00f6rb\u00e4ttra ditt bes\u00f6k p\u00e5 webbplatsen. L\u00e4s mer om <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">hur vi anv\u00e4nder kakor<\/a>.","acceptAll":"Godk\u00e4nn alla kakor","onlyTechnical":"Godk\u00e4nna bara n\u00f6dv\u00e4ndiga kakor","complete":"Ditt val har sparats. Om du vill \u00e4ndra ditt val, l\u00e4s i v\u00e5r <a href=\"{cookie_policy_link}\" class=\"wt-link\" target=\"{cnp_target}\">policy f\u00f6r kakor<\/a> eller g\u00e5 in p\u00e5 l\u00e4nken i sidfoten."}}})