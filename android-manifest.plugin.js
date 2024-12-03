const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function androidManifestPlugin(config) {
    return withAndroidManifest(config, async config => {
        const androidManifest = config.modResults.manifest;

        const application = androidManifest.application?.find(app => app.$['android:name'] === ".MainApplication");

        const activity = application?.activity?.find(act => act.$['android:name'] === ".MainActivity");

        if (activity) {
            let activityConfig = activity.$['android:configChanges'];

            if (!activityConfig?.includes('screenLayout')) activityConfig += '|screenLayout';

            if (!activityConfig?.includes('smallestScreenSize')) activityConfig += '|smallestScreenSize';

            activity.$['android:configChanges'] = activityConfig;
        }
        return config;
    });
}