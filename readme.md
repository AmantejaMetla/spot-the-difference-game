Spot the Difference Game

A fun interactive game where players find 7 differences between two images.
Instructions to Run the Game

    Clone the Repository:

    git clone https://github.com/AmantejaMetla/spot-the-difference-game.git
    cd spot-the-difference-game

    Open the Game:
        Open the index.html file in your browser.

    Play the Game:
        Find all 7 differences by clicking on them.
        The timer and lives will update as you play.
        Background music will play, and sounds will trigger on correct/incorrect clicks.

How the Game Uses the JSON File

The game relies on a JSON file (config.json) to manage image paths and coordinates of the differences. Here’s the structure:
JSON File Overview

{
    "images": {
        "image1": "assets/Animals_Picture_original.png",
        "image2": "assets/Animals_Picture_with_Difference.png"
    },
    "differences": [
        { "x": 230, "y": 170, "radius": 25 },
        { "x": 400, "y": 320, "radius": 25 },
        ...
    ]
}

How It Works:

    Images:
        The images section specifies the file paths for the two images displayed in the game.

    Differences:
        The differences array stores the coordinates (x, y) and detection radius for each difference.
        When the player clicks on the images, the game checks if the click position matches any coordinates within the radius.

    Dynamic Setup:
        The game dynamically loads the JSON data when the page runs.
        This allows for easy modification of images or difference positions without changing the code.

Dependencies

    Browser with JavaScript enabled.

Summary of Common Issues: you might face:
    Incorrect Coordinates: Updated the coordinates for all 7 differences.- solution https://www.image-map.net/
    Sound Files Not Playing:
        Files existed in the correct location.
        JavaScript was updated to handle sound playback using user interaction to bypass browser autoplay restrictions.
