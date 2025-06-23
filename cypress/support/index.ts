declare namespace Cypress{
    
    interface Chainable{
        /**
         * Logs in by navigating to the specified URL and entering the provided email and password.
         * @param url - The URL to navigate to for login.
         * @param email - The email address to use for login.
         * @param password - The password to use for login.
         */
        typelogin: (url: string, email: string, password: string) => void;

        /**
         * Types the given content into a CKEditor instance found by the specified selector.
         * @param selector - The selector used to locate the CKEditor instance.
         * @param content - The content to type into the CKEditor.
         * @returns The Cypress chainable object for further chaining.
         */
        typeInCKEditor: (selector: string, content: string) => Chainable<JQuery<HTMLElement>>;

        /**
         * Selects an option from a MUI select component by its visible text.
         * @param selectDataCy - The data-cy attribute of the MUI select component.
         * @param optionText - The visible text of the option to select.
         * @returns The Cypress chainable object for further chaining.
         */
        selectMuiOptionByText(selectDataCy: string, optionText: string): Chainable<void>;
    }
}
