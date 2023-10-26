# Scan

## Prod mode

1. Nella cartella small_claim_form/small_claim_form/iframes cercare la cartella avente nome uguale al form su cu si sta operando (ad esempio form_a) e aprire il file index.html contenuto al suo interno

   1.1. Cercare la stringa **iframe.css** servendosi dell’apposito strumento di ricerca. Se presente, eliminare la stringa **/small_claim_form/iframes/** che la precede

   1.2. Inserire come valore dell’attributo src dell’elemento iframe:

   - **https://yellow-coast-0c9cc7403.2.azurestaticapps.net/small_claim_form/dist/form_a/** nel caso si tratti del form A;
   - **https://yellow-coast-0c9cc7403.2.azurestaticapps.net/small_claim_form/dist/form_b/** nel caso si tratti del form B;
   - **https://yellow-coast-0c9cc7403.2.azurestaticapps.net/small_claim_form/dist/form_c/** nel caso si tratti del form C;
   - **https://yellow-coast-0c9cc7403.2.azurestaticapps.net/small_claim_form/dist/form_d/** nel caso si tratti del form D.

2. Aprire un terminale, spostarsi nella cartella contenente il progetto Angular del form (ad esempio /small_claim_form/small_claim_form/form_a) ed eseguire il comando:

   - **ng build --configuration production --deploy-url /small_claim_form/dist/form_a/** nel caso si tratti del form A;
   - **ng build --configuration production --deploy-url /small_claim_form/dist/form_b/** nel caso si tratti del form B;
   - **ng build --configuration production --deploy-url /small_claim_form/dist/form_c/** nel caso si tratti del form C;
   - **ng build --configuration production --deploy-url /small_claim_form/dist/form_d/** nel caso si tratti del form D.

3. Commit e push delle modifiche

## Dev mode

1. Aprire un terminale, spostarsi nella cartella contenente il progetto Angular del form (ad esempio /small_claim_form/small_claim_form/form_a) ed eseguire i comandi **npm install** e **npm start**

2. Aprire un nuovo terminale, spostarsi nella cartella /small_claim_form ed eseguire il comando **python3 -m http.server 3000**

3. Il form può essere raggiunto al link:

   - **http://localhost:4200** nel caso si tratti del form A;
   - **http://localhost:4300** nel caso si tratti del form B;
   - **http://localhost:4400** nel caso si tratti del form C;
   - **http://localhost:4500** nel caso si tratti del form D.

4. Nella cartella small_claim_form/small_claim_form/iframes cercare la cartella avente nome uguale al form su cu si sta operando (ad esempio form_a) e aprire il file index.html contenuto al suo interno

   4.1. Cercare la stringa **iframe.css** servendosi dell’apposito strumento di ricerca. Anteporre la stringa **/small_claim_form/iframes/**

   4.2. Inserire come valore dell’attributo src dell’elemento iframe:

   - **http://localhost:4200** nel caso si tratti del form A;
   - **http://localhost:4300** nel caso si tratti del form B;
   - **http://localhost:4400** nel caso si tratti del form C;
   - **http://localhost:4500** nel caso si tratti del form D.

5. Aprire un nuovo terminale, spostarsi nella cartella /small_claim_form ed eseguire il comando **python3 -m http.server 3500**

6. La pagina iframe.html può essere raggiunta al link:

   - **http://localhost:3500/small_claim_form/iframes/form_a** nel caso si tratti del form A;
   - **http://localhost:3500/small_claim_form/iframes/form_b** nel caso si tratti del form B;
   - **http://localhost:3500/small_claim_form/iframes/form_c** nel caso si tratti del form C;
   - **http://localhost:3500/small_claim_form/iframes/form_d** nel caso si tratti del form D.
