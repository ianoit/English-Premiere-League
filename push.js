var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOO5COv4vEZ6JX0HQP94wfslmlFTuqrqXOYlYB0r2hZLKcltDKScf3SJkT4StCiRygIdvlr0BmP2RjqHvFuAiNg",
   "privateKey": "rUQ4g0lp3UFr0W-Ft81xuLZCkVTZmpaN2L9wpwMXShQ"
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