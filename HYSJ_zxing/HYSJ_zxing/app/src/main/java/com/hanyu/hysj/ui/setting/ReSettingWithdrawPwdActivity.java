package com.hanyu.hysj.ui.setting;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.weight.passwordkey.PwdView;
import com.hanyu.hysj.weight.passwordkey.VirtualKeyboardView;

import butterknife.BindView;
import butterknife.OnClick;


/**
 * 修改提现密码
 * Created by Administrator on 2017/9/9.
 */

public class ReSettingWithdrawPwdActivity extends BaseActivity {
    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.tv_text)
    TextView mTvText;
    @BindView(R.id.pv_pwd)
    PwdView mPvPwd;
    @BindView(R.id.btn_ok)
    Button mBtnOk;
    @BindView(R.id.virtualKeyboardView)
    VirtualKeyboardView mVirtualKeyboardView;
    private int count = 0;      //控制次数
    private boolean isChecked = false;

    @Override
    protected int getLayoutId() {
        return R.layout.setting_withdraw_pwd_activity;
    }

    @Override
    protected void setUpView() {

    }

    @OnClick({R.id.iv_back, R.id.btn_ok})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.btn_ok:
                //
                break;
        }
    }
}
