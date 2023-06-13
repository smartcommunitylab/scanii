# Scan

:warning: Si presuppone che in Visual Studio Code venga aperta la cartella /scanii

## Istruzioni per la messa di produzione del form A

1. Nella cartella /small_claim_form/small_claim_form/form_a eseguire il comando ng build --prod
2. Copiare il contenuto della cartella /small_claim_form/small_claim_form/form_a/dist/form_a nella cartella /small_claim_form/small_claim_form/dist/form_a
3. Copiare il contenuto del file /small_claim_form/small_claim_form/form_a/src/iframe.html nel file /small_claim_form/small_claim_form/dist/form_a/iframe.html
4. Copiare il contenuto del file /small_claim_form/small_claim_form/form_a/src/iframe.css nel file /small_claim_form/small_claim_form/dist/form_a/iframe.css
5. Aprire il file /small_claim_form/small_claim_form/dist/form_a/index.html

   5.1. Sostituire l’elemento “base href="/" /” con l’elemento “base href="/small_claim_form/dist/form_a" /”

   5.2. Anteporre la stringa "/small_claim_form/dist/form_a/" al nome del file CSS specificato come valore dell'attributo href nei due elementi link utilizzati per l'importazione del foglio di stile

   5.3. Assegnare alla variabile EXTERNAL_URI l’origin (l'insieme formato dal protocollo, "://", il nome host e ":" seguito da un numero di porta se una porta è presente e differisce dalla porta predefinita per il protocollo dato. Esempi: https://example.org, http://example.net e http://example.com:8080) dell’URL che permette di visualizzare la pagina iframe.html, mentre alla variabile INTERNAL_URI l’origin dell’URL che permette di visualizzare il progetto Angular

   5.4. Assegnare alla variabile JSON_PATH la stringa “/small_claim_form/dist/form_a/content/json/”

   5.5. Assegnare alla variabile I18N_PATH la stringa “/small_claim_form/dist/form_a/assets/i18n/”

   5.6. Anteporre la stringa "/small_claim_form/dist/form_a/" al nome del file JavaScript specificato come valore dell'attributo src nei quattro elementi script collocati in fondo al file

6. Aprire il file JavaScript contenuto nella cartella /small_claim_form/small_claim_form/dist/form_a avente come parola iniziale il termine “main”

   6.1. Formattare il file

   6.2. Cercare la stringa “/assets/i18n/” servendosi dell’apposito strumento di ricerca e sostituire le due occorrenze trovate con la stringa “/small_claim_form/dist/form_a/assets/i18n/”

7. Aprire il file JavaScript contenuto nella cartella /small_claim_form/small_claim_form/dist/form_a avente come parola iniziale il termine “runtime”

   7.1. Formattare il file

   7.2. Cercare la stringa “e +” servendosi dell’apposito strumento di ricerca e anteporre all’elemento trovato la stringa “"form_a/" +”

8. Aprire il file /small_claim_form/small_claim_form/dist/form_a/iframe.html

   8.1. Cercare la stringa “iframe.css” servendosi dell’apposito strumento di ricerca e verificare che non sia preceduta dalla stringa “/small_claim_form/dist/form_a/”. In caso sia presente, eliminarla

## Istruzioni per utilizzare iframe.html durante la fase di sviluppo

1. Aprire il file /small_claim_form/small_claim_form/form_a/src/app/app.constants.ts

   1.1. Assegnare alla variabile EXTERNAL_URI la stringa “http://localhost:3000”

   1.2. Assegnare alla variabile INTERNAL_URI la stringa “http://localhost:4200”

2. Aprire il file /small_claim_form/small_claim_form/form_a/src/index.html

   2.1. Assegnare alla variabile EXTERNAL_URI la stringa “http://localhost:3000”

   2.2. Assegnare alla variabile INTERNAL_URI la stringa “http://localhost:4200”

   2.3. Assegnare alla variabile JSON_PATH la stringa “./content/json/”

   2.4. Assegnare alla variabile I18N_PATH la stringa “./assets/i18n/”

3. Aprire il file /small_claim_form/small_claim_form/form_a/src/iframe.html

   3.1. Cercare la stringa “iframe.css” servendosi dell’apposito strumento di ricerca. Anteporre la stringa “/small_claim_form/dist/form_a/”

   3.2. Assegnare alla variabile EXTERNAL_URI la stringa “http://localhost:3000”

   3.3. Assegnare alla variabile INTERNAL_URI la stringa “http://localhost:4200”

   3.4. Inserire la stringa “http://localhost:4200” come valore dell’attributo src dell’elemento iframe

4. Aprire un terminale, spostarsi nella cartella /small_claim_form ed eseguire il comando “python3 -m http.server 3000”
5. Aprire un nuovo terminale, spostarsi nella cartella /small_claim_form/small_claim_form/form_a, eseguire i comandi “npm install” e “npm start”
6. Il progetto Angular può essere raggiunto al seguente link: http://localhost:4200. La pagina iframe.html può essere raggiunta al seguente link: http://localhost:3000/small_claim_form/form_a/iframe.html
