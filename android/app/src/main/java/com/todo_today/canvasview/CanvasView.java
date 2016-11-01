package com.todo_today.canvasview;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;

/**
 * Created by giyongpark on 2016. 10. 28..
 * I got this from the Brains&Beards.
 * https://blog.brainsandbeards.com/making-of-pomodoro-native-components-fc754c0064d9#.56fe826fo
 */
public class CanvasView extends FrameLayout {
    Bitmap bitmap = null;
    Canvas canvas = null;
    ImageView imageView = null;
    float angle = 0;
    int doneColor;
    int frontColor;
    int headColor;
    float strokeWidth;

    int _width = 100;
    int _height = 100;
    float _density = 1.0f;

    public CanvasView (Context context) {
        super(context);
        imageView = new ImageView(context);
        _density = getResources().getDisplayMetrics().density;
    }

    public void drawArc() {
        removeAllViews();
        addView(
                imageView,
                new ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                )
        );

        int width = (int) (_width * _density);
        int height = (int) (_height * _density);

        bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);

        canvas = new Canvas(bitmap);
        imageView.setImageBitmap(bitmap);

        float size = Math.min(width, height);
        float left = 0.5f * width - 0.4f * size;
        float right = 0.5f * width + 0.4f * size;
        float top = 0.5f * height - 0.4f * size;
        float bottom = 0.5f * height + 0.4f * size;
        RectF ovalBounds = new RectF(left, top, right, bottom);

        Paint paint = new Paint();
        paint.setStyle(Paint.Style.STROKE);
        paint.setFlags(Paint.ANTI_ALIAS_FLAG);
        paint.setStrokeWidth(this.strokeWidth);
        paint.setARGB(
                Color.alpha(doneColor),
                Color.red(doneColor),
                Color.green(doneColor),
                Color.blue(doneColor)
        );

        Path path = new Path();
        path.moveTo(left, top);
        path.addArc(ovalBounds, -90, -angle);
        canvas.drawPath(path, paint);

        paint.setARGB(
                Color.alpha(frontColor),
                Color.red(frontColor),
                Color.green(frontColor),
                Color.blue(frontColor)
        );
        path = new Path();
        path.addArc(ovalBounds, -90-angle, -360+angle);
        canvas.drawPath(path, paint);

        paint.setStyle(Paint.Style.FILL);
        paint.setARGB(
                Color.alpha(headColor),
                Color.red(headColor),
                Color.green(headColor),
                Color.blue(headColor)
        );
        path = new Path();
        float radius = (right - left) / 2;
        float radian = (-90 - angle) * (float)Math.PI / 180;
        float headX = (float)Math.cos(radian) * radius + width/2;
        float headY = (float)Math.sin(radian) * radius + height/2;
        path.addCircle(headX, headY, 20, Path.Direction.CW);
        canvas.drawPath(path, paint);

    }

    public void setAngle(float angle) {
        this.angle = angle;
    }

    public void setStrokeWidth(float width) {
        this.strokeWidth = width;
    }

    public void setWidth(int width) {
        this._width = width;
    }

    public void setHeight(int height) {
        this._height = height;
    }

    public void setDoneColor(String color) {
        doneColor = Color.parseColor(color);
    }

    public void setFrontColor(String color) {
        frontColor = Color.parseColor(color);
    }

    public void setHeadColor(String color) {
        headColor = Color.parseColor(color);
    }
}


