const onDisplay = new POOF("POOF1", "POOF1.png", 1, ["Joke", "Words of Affirmation", "Cat Picture", "Chat with Me"], "I am a POOF whose only purpose in life is to serve as a placeholder for testing.");

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "POOF_UPDATE") {
        //Receive instruction to activate or deactive extension
        const POOF_ON = document.getElementById("test")

        if (message.value) { // POOF is ON
            if (!POOF_ON) { // POOF not already made
                chrome.storage.local.get(['positionX', 'positionY'], (result) => {
                    //Inject CSS code into document
                    onDisplay.setUpCSS(result.positionX, result.positionY, document)
                })
                
                onDisplay.Create_Custom_Element("div", "poof", "test", onDisplay.getName())

                onDisplay.dragElement()

                onDisplay.setUpFeatures()

                onDisplay.dialogueElement(document)
                

                //FRAMEWORK FOR NEXT STEP:
                //dialogueTree(CUSTOM ELEMENT)

            } else { // POOF is ON and has previously been made
                onDisplay.showElement()
            }
        } else { // POOF is OFF but has previously been made
            if (POOF_ON) {
                onDisplay.hideElement()
            }
            return;
        }

        //when dialogue is selected/clicked, action will happen. First work on making text appear, then images, then audio, etc.
    }

    else if (message.type === "POS_UPDATE") {
        chrome.storage.local.get(['positionX', 'positionY'], (result) => {
            document.getElementById("test").style.top = result.positionY
            document.getElementById("test").style.left = result.positionX
        });
    }

});
