package com.hanyu.hysj.ui.setting;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.bean.UserSetWithdrawPassBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.ActivityManager;
import com.hanyu.hysj.util.Md5Utils;
import com.hanyu.hysj.util.SPUtils;
import com.hanyu.hysj.weight.passwordkey.PwdView;
import com.hanyu.hysj.weight.passwordkey.VirtualKeyboardView;

import butterknife.BindView;
import butterknife.OnClick;


/**
 * 忘记提现密码的设置
 * Created by Administrator on 2017/9/9.
 */

public class ForgetWithdrawPwdActivity_02 extends BaseActivity implements PwdView.OnFinishListener,VirtualKeyboardView.OnClickNumberListener{
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
    private int count = 1;
    private String firstPwd = "";
    private String secondPwd = "";
    private String mCode;
    private String mPhone;

    @Override
    protected int getLayoutId() {
        return R.layout.setting_withdraw_pwd_activity;
    }


    @Override
    protected void setUpView() {
        mCode = getIntent().getStringExtra("code");
        mPhone = getIntent().getStringExtra("phone");
        initView();

    }

    private void initView() {
        mTvTitle.setText("提现密码设置");
        mBtnOk.setEnabled(false);
        mBtnOk.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
        mPvPwd.setOnFinishListener(this);
        mVirtualKeyboardView.setOnClickNumberListener(this);
    }

    @OnClick({R.id.iv_back, R.id.btn_ok})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                break;
            case R.id.btn_ok:
                switch (count){
                    case 1:
                        count++;
                        mBtnOk.setEnabled(false);
                        mBtnOk.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                        for (int i = 0; i < mPvPwd.getTvList().length; i++) {
                            mPvPwd.getTvList()[i].setText("");
                            mPvPwd.getTvList()[i].setVisibility(View.VISIBLE);
                            mPvPwd.getImgList()[i].setVisibility(View.INVISIBLE);
                        }
                        mVirtualKeyboardView.setCurrentIndex(-1);
                        break;
                    case 2:
                        if(firstPwd.equals(secondPwd)){
                            firstPwd = Md5Utils.encode(firstPwd);
                            secondPwd = Md5Utils.encode(secondPwd);
                            mBtnOk.setEnabled(false);
                            mBtnOk.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                            NetPresenter.userSetWithdrawPass(KeyUtil.getKey(), firstPwd, secondPwd, mCode, mPhone, new ApiCallBack<UserSetWithdrawPassBean>(this) {
                                @Override
                                protected void onSuccess(UserSetWithdrawPassBean data, String msg) {
                                    showToast(msg);
                                    LoginLoginBean loginBean = SPUtils.getInstance(ForgetWithdrawPwdActivity_02.this).getLoginBean();
                                    if(loginBean!=null){
                                        loginBean.setPass(Md5Utils.encode("123321"));
                                    }
                                    //保存
//                                    SPUtils.getInstance(SettingWithdrawPwdActivity.this).putValue(Constants.SP_PD,firstPwd);
                                    ActivityManager.getIntence().removeActivity1("ForgetWithdrawPwdActivity_02");
                                    ActivityManager.getIntence().removeActivity1("ForgetWithdrawPwdActivity_01");
                                    ActivityManager.getIntence().removeActivity1("ForgetWithdrawPwdActivity");
                                }

                                @Override
                                protected void onFailure(String error) {
                                    showToast(error);
                                    finish();
                                }
                            });
                        }else{
                            showToast("请重新设置");
                            finish();
                        }
                        break;
                }
        }
    }

    @Override
    public void onFinish(String pwd) {
        mBtnOk.setEnabled(true);
        mBtnOk.setBackgroundDrawable(getResources().getDrawable(R.drawable.selector_btn));
        if(count==1){
            firstPwd = pwd;
        }
        if(count==2){
            secondPwd = pwd;
        }

    }

    @Override
    public void onClickNumber(int currentIndex, int position) {
        mPvPwd.getTvList()[currentIndex].setText(mVirtualKeyboardView.getList().get(position).get("name"));
        mPvPwd.getTvList()[currentIndex].setVisibility(View.INVISIBLE);
        mPvPwd.getImgList()[currentIndex].setVisibility(View.VISIBLE);

    }

    @Override
    public void onClickDelete(int currentIndex) {
        mPvPwd.getTvList()[currentIndex].setText("");
        mPvPwd.getTvList()[currentIndex].setVisibility(View.VISIBLE);
        mPvPwd.getImgList()[currentIndex].setVisibility(View.INVISIBLE);

    }




}
