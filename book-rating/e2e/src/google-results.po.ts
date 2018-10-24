import { $ } from 'protractor';

export class GoogleResultsPage {
    getResults() {
        const container = $('div.srg');
        return container.$$('div.g');
    }


    getFirstResultHeadline() {
        return this.getResults()
            .first()
            .$('h3.LC20lb')
            .getText();
    }
}