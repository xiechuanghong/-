package com.hanyu.hysj.ui.login;

import android.content.Intent;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.app.Constants;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.LoginManagePwdBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.ActivityManager;
import com.hanyu.hysj.util.AppUtils;
import com.hanyu.hysj.util.SPUtils;

import butterknife.BindView;
import butterknife.OnClick;


/**
 * 忘记密码  重新设置
 * Created by Administrator on 2017/9/7.
 */

public class ResetPwdActivity extends BaseActivity {

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
    @BindView(R.id.et_phone)
    EditText mEtPhone;
    @BindView(R.id.et_code)
    EditText mEtCode;
    @BindView(R.id.btn_next)
    Button mBtnNext;
    private String mCode1;  //验证码
    private String mPhone1;  //手机号
    @Override
    protected int getLayoutId() {
        return R.layout.reset_pwd_activity;
    }

    @Override
    protected void setUpView() {
        mPhone1 = getIntent().getStringExtra("phone");
        mCode1 = getIntent().getStringExtra("code");
        initView();
        initListener();
    }

    private void initView() {
        mBtnNext.setBackgroundResource(R.mipmap.login_color1);
        mBtnNext.setEnabled(false);
        mTvTitle.setText("忘记密码");
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
                if(!TextUtils.isEmpty(phone)&&!TextUtils.isEmpty(code)){

                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.drawable.selector_btn));
                    mBtnNext.setEnabled(true);
                }else{
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                    mBtnNext.setEnabled(false);
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
                if(!TextUtils.isEmpty(phone)&&!TextUtils.isEmpty(code)){
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.drawable.selector_btn));
                    mBtnNext.setEnabled(true);
                }else{
                    mBtnNext.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                    mBtnNext.setEnabled(false);
                }
            }
        });
    }

    @OnClick(R.id.btn_next)
    public void onViewClicked() {
        //完成重置密码
        String phone = mEtPhone.getText().toString().trim();
        String code = mEtCode.getText().toString().trim();
        if(!phone.equals(code)){
            showToast("两次输入的密码不一致");
            return;
        }
        NetPresenter.loginManagePwd(mPhone1, phone, code, mCode1, new ApiCallBack<LoginManagePwdBean>(this) {
            @Override
            protected void onSuccess(LoginManagePwdBean data, String msg) {
                try {
                    AccountBean accountBean = (AccountBean) SPUtils.getInstance(context)
                            .getObjectPreferences(Constants.SP_ACCOUNTNUMBER);
                    if (accountBean != null) {
                        accountBean.setPassword(AppUtils.aesEnc(phone, AppUtils.k(ResetPwdActivity.this)));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                showToast(msg);
                ActivityManager.getIntence().finishAllActivity();
                startActivity(new Intent(ResetPwdActivity.this,LoginActivity.class));
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });
    }
}
