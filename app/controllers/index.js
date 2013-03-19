var acs = require("acs");

$.index.open();

acs.login(
    acs.getDeviceToken(
        acs.pushSubscribe
    )
);
