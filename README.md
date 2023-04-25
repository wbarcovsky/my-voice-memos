# My voice memos - test application

This app allow user to create memos using speech recognition in browser.
I tried to keep this app small and simple without any unnecessary dependencies. 

## Tech stack and libraries
1. 

## Known issues (backlog)
1. It will be nice to show confirm dialog before the memo is deleted.
2. Holding button to record not working properly on mobile devices.
3. Too much records can cause app to work slowly. Suggestion: add pagination + autoload from DB on scroll 
4. Potential errors in speech recognition and DB APIs go silently for users. Suggestion: add notification library and use it to inform users about unexpected errors.
5. Write unit tests.
