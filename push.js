var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJ73EFmPzX5OXy_W9Uye1UnieRZT1TIC3p2AvuGBOr0vHaaGFdwMF6iO8FBFpNF1oWvLYYRfdL8rm3Pfh6d2Z88",
   "privateKey": "5Qvd3voxWcvElReHIdEnFJv7MUN5JkistIqaWt1aud8"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f_8TJmYSN8E:APA91bHryljb6Up9frwr7in59jIOeINkFxPopDF1ToYLAFTu-xmWGly52VTUrXxQthwTXQ2beCAJ3_LwkwwMeDcCfI0gPRb3e5bsxirZhZuYV8MKhEef8avM5sVZdyun2B1nhiO-iK6q",
   "keys": {
       "p256dh": "BHV8u5oJT9bc+270XfcdvjPJhr+fWqdYp392v/BRxj2416Pg9lr+l6XU/vZIJZuVPc9bPdC6pM5q9esOHIj5yso=",
       "auth": "pk8pWyy0t/EmocTC3TC7pw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1095688990092',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);