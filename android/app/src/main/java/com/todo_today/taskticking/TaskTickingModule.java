package com.todo_today.taskticking;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by giyongpark on 2016. 11. 21..
 */

public class TaskTickingModule extends ReactContextBaseJavaModule {

    Intent intent;

    public TaskTickingModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TaskTickingModule";
    }

    @ReactMethod
    public void startService() {
        Activity currentActivity = getCurrentActivity();
        intent = new Intent(currentActivity, TaskTickingService.class);
        intent.putExtra("hi", "data");
        currentActivity.startService(intent);
    }

    @ReactMethod
    public void stopService() {
        Activity currentActivity = getCurrentActivity();
        currentActivity.stopService(intent);
    }
}
