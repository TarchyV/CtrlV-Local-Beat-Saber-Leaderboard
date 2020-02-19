# **Local Beat Saber Leaderboard**
#### (Installation & Setup) 
##### Thomas Vallee 2020&copy;
------------
## Step 1: Firebase Setup

1. Go to [firebase.google.com](http://Firebase.google.com "firebase.google.com")
1. Hit the "Create a Project" button
1. Enter a Project Name. ie, "CtrlV Leaderboard"
1. Accept Terms and Continue
1. once your project is ready hit continue
1. Now on the main page for your project find the "</>" Button and click it.
1. Register your app for the web.
 1.  Add a nickname to your project. ie, "leaderboard"
 1.  do not check the "Also set up Firebase Hosting for this app"
 1.  Click register app
 1.  Now copy all the information inside the "var firebaseConfig{ }" and input it into a text file
 1. your text file should now include an ApiKey, authDomain, DatabaseUrl, projectId, etc.
------------
## Step 2: Registration PC Setup
#### download this repository
1. inside both FirebaseContents.config folders(ctrlvleaderboard/firebaseContents.config,ctrlvleaderboard/Arcade PC/firebaseContents.config) input your firebase credentials inside: 
1. it should look like this:
```
AIzaSyDsluvxARYqfABbe5-????????bzw
ctrlvleaderboard.firebaseapp.com
https://ctrlvleaderboard.firebaseio.com
ctrlvleaderboard
ctrlvleaderboard.appspot.com
58050??????
1:?????????25:web:d????????????????90524
```
------------
## Step 3: Arcade PC Setup
1. Inside Registration PC ctrlVLeaderboard folder, copy the file "Arcade PC" onto a USB drive or Google drive
2. On the Arcade PC's drop the file into Users/%UserName%/Leaderboard 
3. When beatsaber is running this file will grab the scores
------------
## Step 3: Local Server Setup (Optional)
### You can use these files and host them however you want, but for local hosting i found this to be the best way.
1. Download XAMPP
2. You only need to download the Apache service
2. open XAMPP_Control.exe
3. click on the "Config" Button next to admin and logs
4. Choose the httpd.conf file and search DocumentRoot and change the directory to the ctrlvleaderboard location
