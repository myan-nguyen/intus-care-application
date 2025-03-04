### ADDITIONAL CHANGES/FEATURES:
Bootstrapped with React and Typescript, I spent roughly 20 hours completing this challenge. I would like to thank you for the application opportunity, I had a lot of fun throughout the whole process and hope you enjoy my work as well! Here are some changes I made and extra features I implemented:

- Implemented a sorting filter for icdCode lengths, defaults to highest to lowest but can be toggled to lowest to highest
- Implemented a search baar based on participant name or specific ICD code
- Extending sorting by adding an ascending/descending alphabetical sort button, can also be toggled
- Can export participant's conditions and corresponding ICD Codes in a PDF file for sharing
- Used Framer Motion for a cleaner UX: incorporated subtle hover animations, animated the "Back" Button and created smooth transitions between ParticipantList and ParticipantFocusView screens
- Implemented a loading screen spinner animations
- Cleaned up styling with individual components
- Changed the icdCode constant to a map with the corresponding medical conditions due to difficulties getting the server to connect with the Clinical Table Search Service API

### TO RUN LOCALLY:
Start the API:
cd client
cd api
npm install
node index.js

Start the frontend:
cd client
npm install
npm start

### LINK TO APPLICATION (deployed with Vercel)
NOTE: THE APP IS FULLY FUNCTIONAL ONLY WHEN RUN LOCALLY

** there are some difficulty/bugs fetching the API in the ParticipantFocusView page in the serverless Vercel app that I found after emailing the Vercel link, please run locally to judge on full functionality, thank you! **

https://intus-care-application-myan-nguyens-projects.vercel.app/
