
# ChittrApp  


**ChittrApp** is a social media app which allows users to communicate via 'chits'. An account is not required to see user's chits. However, to post chits, follow and unfollow and access location, a user can signup for free. 

## Installation

Use **npm install** while inside the root directory of the ChittrApp

```bash
npm install 
```

Then run android via react native while in the **root directory**

```bash
react-native run-android
```

### Setting up the server
Go to "**ChittrApp/Server/chittr_server_v6**" folder then run **npm start**
```bash
npm start
```

## Usage
The application consists of 3 tabs to navigate: **Home**, **Search** and **Account**  
To create an account or log in, the icon in the top left has a log in icon, press and follow steps accordingly.

**Home**: The home screen shows the chits of all users, scroll down to consistently load more. If logged in, this is where you can compose chits and post them for the world to see.

**Search**: The search screen allows a user to search for other people on the app, you can press on these users to view their profile and chits. If logged in, you can follow/unfollow the user.  

**Account**: The account screen only shows details when a user is logged in. It allows a user to update their details and see their profile stats- follow/follower count etc.

## License
Lewis Frater, copyright 2020.
