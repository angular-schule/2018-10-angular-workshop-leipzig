import { browser, $ } from 'protractor';
import { GoogleResultsPage } from './google-results.po';

export class GooglePage {
    navigateTo() {
        browser.get('https://www.google.de');
        return this;
    }

    search(term: string) {
        // Textfeld suchen
        const form = $('form#tsf');
        const input = form.$('input#lst-ib');

        // Begriff eingeben
        input.sendKeys(term);

        // Form abschicken
        form.submit();

        

        return new GoogleResultsPage();
    }
}