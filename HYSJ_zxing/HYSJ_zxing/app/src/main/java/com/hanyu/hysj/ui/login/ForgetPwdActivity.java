package com.hanyu.hysj.ui.login;

import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.LoginSendInfoBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.NetPresenter;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 忘记登录密码
 * Created by Administrator on 2017/9/6.
 */

public class ForgetPwdActivity extends BaseActivity {
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
    @BindView(R.id.ll)
    LinearLayout mLl;
    @BindView(R.id.view_titlebar)
    LinearLayout mViewTitlebar;
    @BindView(R.id.et_phone)
    EditText mEtPhone;
    @BindView(R.id.et_code)
    EditText mEtCode;
    @BindView(R.id.tv_send_code)
    TextView mTvSendCode;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;
    @BindView(R.id.btn_next)
    Button mBtnNext;
    private int count = 30;


    private Handler mHandler = new Handler(Looper.myLooper());
    Runnable mRunnable = new Runnable() {
        @Override
        public void run() {
            mTvSendCode.setText(" 还剩(" + (--count) + ")秒 ");
            if (count == 0) {
                mTvSendCode.setText("重新发送");
                count = 30;
                mLl.setEnabled(true);
                mHandler.removeCallbacks(mRunnable);
            } else {
                mHandler.postDelayed(this, 1000);
            }
        }
    };

    @Override
    protected int getLayoutId() {
        return R.layout.forget_pwd_activity;
    }

    @Override
    protected void setUpView() {
        initView();
        initListener();


    }

    private void initView() {
        mTvTitle.setText("忘记密码");
        mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
        mBtnNext.setEnabled(false);
    }

    private void initListener() {
        mEtPhone.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                String phone = mEtPhone.getText().toString().trim();
                String code = mEtCode.getText().toString().trim();
                if (!TextUtils.isEmpty(phone) && !TextUtils.isEmpty(code)) {
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.drawable.selector_btn));
                    mBtnNext.setEnabled(true);
                } else {
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                    mBtnNext.setEnabled(false);
                }
                if (s.length() == 11) {//自动切换下一行
                    mEtCode.requestFocus();
                }
            }
        });
        mEtCode.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                String phone = mEtPhone.getText().toString().trim();
                String code = mEtCode.getText().toString().trim();
                if (!TextUtils.isEmpty(phone) && !TextUtils.isEmpty(code)) {
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.drawable.selector_btn));
                    mBtnNext.setEnabled(true);
                } else {
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                    mBtnNext.setEnabled(false);
                }
            }
        });

    }

    private void sendCode() {
        String mobile = mEtPhone.getText().toString().trim();
        if (TextUtils.isEmpty(mobile)) {
            showToast("请您输入手机号");
            return;
        }
        mTvSendCode.setText(" 还剩(" + count + ")秒 ");
        mLl.setEnabled(false);
        mLl.setBackgroundColor(getResources().getColor(R.color.stand_frame_line));
        mHandler.postDelayed(mRunnable, 1000);
        NetPresenter.loginSendInfo(mobile, new ApiCallBack<LoginSendInfoBean>(this) {
            @Override
            protected void onSuccess(LoginSendInfoBean data, String msg) {
                showToast(msg);
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });
    }



    @OnClick({R.id.iv_back, R.id.ll_1, R.id.btn_next})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.ll_1:
                sendCode();
                break;
            case R.id.btn_next:
                String phone = mEtPhone.getText().toString().trim();
                String code = mEtCode.getText().toString().trim();
                startActivity(new Intent(ForgetPwdActivity.this,ResetPwdActivity.class).putExtra("phone",phone).putExtra("code",code));
                break;
        }
    }
}
