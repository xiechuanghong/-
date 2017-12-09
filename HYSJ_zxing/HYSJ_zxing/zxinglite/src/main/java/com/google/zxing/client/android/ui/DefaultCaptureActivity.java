package com.google.zxing.client.android.ui;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Log;
import android.view.SurfaceView;

import com.google.zxing.R;
import com.google.zxing.Result;
import com.google.zxing.client.android.BaseCaptureActivity;
import com.google.zxing.client.android.ViewfinderView;

/**
 * 默认的扫描界面
 */
public class DefaultCaptureActivity extends BaseCaptureActivity {

    private static final String TAG = DefaultCaptureActivity.class.getSimpleName();

    private SurfaceView surfaceView;
    private ViewfinderView viewfinderView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_default_capture);
        surfaceView = (SurfaceView) findViewById(R.id.preview_view);
        viewfinderView = (ViewfinderView) findViewById(R.id.viewfinder_view);
    }

    @Override
    public SurfaceView getSurfaceView() {
        return (surfaceView == null) ? (SurfaceView) findViewById(R.id.preview_view) : surfaceView;
    }

    @Override
    public ViewfinderView getViewfinderHolder() {
        return (viewfinderView == null) ? (ViewfinderView) findViewById(R.id.viewfinder_view) : viewfinderView;
    }

    @Override
    public void dealDecode(Result rawResult, Bitmap barcode, float scaleFactor) {
        Log.i(TAG, "dealDecode ~~~~~ " + rawResult.getText() + " " + barcode + " " + scaleFactor);
        playBeepSoundAndVibrate();

        Intent intent = new Intent();
        intent.putExtra("result",rawResult.getText());
        setResult(RESULT_OK, intent);
        finish();
    }
}
