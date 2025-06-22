declare namespace Cypress{
    interface Chainable{
        typelogin: (url: string, email: string, password: string) => void
        typeInCKEditor: (selector: string, content: string) => Chainable<JQuery<HTMLElement>>;
        selectMuiOptionByText(selectDataCy: string, optionText: string): Chainable<void>;
    }
}
