package com.todo_today.notification;

import android.app.Activity;
import android.app.Application;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.todo_today.MainActivity;
import com.todo_today.R;

import static android.content.Context.NOTIFICATION_SERVICE;

/**
 * Created by giyongpark on 2016. 11. 8..
 */

public class NotificationModule extends ReactContextBaseJavaModule {

    private Context applicationContext = null;
    private int numMessages = 0;

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.applicationContext = reactContext;
    }

    @Override
    public String getName() {
        return "NotificationAndroid";
    }

    @ReactMethod
    public void create() {
        final Activity applicationActivity = getCurrentActivity();

        Intent resultIntent = new Intent(applicationContext, MainActivity.class);
        resultIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(applicationContext)
            .setContentIntent(
                PendingIntent.getActivity(
                    applicationContext,
                    0,
                    resultIntent,
                    PendingIntent.FLAG_UPDATE_CURRENT
                )
            )
            .setTicker("Hi, ticker")
            .setSmallIcon(R.mipmap.ic_stat_custom)
            .setContentTitle("Hi, title")
            .setContentText("I'm text." + numMessages)
            .setNumber(numMessages++)
            .setAutoCancel(true);


        Notification notification = builder.build();

//        RemoteViews contentView = new RemoteViews(applicationActivity.getPackageName(), R.layout.notification);
//        final String time = DateFormat.getTimeInstance().format(new Date()).toString();
//        final String text = applicationActivity.getResources().getString(R.string.collapsed, time);
//        contentView.setTextViewText(R.id.textView, text);
//        notification.contentView = contentView;

        NotificationManager notifyManager = (NotificationManager) applicationActivity.getSystemService(NOTIFICATION_SERVICE);
        notifyManager.notify(1, notification);
    }
}

class NotificationReceiver extends BroadcastReceiver {
    final static String NOTIFICATION_ID = "notificationId";
    static final String LOG_TAG = "NotificationAndroid";


    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i("hi", "welcome!");
        int id = intent.getIntExtra(NOTIFICATION_ID, 0);
        long currentTime = System.currentTimeMillis();

        Log.i(LOG_TAG, "NotificationPublisher: Prepare To Publish: " + id + ", Now Time: " + currentTime);

        Application applicationContext = (Application) context.getApplicationContext();

//        new RNPushNotificationHelper(applicationContext)
//                .sendNotification(intent.getExtras());
    }
}
