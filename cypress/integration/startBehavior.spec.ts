describe('Start Behavior', () => {
    it('should automatically send a preconfigured "get started" message', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: 'injection',
                    getStartedPayload: 'get started',
                    getStartedText: 'get started'
                }
            })

            cy.get('[data-TechSupportIq-webchat-toggle]').click()
            cy.contains('get started').should('be.visible');
    });

    it('should not send a "get started message" if the history contains messages', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: 'injection',
                    getStartedPayload: 'get started',
                    getStartedText: 'get started'
                }
            })

        cy.receiveMessage('fake bot message')
        cy.get('[data-TechSupportIq-webchat-toggle]').click()
        cy.wait(100)
        cy.contains('get started').should('not.exist');
    });

    it('should not send a "get started message" if the getStartedText is empty', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: 'injection',
                    getStartedPayload: 'get started',
                    getStartedText: ''
                }
            });

        cy.get('[data-TechSupportIq-webchat-toggle]').click()
        cy.contains('get started').should('not.exist');
    });

    it('should not send a "get started message" if the getStartedText consists only of whitespace', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: 'injection',
                    getStartedPayload: 'get started',
                    getStartedText: ' '
                }
            })
            .get('[data-TechSupportIq-webchat-toggle]').click()
            .contains('get started').should('not.exist');
    });

    it('should automatically send a "get started message" even if the history contains an engagement message', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: 'injection',
                    getStartedPayload: 'get started',
                    getStartedText: 'get started',
                    engagementMessageText: 'engagement message',
                    engagementMessageDelay: 1
                }
            });
        
        cy.wait(500)
        
        cy.get('[data-TechSupportIq-webchat-toggle]').click();
        cy.contains('get started').should('be.visible');
    })

    it('should send a "get started message" with data', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: "injection",
                    getStartedText: "text",
                    getStartedPayload: "payload",
                    getStartedData: {
                        some: "data"
                    }
                }
            });

        cy.openWebchat();
        cy.getMessageFromHistory({ text: "text", data: { some: "data" } });
    })

    it('should not automatically send a "get started message" without text and data', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: "injection",
                    getStartedText: "some text",
                    getStartedPayload: "",
                    getStartedData: {}
                }
            });

        cy.openWebchat();
        cy.wait(3000);
        cy.getHistory().then(history => {
            expect(history.find(message => {
                if (message.text)
                    return false;

                if (message.data) {
                    if (typeof message.data === 'object' && Object.keys(message.data).length > 0) {
                        return false
                    }
                }

                return true;
            }), "history doesn't have an empty message").to.be.undefined;
        });
    })

    it('should not display a get-started-button without text and data', () => {
        cy
            .visitWebchat()
            .initWebchat({
                settings: {
                    startBehavior: "button",
                    getStartedText: "some text",
                    getStartedPayload: "",
                    getStartedData: {}
                }
            });

        cy.openWebchat();
        cy.get('[data-TechSupportIq-webchat-toggle]').should('not.exist');
    })
});