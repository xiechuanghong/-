package com.hanyu.hysj.ui.main;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.annotation.Nullable;
import android.view.KeyEvent;
import android.view.WindowManager;

import com.hanyu.hysj.R;
import com.hanyu.hysj.app.Constants;
import com.hanyu.hysj.hx.HXHelper;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.ui.login.LoginActivity;
import com.hanyu.hysj.util.SPUtils;

public class SplashActivity extends Activity {
    protected Activity context;
    private final int DELAY = 0;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getLayoutId());
        context = this;
        setUpView();
    }

    protected int getLayoutId() {
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        return R.layout.activity_splash;
    }

    protected void setUpView() {
        checkVersion();
    }

    private void gotoActiviy(Class<?> cls) {
        new Handler(new Handler.Callback() {
            @Override
            public boolean handleMessage(Message msg) {
                startActivity(new Intent(context, cls));
                finish();
                return false;
            }
        }).sendEmptyMessageDelayed(DELAY, 2000);
    }

    /**
     * 判断软件是否为第一次打开
     **/
    private void checkVersion() {
        //添加消息的监听
        HXHelper.getInstance().addMsgListener();

        boolean entered = (boolean) SPUtils.getInstance(context).getValue(Constants.SP_ENTERED, Boolean.class);
        if (!entered) {
            SPUtils.getInstance(context).putValue(Constants.SP_ENTERED, true);
            gotoActiviy(LoginActivity.class);
        } else {
            if (KeyUtil.isLogined()) {
                gotoActiviy(MainActivity.class);
            } else {
                gotoActiviy(LoginActivity.class);
            }
        }
    }

    //屏蔽手机键盘
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        return true;
    }
}
