describe("Empty Messenger Message", () => {
    it("Does not crash when rendering an empty Messenger Message", () => {
        cy.visitWebchat().initMockWebchat().openWebchat();

        cy.receiveMessage("", {
            _TechSupportIq: {
                _webchat: {}
            }
        });
        
        cy.receiveMessage("hi");
        cy.contains("hi").should("be.visible");
    });
});