package com.hanyu.hysj.ui.setting;

import android.content.Intent;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;

import butterknife.BindView;
import butterknife.OnClick;

/**
 *  忘记提现密码主页面
 * Created by Administrator on 2017/9/9.
 */

public class ForgetWithdrawPwdActivity extends BaseActivity {

    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.tv_right)
    TextView mTvRight;
    @BindView(R.id.iv_rigth1)
    ImageView mIvRigth1;
    @BindView(R.id.iv_rigth2)
    ImageView mIvRigth2;
    @BindView(R.id.view_titlebar)
    LinearLayout mViewTitlebar;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;

    @Override
    protected int getLayoutId() {
        return R.layout.forget_withdraw_pwd_activity;
    }

    @Override
    protected void setUpView() {
        initView();

    }

    private void initView() {
        mTvTitle.setText("忘记提现密码");
    }

    @OnClick({R.id.iv_back, R.id.ll_1})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.ll_1:
                //通过手机验证码找回密码
                startActivity(new Intent(this, ForgetWithdrawPwdActivity_01.class));
                break;
        }
    }
}
