package com.todo_today.canvasview;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by giyongpark on 2016. 10. 28..
 */
public class CanvasViewManager extends SimpleViewManager<CanvasView> {

    @Override
    public String getName() {
        return "CanvasView";
    }

    @Override
    protected CanvasView createViewInstance(ThemedReactContext reactContext) {
        return new CanvasView(reactContext);
    }

    @ReactProp(name = "angle")
    public void setAngle(CanvasView view, @Nullable float angle) {
        view.setAngle(angle);
    }

    @ReactProp(name = "strokeWidth")
    public void setStrokeWidth(CanvasView view, @Nullable float width) {
        view.setStrokeWidth(width);
    }

    @ReactProp(name = "frontColor")
    public void setFrontColor(CanvasView view, @Nullable String color) {
        view.setFrontColor(color);
    }

    @ReactProp(name = "doneColor")
    public void setDoneColor(CanvasView view, @Nullable String color) {
        view.setDoneColor(color);
    }

    @ReactProp(name = "headColor")
    public void setHeadColor(CanvasView view, @Nullable String color) {
        view.setHeadColor(color);
    }

    @ReactProp(name = "width")
    public void setWidth(CanvasView view, @Nullable int width) {
        view.setWidth(width);
    }

    @ReactProp(name = "height")
    public void setHeight(CanvasView view, @Nullable int height) {
        view.setHeight(height);
    }

    @Override
    protected void onAfterUpdateTransaction(CanvasView view) {
        super.onAfterUpdateTransaction(view);
        view.drawArc();
    }
}
