# Global





* * *

### setDebug(debug) 

**Parameters**

**debug**: `boolean`, _required_ - Set the SDK debug flag.

Setting the SDK debug flag will generate a new device ID each time the app is installed
instead of possibly using the same device id.  This is useful when testing.

This needs to be set before the Branch.init call!!!

___



### init(branch_key, options, callback) 

**Parameters**

**branch_key**: `string`, _required_ - Your Branch [live key](http://dashboard.branch.io/settings), or (depreciated) your app id.

**options**: `Object`, _optional_ - { *isReferrable*: _Is this a referrable session_ }.

**callback**: `function`, _optional_ - callback to read the
session data.

THE "isReferrable" OPTION IS ONLY USED IN THE CORDOVA/PHONEGAP PLUGIN
AND THE TITANIUM MODULE

Adding the Branch script to your page automatically creates a window.branch
object with all the external methods described below. All calls made to
Branch methods are stored in a queue, so even if the SDK is not fully
instantiated, calls made to it will be queued in the order they were
originally called.
If the session was opened from a referring link, `data()` will also return the referring link
click as `referring_link`, which gives you the ability to continue the click flow.

The init function on the Branch object initiates the Branch session and
creates a new user session, if it doesn't already exist, in
`sessionStorage`.

**Useful Tip**: The init function returns a data object where you can read
the link the user was referred by.

##### Usage
```js
branch.init(
    branch_key,
    options,
    callback (err, data),
);
```

##### Callback Format
```js
callback(
     "Error message",
     {
          data_parsed:        { },                          // If the user was referred from a link, and the link has associated data, the data is passed in here.
          referring_identity: '12345',                      // If the user was referred from a link, and the link was created by a user with an identity, that identity is here.
          has_app:            true,                         // Does the user have the app installed already?
          identity:           'BranchUser',                 // Unique string that identifies the user
          referring_link:     'https://bnc.lt/c/jgg75-Gjd3' // The referring link click, if available.
     }
);
```

**Note:** `Branch.init` must be called prior to calling any other Branch functions.
___



### data(callback) 

**Parameters**

**callback**: `function`, _optional_ - callback to read the
session data.

Returns the same session information and any referring data, as
`Branch.init`, but does not require the `app_id`. This is meant to be called
after `Branch.init` has been called if you need the session information at a
later point.
If the Branch session has already been initialized, the callback will return
immediately, otherwise, it will return once Branch has been initialized.
___



### first(callback) 

**Parameters**

**callback**: `function`, _optional_ - callback to read the
session data.

Returns the same session information and any referring data, as
`Branch.init` did when the app was first installed. This is meant to be called
after `Branch.init` has been called if you need the first session information at a
later point.
If the Branch session has already been initialized, the callback will return
immediately, otherwise, it will return once Branch has been initialized.

___



### setIdentity(identity, callback) 

**Parameters**

**identity**: `string`, _required_ - a string uniquely identifying the user - often a user ID
or email address.

**callback**: `function`, _optional_ - callback that returns the user's
Branch identity id and unique link.

**[Formerly `identify()`](CHANGELOG.md)**

Sets the identity of a user and returns the data. To use this function, pass
a unique string that identifies the user - this could be an email address,
UUID, Facebook ID, etc.

##### Usage
```js
branch.setIdentity(
    identity,
    callback (err, data)
);
```

##### Callback Format
```js
callback(
     "Error message",
     {
          identity_id:             '12345', // Server-generated ID of the user identity, stored in `sessionStorage`.
          link:                    'url',   // New link to use (replaces old stored link), stored in `sessionStorage`.
          referring_data_parsed:    { },      // Returns the initial referring data for this identity, if exists, as a parsed object.
          referring_identity:      '12345'  // Returns the initial referring identity for this identity, if exists.
     }
);
```
___



### logout(callback) 

**Parameters**

**callback**: `function`, _optional_

Logs out the current session, replaces session IDs and identity IDs.

##### Usage
```js
branch.logout(
    callback (err)
);
```

##### Callback Format
```js
callback(
     "Error message"
);
```
___



### close(callback) 

**Parameters**

**callback**: `function`, _optional_

Close the current session.

##### Usage
```js
branch.close(
    callback (err)
);
```

##### Callback Format
```js
callback(
     "Error message"
);
```
___

## Tracking events



### track(event, metadata, callback) 

**Parameters**

**event**: `string`, _required_ - name of the event to be tracked.

**metadata**: `Object`, _optional_ - object of event metadata.

**callback**: `function`, _optional_

This function allows you to track any event with supporting metadata. Use the events you track to
create funnels in the Branch dashboard.  The `metadata` parameter is a formatted JSON object that
can contain any data and has limitless hierarchy.

##### Usage
```js
branch.track(
    event,
    metadata,
    callback (err)
);
```

##### Callback Format
```js
callback("Error message");
```
___

# Deeplinking Methods

## Creating a deep linking link



### link(data, callback) 

**Parameters**

**data**: `Object`, _required_ - link data and metadata.

**callback**: `function`, _required_ - returns a string of the Branch deep
linking URL.

**[Formerly `createLink()`](CHANGELOG.md)**

Creates and returns a deep linking URL.  The `data` parameter can include an
object with optional data you would like to store, including Facebook
[Open Graph data](https://developers.facebook.com/docs/opengraph).

**data** The dictionary to embed with the link. Accessed as session or install parameters from
the SDK.

**Note**
You can customize the Facebook OG tags of each URL if you want to dynamically share content by
using the following optional keys in the data dictionary. Please use this
[Facebook tool](https://developers.facebook.com/tools/debug/og/object) to debug your OG tags!

| Key | Value
| --- | ---
| "$og_title" | The title you'd like to appear for the link in social media
| "$og_description" | The description you'd like to appear for the link in social media
| "$og_image_url" | The URL for the image you'd like to appear for the link in social media
| "$og_video" | The URL for the video
| "$og_url" | The URL you'd like to appear
| "$og_redirect" | If you want to bypass our OG tags and use your own, use this key with the URL that contains your site's metadata.

Also, you can set custom redirection by inserting the following optional keys in the dictionary:

| Key | Value
| --- | ---
| "$desktop_url" | Where to send the user on a desktop or laptop. By default it is the Branch-hosted text-me service
| "$android_url" | The replacement URL for the Play Store to send the user if they don't have the app. _Only necessary if you want a mobile web splash_
| "$ios_url" | The replacement URL for the App Store to send the user if they don't have the app. _Only necessary if you want a mobile web splash_
| "$ipad_url" | Same as above but for iPad Store
| "$fire_url" | Same as above but for Amazon Fire Store
| "$blackberry_url" | Same as above but for Blackberry Store
| "$windows_phone_url" | Same as above but for Windows Store
| "$after_click_url" | When a user returns to the browser after going to the app, take them to this URL. _iOS only; Android coming soon_

You have the ability to control the direct deep linking of each link as well:

| Key | Value
| --- | ---
| "$deeplink_path" | The value of the deep link path that you'd like us to append to your URI. For example, you could specify "$deeplink_path": "radio/station/456" and we'll open the app with the URI "yourapp://radio/station/456?link_click_id=branch-identifier". This is primarily for supporting legacy deep linking infrastructure.
| "$always_deeplink" | true or false. (default is not to deep link first) This key can be specified to have our linking service force try to open the app, even if we're not sure the user has the app installed. If the app is not installed, we fall back to the respective app store or $platform_url key. By default, we only open the app if we've seen a user initiate a session in your app from a Branch link (has been cookied and deep linked by Branch).

#### Usage
```js
branch.link(
    data,
    callback (err, link)
);
```

#### Example
```js
branch.link({
    tags: [ 'tag1', 'tag2' ],
    channel: 'facebook',
    feature: 'dashboard',
    stage: 'new user',
    data: {
        mydata: 'something',
        foo: 'bar',
        '$desktop_url': 'http://myappwebsite.com',
        '$ios_url': 'http://myappwebsite.com/ios',
        '$ipad_url': 'http://myappwebsite.com/ipad',
        '$android_url': 'http://myappwebsite.com/android',
        '$og_app_id': '12345',
        '$og_title': 'My App',
        '$og_description': 'My app\'s description.',
        '$og_image_url': 'http://myappwebsite.com/image.png'
    }
}, function(err, link) {
    console.log(err, link);
});
```

##### Callback Format
```js
callback(
    "Error message",
    'https://bnc.lt/l/3HZMytU-BW' // Branch deep linking URL
);
```



### deepview(data, options, callback) 

**Parameters**

**data**: `Object`, _required_ - object of all link data, same as branch.link().

**options**: `Object`, _optional_ - { *make_new_link*: _whether to create a new link even if
one already exists_. *open_app*, _whether to try to open the app passively (as opposed to
opening it upon user clicking); defaults to true_
}.

**callback**: `function`, _optional_ - returns an error if the API call is unsuccessful

Turns the current page into a "deepview" – a preview of app content. This gives the page two
special behaviors: (1) when the page is viewed on a mobile browser, if the user has the app
installed on their phone, we will try to open the app automaticaly and deeplink them to this
content (this can be toggled off by turning open_app to false, but this is not recommended),
and (2) provides a callback to open the app directly, accessible as `branch.deepviewCta()`;
you'll want to have a button on your web page that says something like "View in app", which
calls this function.

See [this tutorial](https://blog.branch.io/how-to-deep-link-from-your-mobile-website) for a full
guide on how to use the deepview functionality of the Web SDK.

#### Usage
```js
branch.deepview(
    data,
    options,
    callback (err)
);
```

#### Example
```js
branch.deepview(
    {
        channel: 'facebook',
        data: {
            mydata: 'content of my data',
            foo: 'bar',
            '$deepview_path': 'item_id=12345'
        },
        feature: 'dashboard',
        stage: 'new user',
        tags: [ 'tag1', 'tag2' ],
    },
    {
        make_new_link: true,
        open_app: true
    },
    function(err) {
        console.log(err || 'no error');
    }
);
```

##### Callback Format
```js
callback(
    "Error message"
);
```



### deepviewCta() 

Perform the branch deepview CTA (call to action) on mobile after `branch.deepview()` call is
finished. If the `branch.deepview()` call is finished with no error, when `branch.deepviewCta()` is called,
an attempt is made to open the app and deeplink the end user into it; if the end user does not
have the app installed, they will be redirected to the platform-appropriate app stores. If on the
other hand, `branch.deepview()` returns with an error, `branch.deepviewCta()` will fall back to
redirect the user using
[Branch dynamic links](https://github.com/BranchMetrics/Deferred-Deep-Linking-Public-API#structuring-a-dynamic-deeplink).

If `branch.deepview()` has not been called, an error will arise with a reminder to call
`branch.deepview()` first.

##### Usage
```js
$('a.deepview-cta').click(branch.deepviewCta); // If you are using jQuery

document.getElementById('my-elem').onClick = branch.deepviewCta; // Or generally

<a href='...' onclick='branch.deepviewCta()'> // In HTML

// We recommend to assign deepviewCta in deepview callback:
branch.deepview(data, option, function(err) {
    if (err) {
        throw err;
    }
    ${'a.deepview-cta').click(branch.deepviewCta);
});

// You can call this function any time after branch.deepview() is finished by simply:
branch.deepviewCta();
```

___

# Referral system rewarding functionality
In a standard referral system, you have 2 parties: the original user and the invitee. Our system
is flexible enough to handle rewards for all users for any actions. Here are a couple example
scenarios:
1. Reward the original user for taking action (eg. inviting, purchasing, etc)
2. Reward the invitee for installing the app from the original user's referral link
3. Reward the original user when the invitee takes action (eg. give the original user credit when
    their the invitee buys something)

These reward definitions are created on the dashboard, under the 'Reward Rules' section in the
'Referrals' tab on the dashboard.

Warning: For a referral program, you should not use unique awards for custom events and redeem
pre-identify call. This can allow users to cheat the system.

## Retrieve referrals list



### referrals(callback) 

**Parameters**

**callback**: `function`, _required_ - returns an object with referral data.

**[Formerly `showReferrals()`](CHANGELOG.md)**

This function is no longer supported.

## Referral Codes



### getCode(options, callback) 

**Parameters**

**options**: `Object`, _required_ - contins options for referral code creation.

**callback**: `function`, _optional_ - returns an error if unsuccessful

Create a referral code using the supplied parameters.  The code can be given to other users to
enter.  Applying the code will add credits to the referrer, referree or both.
The `options` object can containt the following properties:

| Key | Value
| --- | ---
| amount | *reqruied* - An integer specifying the number of credits added when the code is applied.
| calculation_type | *required* - An integer of 1 for unlimited uses, or 0 for one use.
| location | *required* - An integer that determines who gets the credits:  0 for the referree, 2 for the referring user or 3 for both.
| bucket | *optional* - The bucket to apply the credits to.  Defaults to "default".
| prefix | *optional* - A string to be prepended to the code.
| expiration | *optional* - A date string that if present, determines the date on which the code expires.

##### Usage

branch.getCode(
    options,
    callback(err,data)
);

##### Example

```js
branch.getCode(
    {
      "amount":10,
      "bucket":"party",
      "calculation_type":1,
      "location":2
    },
    callback (err, data)
);
```

##### Callback Format
```js
callback(
     "Error message",
     {
       "referral_code":"AB12CD"
     }
);
```
___



### validateCode(code, callback) 

**Parameters**

**code**: `string`, _required_ - the code string to validate.

**callback**: `function`, _optional_ - returns an error if unsuccessful

Validate a referral code before using.

##### Usage

```js
branch.validateCode(
    code, // The code to validate
    callback (err)
);
```

##### Example

```js
branch.validateCode(
    "AB12CD",
    function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Code is valid");
        }
    }
);
```

##### Callback Format
```js
callback(
    "Error message",
    callback(err)
);
```
___



### applyCode(code, callback) 

**Parameters**

**code**: `string`, _required_ - the code string to apply.

**callback**: `function`, _optional_ - returns an error if unsuccessful

Apply a referral code.

##### Usage

```js
branch.applyCode(
    code, // The code to apply
    callback (err)
);
```

##### Example

```js
branch.applyCode(
    "AB12CD",
    function(err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Code applied");
        }
    }
);
```

##### Callback Format
```js
callback(
    "Error message",
    callback(err)
);
```
___

## Credit Functions



### credits(callback) 

**Parameters**

**callback**: `function`, _required_ - returns an object with credit data.

**[Formerly `showCredits()`](CHANGELOG.md)**

This call will retrieve the entire history of credits and redemptions from the individual user.

##### Usage
```js
branch.credits(
    callback (err, data)
);
```

##### Callback Format
```js
callback(
    "Error message",
    {
        'default': 15,
        'other bucket': 9
    }
);
```



### creditHistory(options, callback) 

**Parameters**

**options**: `Object`, _optional_ - options controlling the returned history.

**callback**: `function`, _required_ - returns an array with credit history
data.

This call will retrieve the entire history of credits and redemptions from the individual user.
Properties available in the `options` object:

| Key | Value
| --- | ---
| bucket | *optional (max 63 characters)* - The bucket from which to retrieve credit transactions.
| begin_after_id | *optional* - The credit transaction id of the last item in the previous retrieval. Retrieval will start from the transaction next to it. If none is specified, retrieval starts from the very beginning in the transaction history, depending on the order.
| length | *optional* - The number of credit transactions to retrieve. If none is specified, up to 100 credit transactions will be retrieved.
| direction | *optional* - The order of credit transactions to retrieve. If direction is `1`, retrieval is in least recent first order; If direction is `0`, or if none is specified, retrieval is in most recent first order.

##### Usage

```js
branch.creditHistory(
     options,
     callback(err, data)
);
```

##### Example

```js
branch.creditHistory(
    {
      "length":50,
      "direction":0,
      "begin_after_id":"123456789012345",
      "bucket":"default"
    }
    callback (err, data)
);
```

##### Callback Format
```js
callback(
    "Error message",
[
    {
        "transaction": {
                           "date": "2014-10-14T01:54:40.425Z",
                           "id": "50388077461373184",
                           "bucket": "default",
                           "type": 0,
                           "amount": 5
                       },
        "referrer": "12345678",
        "referree": null
    },
    {
        "transaction": {
                           "date": "2014-10-14T01:55:09.474Z",
                           "id": "50388199301710081",
                           "bucket": "default",
                           "type": 2,
                           "amount": -3
                       },
        "referrer": null,
        "referree": "12345678"
    }
]
);
```

___

## Credit redemption



### redeem(amount, bucket, callback) 

**Parameters**

**amount**: `number`, _required_ - an `amount` (int) of number of credits to redeem

**bucket**: `string`, _required_ - the name of the `bucket` (string) of which bucket to redeem the credits from

**callback**: `function`, _optional_ - returns an error if unsuccessful

**[Formerly `redeemCredits()`](CHANGELOG.md)**

Credits are stored in `buckets`, which you can define as points, currency, whatever makes sense
for your app. When you want to redeem credits, call this method with the number of points to be
redeemed, and the bucket to redeem them from.

```js
branch.redeem(
    amount, // Amount of credits to be redeemed
    bucket,  // String of bucket name to redeem credits from
    callback (err)
);
```

##### Example

```js
branch.redeem(
    5,
    "Rubies",
    function(err) {
        console.log(err);
    }
);
```

##### Callback Format
```js
callback("Error message");
```
___




* * *









