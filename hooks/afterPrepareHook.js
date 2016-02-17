/**
Hook is executed at the end of the 'prepare' stage. Usually, when you call 'cordova build'.

It will inject required preferences in the platform-specific projects, based on <universal-links>
data you have specified in the projects config.xml file.
*/

var androidManifestWriter = require('./lib/android/manifestWriter.js'),
  androidWebHook = require('./lib/android/webSiteHook.js'),
  iosProjectEntitlements = require('./lib/ios/projectEntitlements.js'),
  iosProjectPreferences = require('./lib/ios/xcodePreferences.js'),
  ANDROID = 'android',
  IOS = 'ios',
  pluginPreferences = {
    'hosts': [
      {
        'name': 'open',
        'scheme': 'wecareer',
        'paths': ['*']
      },
      {
        'name': 'bnc.lt',
        'scheme': 'https',
        'paths': ['*'],
        'pathPrefix': '/Nj6k'
      }
    ]
  };

module.exports = function(ctx) {
  run(ctx);
};

/**
 * Execute hook.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function run(cordovaContext) {
  var platformsList = cordovaContext.opts.platforms;

  platformsList.forEach(function(platform) {
    switch (platform) {
      case ANDROID:
        {
          activateUniversalLinksInAndroid(cordovaContext);
          break;
        }
      case IOS:
        {
          activateUniversalLinksInIos(cordovaContext);
          break;
        }
    }
  });
}

/**
 * Activate Deep Links for Android application.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function activateUniversalLinksInAndroid(cordovaContext) {
  // inject preferenes into AndroidManifest.xml
  androidManifestWriter.writePreferences(cordovaContext, pluginPreferences);

  // generate html file with the <link> tags that you should inject on the website.
  androidWebHook.generate(cordovaContext, pluginPreferences);
}

/**
 * Activate Universal Links for iOS application.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function activateUniversalLinksInIos(cordovaContext) {
  // modify xcode project preferences
  iosProjectPreferences.enableAssociativeDomainsCapability(cordovaContext);

  // generate entitlements file
  iosProjectEntitlements.generateAssociatedDomainsEntitlements(cordovaContext, pluginPreferences);
}
