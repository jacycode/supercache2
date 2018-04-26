var appCache		    = window.applicationCache;
var appCacheStatus	= 'NOTSUPPORTED';

if (appCache) {
    switch (appCache.status) {
        case appCache.UNCACHED:		// UNCACHED == 0
            appCacheStatus = 'UNCACHED';
            break;

        case appCache.IDLE:			// IDLE == 1
            appCacheStatus = 'IDLE';
            break;

        case appCache.CHECKING:		// CHECKING == 2
            appCacheStatus = 'CHECKING';
            break;

        case appCache.DOWNLOADING:	// DOWNLOADING == 3
            appCacheStatus = 'DOWNLOADING';
            break;

        case appCache.UPDATEREADY:	// UPDATEREADY == 4
            appCacheStatus = 'UPDATEREADY';
            break;

        case appCache.OBSOLETE:		// OBSOLETE == 5
            appCacheStatus = 'OBSOLETE';
            break;

        default:
            appCacheStatus = 'UKNOWN CACHE STATUS ("' + appCache.status.toString() + '")';
            break;
    }
}

if (appCacheStatus !== 'NOTSUPPORTED') {
    // Attempt to update the user's cache.
    if (appCacheStatus === 'UNCACHED' ||
        appCacheStatus === 'OBSOLETE') {
        appCache.update();
    }

    // If fetch was successful, swap in the new cache.
    if (appCacheStatus === 'UPDATEREADY') {
        appCache.swapCache();
    }

    // Check if a new cache is available on page load.
    window.addEventListener('load', function (e) {
        window.applicationCache.addEventListener('updateready', eventReload, false);
    }, false);

    // Reload on update.
    var eventReload = function () {
        window.location.reload();
    };

    // Log cache events.
    var logCacheEvent = function (e) {
        window.console.log(e.type);
    };

    appCache.addEventListener('cached', logCacheEvent, false);
    appCache.addEventListener('checking', logCacheEvent, false);
    appCache.addEventListener('downloading', logCacheEvent, false);
    appCache.addEventListener('error', logCacheEvent, false);
    appCache.addEventListener('noupdate', logCacheEvent, false);
    appCache.addEventListener('obsolete', logCacheEvent, false);
    appCache.addEventListener('progress', logCacheEvent, false);
    appCache.addEventListener('updateready', logCacheEvent, false);
}
