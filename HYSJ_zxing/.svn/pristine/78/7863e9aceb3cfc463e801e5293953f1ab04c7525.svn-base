package com.hanyu.hysj.base;

import android.annotation.TargetApi;
import android.app.Activity;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.CallSuper;
import android.support.annotation.IdRes;
import android.support.annotation.Nullable;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.TypedValue;
import android.view.KeyEvent;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.hanyu.hysj.R;
import com.hanyu.hysj.util.ActivityManager;
import com.hanyu.hysj.weight.AppProgressDialog;
import com.readystatesoftware.systembartint.SystemBarTintManager;

import butterknife.ButterKnife;

public abstract class BaseActivity extends AppCompatActivity {

    protected Activity context;
    private AppProgressDialog progressDialog;
    protected final String TAG = getClass().getSimpleName();


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getLayoutId());
        ActivityManager.getIntence().addActivity(this);
        ButterKnife.bind(this);
        context = this;
        setUpBack();
        setUpView();
        handlerSavedInstanceState(savedInstanceState);
    }

    /**
     * 初始化StatusBar设置
     */
    protected void setUpStatusBar(int statusColor) {
        // KitKat translucent navigation/status bar.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            setTranslucentStatus(false);
            SystemBarTintManager mTintManager = new SystemBarTintManager(this);
            mTintManager.setStatusBarTintEnabled(true);
            mTintManager.setStatusBarTintResource(statusColor);//通知栏所需颜色
        }
    }

    @TargetApi(19)
    private void setTranslucentStatus(boolean on) {
        Window win = getWindow();
        WindowManager.LayoutParams winParams = win.getAttributes();
        final int bits = WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS;
        if (on) {
            winParams.flags |= bits;
        } else {
            winParams.flags &= ~bits;
        }
        win.setAttributes(winParams);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        ActivityManager.getIntence().removeActivity(this);
    }

    /**
     * 初始化返回按钮方法
     */
    public void setUpBack() {
        ImageView ivBack = (ImageView) findViewById(R.id.iv_back);
        if (ivBack != null) {
            ivBack.setOnClickListener(v -> finish());
        }
    }

    /**
     * 设置标题栏标题
     *
     * @param title
     */
    public void setTitleBarTitle(String title) {
        TextView tvTitle = (TextView) findViewById(R.id.tv_title);
        if (tvTitle != null) {
            tvTitle.setText(title);
        }
    }

    /**
     * 初始化刷新控件的参数
     *
     * @param ids 刷新控件的id
     */
    protected SwipeRefreshLayout setSwipeRefreshLayout(@IdRes int ids) {
        SwipeRefreshLayout mRefreshLayout = (SwipeRefreshLayout) findViewById(ids);
        mRefreshLayout.setProgressViewOffset(false, 0,
                (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, 24, getResources().getDisplayMetrics()));
        mRefreshLayout.setColorSchemeResources(R.color.colorPrimary);
        mRefreshLayout.setRefreshing(true);

        return mRefreshLayout;
    }

    /**
     * 处理 savedInstanceState
     *
     * @param savedInstanceState
     */
    @CallSuper
    public void handlerSavedInstanceState(Bundle savedInstanceState) {
        if (savedInstanceState == null) {
            return;
        }
    }

    protected abstract int getLayoutId();

    protected abstract void setUpView();

    /**
     * 显示加载对话框并提示自定义信息
     *
     * @param message
     */
    public void showLoading(String message) {
        if (progressDialog == null) {
            progressDialog = new AppProgressDialog(context, R.style.Custom_Progress);
            if (!TextUtils.isEmpty(message)) {
                progressDialog.setMessage(message);
            }
        }
        progressDialog.show();
    }

    /**
     * 显示加载对话框
     */
    public void showLoading() {
        if (progressDialog == null) {
            progressDialog = new AppProgressDialog(context, R.style.Custom_Progress);
        }
        progressDialog.show();
    }

    public void disLoading() {
        if (progressDialog != null && progressDialog.isShowing()) {
            progressDialog.dismiss();
            progressDialog = null;
        }
    }

    Toast toast;
    public void showToast(String msg) {
        if(msg!=null){
            if(toast==null){
                toast=Toast.makeText(context,msg, Toast.LENGTH_SHORT);
            }
            toast.setText(msg);
            toast.show();
        }
    }

    //    设置状态栏透明
    protected void setTranlationBar() {
        getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            Window window = getWindow();
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS
                    | WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            window.getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(Color.TRANSPARENT);
            window.setNavigationBarColor(Color.TRANSPARENT);
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && event.getAction() == KeyEvent.ACTION_DOWN) {
            finish();
            return false;
        }
        return super.onKeyDown(keyCode, event);
    }
}