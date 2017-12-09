package com.hanyu.hysj.ui.login;

import android.content.Intent;
import android.support.v7.widget.AppCompatCheckBox;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.app.Constants;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.main.MainActivity;
import com.hanyu.hysj.util.AppUtils;
import com.hanyu.hysj.util.SPUtils;
import com.hyphenate.EMCallBack;
import com.hyphenate.chat.EMClient;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 登录
 * Created by Administrator on 2017/9/6.
 */

public class LoginActivity extends BaseActivity {

    @BindView(R.id.et_name)
    EditText mEtName;
    @BindView(R.id.et_pwd)
    EditText mEtPwd;
    @BindView(R.id.cb_remember_pwd)
    AppCompatCheckBox mCbRememberPwd;
    @BindView(R.id.tv_forget_pwd)
    TextView mTvForgetPwd;
    @BindView(R.id.btn_login)
    Button mBtnLogin;
    @BindView(R.id.iv_clean_name)
    ImageView mIvCleanName;
    @BindView(R.id.iv_clean_pwd)
    ImageView mIvCleanPwd;
    private String mName;
    private String mPwd;
    private static String account_version = "1";

    @Override
    protected int getLayoutId() {
        return R.layout.login_activity;
    }

    @Override
    protected void setUpView() {
        setEditText();
    }

    private void setEditText() {
        try {
            AccountBean accountBean = (AccountBean) SPUtils.getInstance(context)
                    .getObjectPreferences(Constants.SP_ACCOUNTNUMBER);
            if (accountBean != null) {
                if (accountBean.isRemember()) {//获取保存的用户名密码
                    mEtName.setText(accountBean.getUserName());
                    if (accountBean.getVersion().equals(account_version)) {
                        String pass = accountBean.getPassword();
                        mEtPwd.setText(AppUtils.aesDec(pass, AppUtils.k(this)));
                    }
                    mCbRememberPwd.setChecked(true);
                }
//                login(accountBean.getPassword(),accountBean.getPassword());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        mEtName.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                String s1 = s.toString();
                if(s1.length()>0){
                    mIvCleanName.setVisibility(View.VISIBLE);
                }else{
                    mIvCleanName.setVisibility(View.GONE);
                }

                if (s.length() == 11) {//自动切换下一行
                    mEtPwd.requestFocus();
                }
            }
        });
        mEtPwd.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                String s1 = s.toString();
                if(s1.length()>0){
                    mIvCleanPwd.setVisibility(View.VISIBLE);
                }else{
                    mIvCleanPwd.setVisibility(View.GONE);
                }

            }
        });
    }


    @OnClick({R.id.cb_remember_pwd, R.id.tv_forget_pwd, R.id.btn_login,R.id.iv_clean_name,R.id.iv_clean_pwd})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.cb_remember_pwd:
                //记住密码
                // toggole();
                break;
            case R.id.tv_forget_pwd:
                //忘记密码
                startActivity(new Intent(LoginActivity.this, ForgetPwdActivity.class));
                break;
            case R.id.btn_login:
                //登录
                mName = mEtName.getText().toString().trim();
                mPwd = mEtPwd.getText().toString().trim();
                if (TextUtils.isEmpty(mName)) {
                    showToast("请您输入账号");
                    return;
                }
                if (TextUtils.isEmpty(mPwd)) {
                    showToast("请您输入密码");
                    return;
                }
                login(mName, mPwd);
                break;
            case R.id.iv_clean_name:
                //清除用户名
                mEtName.setText("");
                break;
            case R.id.iv_clean_pwd:
                //清除密码
                mEtPwd.setText("");
                break;
        }
    }

    private void login(String name, String pwd) {
        NetPresenter.loginLogin(name, pwd, new ApiCallBack<LoginLoginBean>(this) {

            @Override
            protected void onSuccess(LoginLoginBean data, String msg) {
                loginSuccess(data, msg);
            }


            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });

    }

    private void loginSuccess(LoginLoginBean data, String msg) {
        if (TextUtils.isEmpty(EMClient.getInstance().getCurrentUser())) {
            EMClient.getInstance().logout(true);
        }
        EMClient.getInstance().login(data.getHuanxin(), data.getHuanxin_pwd(), new EMCallBack() {
            @Override
            public void onSuccess() {
                LoginActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //保存登录 bean
                        SPUtils.getInstance(context).setObjectPreferences(Constants.SP_LOGIN, data);

                        //--------------保存token----------------------------
                        try {
                            AccountBean accountBean = new AccountBean(mEtName.getText().toString().trim(),
                                    AppUtils.aesEnc(mEtPwd.getText().toString().trim(), AppUtils.k(LoginActivity.this)), account_version);
                            accountBean.setRemember(mCbRememberPwd.isChecked());
                            SPUtils.getInstance(context).setObjectPreferences(Constants.SP_ACCOUNTNUMBER, accountBean);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        SPUtils.getInstance(context).putValue(Constants.SP_TOKEN, data.getToken());//保存key

                        EMClient.getInstance().groupManager().loadAllGroups();
                        EMClient.getInstance().chatManager().loadAllConversations();
                        startActivity(new Intent(LoginActivity.this, MainActivity.class));
                        finish();
                    }
                });
            }

            @Override
            public void onError(int i, String s) {
                LoginActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        showToast("登录失败");
                        return;
                    }
                });
            }

            @Override
            public void onProgress(int i, String s) {
            }
        });
    }
}
