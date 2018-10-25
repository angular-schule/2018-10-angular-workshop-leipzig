import { GooglePage } from './google.po';
import { browser } from 'protractor';

describe('Google', () => {
    // nicht auf Angular warten (nur, wenn man keine Angular-Anwendung testet)
    beforeAll(() => browser.waitForAngularEnabled(false));
    
    it('should have Wikipedia as first result', () => {
        const headline = new GooglePage()
            .navigateTo()
            .search('mitteldeutschland')
            .getFirstResultHeadline();

        expect(headline).toContain('Wikipedia');
    });

    afterAll(() => browser.waitForAngularEnabled(true));
});
