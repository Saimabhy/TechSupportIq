describe("Branding", () => {
    it("banner is visible after opening the webchat", () => {
        cy.visitWebchat()
            .initMockWebchat()
            .openWebchat();

        cy.get('[aria-label^="Powered by TechSupportIq"]').should("be.visible");
    });

    it("banner shouldn't be rendered if disabled by disableBranding", () => {
        cy.visitWebchat()
            .initMockWebchat({
                settings: {
                    disableBranding: true
                }
            })
            .openWebchat();

        cy.get('[aria-label^="Powered by TechSupportIq"]').should("not.exist");
    });

    it("banner is visible at the end of a long chat history", () => {
        cy.visitWebchat()
            .initMockWebchat()
            .openWebchat();

        cy.then(() => {
            for (let i=0; i<20; i++) {
                cy.receiveMessage(`Message ${i+1}!`);
            }
        });

        cy.get('[aria-label^="Powered by TechSupportIq"]').should("be.visible");
    });

    it("banner is not visible when scrolling up the message history", () => {
        cy.visitWebchat()
            .initMockWebchat()
            .openWebchat();

        cy.then(() => {
            for (let i=0; i<20; i++) {
                cy.receiveMessage(`Message ${i+1}!`);
            }
        });

        cy.contains("Message 1!").scrollIntoView();
        cy.get('[aria-label^="Powered by TechSupportIq"]').should("not.be.visible");
    });

    it('banner is accessible', () => {
        cy.visitWebchat().initMockWebchat().openWebchat();
        cy.get('#TechSupportIqBrandingLink').should("have.attr", "aria-label", "Powered by TechSupportIq. Opens in new tab")
    })

    it('banner is hidden from screen reader', () => {
        cy.visitWebchat().initMockWebchat().openWebchat();
        cy.get('#TechSupportIqBrandingLogo').should("have.attr", "aria-hidden", "true")
    })
});