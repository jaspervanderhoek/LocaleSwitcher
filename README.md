# Version 1.0  -  Language and TimeZone switcher


You can use this module to detect the Language and TimeZone used by the browser. For the best experience with the Mendix platform it is important that the user-language and user-timezone relationship are an exact match with where the user is actually located. 


To check this you can use one of the two Snippets from the '_Use Me' folder. One of these snippets can be placed in the layout (Make sure that you only use 1!).
You can choose between the DetectLocale and AutoRedirect snippet.

## AutoDetect
This will detect the user's Language and TimeZone, if the Language or TimeZone are different from the application. If there is a difference the application will show a Notification and allows the user to ignore or apply the change to his profile. 

## AutoRedirect
This will trigger the same detection process as AutoDetect. When there is a change required to the user settings the application will automatically instruct to refresh the application to use the different Language and/or TimeZone



This process also works for anonymous users, just be aware when using Deeplink functionality. If a deeplink was used to access the page, and if you'd refresh the page again the user will end up on the homepage and not the page he was deeplinking too. 


## Custom styling
All css is currently applied through the style elements in the snippet. If you would like to customize the look and file it would be best to copy the snippets into your own project and apply styling through your project specific CSS classes.

The reason why all CSS in this module is done through the style elements is because of easy sharing of the module. Since css class definitions can't automatically be added the css is done throught the Style element to allow an easy start with this module.
