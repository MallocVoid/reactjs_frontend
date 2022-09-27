# Demo Frontend

This frontend application uses ReactJS with Axios for talking with the backend API.

There is a basic homepage to land on, a username/password login, and the ability to view and edit "apps". The apps are very basic. Once the user is logged in they can navigate to the Apps page. There are a few information fields for the apps. The user can list the apps, click on the id in order to edit the app info, and select 1..n apps and click the trash icon to delete them.

## Demo Backend
This application depends on having the backend services up. They are found in a separate repo along with a README for installation instructions.

## Start application
Run the application with 
npm start

## TODO
1. Styling is minimal.
2. Home page is bare.
3. The subpages are hidden when not logged in but the pages themselves are not secure.
4. The way we're hiding the nav links is functional but should be refactored.
5. Needs a lot more error handling.
