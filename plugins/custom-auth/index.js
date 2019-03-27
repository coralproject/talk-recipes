const Users = require('services/users');
const debug = require('debug')('talk-plugin-custom-auth');
const authz = require('middleware/authorization');
const { get } = require('lodash');

module.exports = {

  // When the JWT is passed to Talk, first it will be validated
  // Next, Talk will attempt to locate a user in its DB using the token's sub claim,
  // if the user is not found, the tokenUserNotFound hook will be called to create the user
  tokenUserNotFound: async ({ jwt }) => {
    debug('The jwt is ' + JSON.stringify(jwt));
    
    // Since the JWT has already been validated we can pass it's claims directly to upsertExternalUser
    const user = await Users.upsertExternalUser(
      null,
      jwt.sub,
      jwt.iss,
      jwt.username
    );

    // Persisting email address in Talk is required only if sending notifications from Talk.
    // If email was included on the JWT we can add it to a "local" profile
    // and push that into the user's Profiles array.
    // upsertExternalUser above will also create a profile as: { provider:jwt.iss, id:jwt.sub }
    const email = jwt.email.toLowerCase();
    user.profiles.push({
      provider: 'local',
      id: email,
    });

    // Then handle any additional User fields that you'd like to persist in Talk 
    // In this example a "memberSince" claim containing a unix timestamp on the jwt 
    // is used to overwrite created_at date
    // You can use the User.metadata property to store additional custom user details
    user.created_at = jwt.memberSince
      ? new Date(jwt.memberSince * 1000)
      : Date.now();

    // Finally, save and return the User that was created  
    await user.save();
    debug('The user created is ' + JSON.stringify(user));
    return user;
  },

  // At this point we've handled creating new users, 
  // now let's handle updating a user that was created by our tokenUserNotFound hook.
  // This implementation assumes that the external auth service calls the TALK_ROOT_URL/plugin/update-user endpoint
  // with a valid jwt token anytime a user is update needs to be passed to Talk 
  // First we add the `/plugin/update-user`` route and secure it with ADMIN level permissions
  router: router => {
    router.post(
      '/plugin/update-user',
      authz.needed('ADMIN'),
      async (req, res, next) => {
        const {
          body: { token },
          context: {
            connectors: {
              models: { User },
            },
          },
        } = req;

        // Since the token is being passed directly to the route in this case,
        // we need to parse it and should validate it's claims
        try {
          const { sub, username, email, iss } = JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString()
          );
          // Finally we call findOneAndUpdate to locate, update, and return the User from Talk's DB
          // Be sure to update any and all fields that were set by the tokenUserNotFoundHook
          let user = await User.findOneAndUpdate(
            { $or: [{ sub }, { 'profiles.id': sub }] },
            {
              $set: {
                username: username,
                lowercaseUsername: username.toLowerCase(),
                profiles: [
                  {
                    provider: 'local',
                    id: email,
                  },
                  {
                    provider: iss,
                    id: sub,
                  },
                ],
              },
            },
            {
              new: true,
            }
          );
          return res.json({ user });
        } catch (e) {
          return next(e);
        }
      }
    );
  },

  // This last step is completely OPTIONAL, 
  // and only applies if you need to override a standard Talk data point with your own custom value. 
  // This example assumes that I've stored a custom displayName value in the User.metadata property
  // Here we will reference the value in User.metadata.displayName everywhere that User.username is shown in Talk
  resolvers: {
    User: {
      username: user =>
        get(user, 'metadata.displayName', get(user, 'username')),
    },
  },
};
