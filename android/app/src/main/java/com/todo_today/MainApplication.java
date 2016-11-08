package com.todo_today;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.todo_today.canvasview.CanvasViewPackage;

import java.util.Arrays;
import java.util.List;

import io.fullstack.firestack.FirestackPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new ReactNativePushNotificationPackage(),
              new ReactMaterialKitPackage(),
              new FirestackPackage(),
              new RNDeviceInfo(),
              new CanvasViewPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
