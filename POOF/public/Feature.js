// Class for individual features. Contains all possible features and attaches to a POOF

class Feature {
    constructor(name, num) {
        this.name = name
        this.num = num
        this.css_element;
    }

    getCSS() {
        return this.css_element;
    }

    // Parser for all features
    getFeature(featureName) {
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
            default:
                console.log("Feature does not exist");
                return;
        }
    }

    // Adds HTML element to webpage which we can change through functions
    Create_Custom_Element(name) {
        const Add_Custom_CSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css

        Add_Custom_CSS(`
            .feature {
                position: absolute;
                width: 150px !important;
                height: 20px !important;
                margin-top: 0px !important;
                padding: 0 !important;
                background: transparent;
                z-index: 2147483647; /* Maximum possible */
                transform: translateZ(0);
                box-sizing: content-box !important;
                display: none;
                right: 0px;
                top: 0px;
                font-size: 15px;
            }
        `)


        const custom_element = document.createElement("div");
        custom_element.className = "feature";
        custom_element.textContent = name;
        document.body.append(custom_element);

        custom_element.style.top = (this.num * 20).toString() + "px";

        custom_element.addEventListener("click", () => {
            this.getFeature(name);
        });

        this.css_element = custom_element;
    }





}