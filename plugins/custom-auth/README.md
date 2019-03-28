# talk-plugin-custom-auth Recipie

Plugin Recipes are plugin templates used to help bootstrap the development of a plugin. When first developing a plugin with a recipe, you can simply copy the desired recipe locally, and determine which files need to be modified to suit your needs.

## Implementations in this Recipe

`index.js` is the main file of the recipie. Since only that file is needed, Server and Client directories are not included. 

### tokenUserNotFound
Example code to create a new user in Talk based on user details contained in a JWT issued by your authentication provider service.

### router
Example code to update external user details stored in Talk from a JWT. 

### resolver
Example code to replace a standard Talk data point with your own custom value. Please note this step is optional and only applies if you are passing additinal user details to Talk and would like to use your custom values in place of standard Talk user fields. 

*Need more help with your custom SSO integration?*
Email Us at: support @ coralproject.net

