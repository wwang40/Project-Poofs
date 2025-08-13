// Class for individual features. Contains all possible features and attaches to a POOF

class Feature {
    constructor(name, num) {
        this.name = name;
        this.num = num;
        this.css_element;
    }

    getCSS() {
        return this.css_element;
    }

    // Adds HTML element to webpage which we can change through functions
    Create_Custom_Element(tag, attr_name, text) {
        const custom_element = document.createElement(tag);
        custom_element.className = attr_name;
        custom_element.textContent = text;
        custom_element.name = text;
        document.body.append(custom_element);

        custom_element.style.top = (this.num * 20).toString() + "px";

        custom_element.addEventListener("click", () => {
            this.getFeature(text);
        });

        this.css_element = custom_element;
        return custom_element;
    }

    // Parser for all features
    async getFeature(featureName) {
        switch(featureName) {
            case "Joke":
                const jokeList = [
                    "Why did the blind man fall into the waterhole? Because they couldn't see that well!",
                    "Why did the old man throw a stick of butter? Because he wanted to see a butterfly…",
                    "Why can't you recite the alphabet in the Bermuda Triangle? Because you'll get stuck at C",
                    "What is a wind turbine's favorite music? I heard they're big metal fans",
                    "Did you hear how janitors are the best boxers? They sweep the competition!"
                ]
                alert(jokeList[Math.floor(Math.random() * jokeList.length)])
                return;
            case "Words of Affirmation":
                const affirmationList = [
                    "Your enemies will perish in the fiery abysses of hell",
                    "You will have a nice day :)"
                ]
                alert(affirmationList[Math.floor(Math.random() * affirmationList.length)])
                return;
            case "Cat Picture":
                // 
                console.log(" : 3 ")
                return;
            case "Chat with Me":
                // Make new HTML element with tag other than "feature" CHECK
                // Get input from HTML element CHECK
                // Feed input through Deepseek API CHECK 
                // Return output as alert (Change later to be beforementioned HTML element) CHECK

                if (typeof userHistory === "undefined") {
                    var userHistory = [];
                }
                console.log(userHistory);

                let inputSpeech = document.querySelector(".speech_bubble\\.input");
                if (inputSpeech == null) {
                    inputSpeech = this.Create_Custom_Element("input", "speech_bubble.input", "Insert Response");
                    inputSpeech.style.visibility = "visible";
                    inputSpeech.style.display = "block";

                    inputSpeech.addEventListener("mousedown", (e) => {
                        e.stopPropagation();
                    });
                    inputSpeech.addEventListener("keydown", async (e) => {
                        if (e.key === "Enter") { // Process input through Deepseek

                            try {
                                userHistory.push({
                                    role: "user",
                                    content: inputSpeech.value
                                });
                                const { url: refererUrl } = await chrome.runtime.sendMessage({ 
                                    action: "getActiveTabUrl" 
                                });

                                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${API_KEY}`, // Currently not working by design
                                        'HTTP-Referer': refererUrl, // Optional field
                                        'X-Title': 'POOF' // Optional field
                                    },
                                    body: JSON.stringify({ 
                                        model: "deepseek/deepseek-chat-v3-0324:free",
                                        messages: userHistory
                                    })
                                });
                                const result = await response.json();
                                alert(result.choices[0].message.content);
                                inputSpeech.value = ""; // Reset input field after every Enter
                            } catch (error) {
                                console.error("Error:", error);
                                alert("Error processing your message");
                            }

                            console.log(userHistory);

                            //alert("What? I can't hear you! You said: " + inputSpeech.value);
                            //inputSpeech.style.visibility = "hidden";
                        }
                    });

                    (document.getElementsByClassName("poof")[0]).appendChild(inputSpeech);
                } else {
                    const isVisible = (inputSpeech.style.visibility === "visible");
                    inputSpeech.style.visibility = isVisible ? "hidden" : "visible";
                    inputSpeech.style.display = isVisible ? "none" : "block";
                }
                
                return;
            default:
                console.log("Feature does not exist");
                return;
        }
    }


}