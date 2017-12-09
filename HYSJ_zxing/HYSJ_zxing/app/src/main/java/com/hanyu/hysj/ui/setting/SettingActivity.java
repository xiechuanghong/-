package com.hanyu.hysj.ui.setting;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.util.SPUtils;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 设置
 * Created by Administrator on 2017/9/8.
 */

public class SettingActivity extends BaseActivity {

    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;
    @BindView(R.id.ll_2)
    LinearLayout mLl2;
    @BindView(R.id.ll_3)
    LinearLayout mLl3;
    @BindView(R.id.ll_4)
    LinearLayout mLl4;
    @BindView(R.id.ll_5)
    LinearLayout mLl5;

    @Override
    protected int getLayoutId() {
        return R.layout.setting_activity;
    }

    @Override
    protected void setUpView() {
        initView();


    }

    private void initView() {
        LoginLoginBean loginBean = SPUtils.getInstance(this).getLoginBean();
        if(loginBean!=null){
            if(!TextUtils.isEmpty(loginBean.getPass())){
                mLl4.setVisibility(View.GONE);
            }else{
                mLl4.setVisibility(View.VISIBLE);
            }
        }
        mTvTitle.setText("设置");

    }

    @OnClick({R.id.iv_back, R.id.ll_1, R.id.ll_2, R.id.ll_3, R.id.ll_4,R.id.ll_5})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.ll_1:
                //店铺管理
                startActivity(new Intent(SettingActivity.this,ShopManagerActivity.class));
                break;
            case R.id.ll_2:
                //语音提醒设置
                startActivity(new Intent(SettingActivity.this,VoiceSettingActivity.class));
                break;
            case R.id.ll_3:
                //账号管理 Account
                startActivity(new Intent(SettingActivity.this,AccountManagerActivity.class));
                break;
            case R.id.ll_4:
                //提现密码设置
                startActivity(new Intent(SettingActivity.this, SettingWithdrawPwdActivity.class));
                break;
            case R.id.ll_5:
                //忘记提现密码
                startActivity(new Intent(SettingActivity.this, ForgetWithdrawPwdActivity.class));
                break;
        }
    }
}
