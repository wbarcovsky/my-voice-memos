# My voice memos - test application

This app allow user to create memos using speech recognition in browser.
I tried to keep this app small and simple without any unnecessary dependencies. 


# Demo
https://wbarcovsky.github.io/my-voice-memos/


## Tech stack and libraries
1. Typescript (https://www.typescriptlang.org/) - because strong typing is really useful. Especially, when you need to work with non-trivial APIs, such as SpeechRecognition. 
2. Webpack (https://webpack.js.org/) - because we want to stay flexible in term of building strategy and third-party tools.
3. CSS Modules (https://github.com/css-modules/css-modules) - because we don't want class name collisions in our components.
4. Eslint + prettier + husky - to keep code style in check.
5. **no redux** (and other state management libraries) - because application is rather small and all logic can be stored in App.ts file. However, if the project were to grow, this approach quickly became inefficient.
6. **no react router** - because I want to host this app with GitHub pages, and it adds extra "folder" in the URL (https://wbarcovsky.github.io/my-voice-memos/). This is also a reason, why paths for fonts have relative links instead of absolute ones. (Do not try this in a real projects!)


## Known issues (backlog)
1. It will be nice to show confirm dialog before the memo is deleted.
2. Too much records can cause app to work slowly. Suggestion: add pagination + autoload from DB on scroll 
3. Need to write some unit tests.
