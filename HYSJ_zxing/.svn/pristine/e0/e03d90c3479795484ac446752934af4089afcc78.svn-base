package com.hanyu.hysj.ui.setting;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.app.Constants;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.IndexLoginOutBean;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.login.AccountBean;
import com.hanyu.hysj.ui.login.LoginActivity;
import com.hanyu.hysj.util.ActivityManager;
import com.hanyu.hysj.util.SPUtils;
import com.hanyu.hysj.util.Tools;
import com.hyphenate.chat.EMClient;

import butterknife.BindView;
import butterknife.OnClick;

import static com.hanyu.hysj.R.id.tv_phone;

/**
 * 账号管理
 * Created by Administrator on 2017/9/9.
 */

public class AccountManagerActivity extends BaseActivity {
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
    @BindView(tv_phone)
    TextView mTvPhone;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;
    @BindView(R.id.tv_name)
    TextView mTvName;
    @BindView(R.id.ll_2)
    LinearLayout mLl2;
    @BindView(R.id.tv_change)
    TextView mTvChange;
    @BindView(R.id.ll_3)
    LinearLayout mLl3;
    @BindView(R.id.btn_exit)
    Button mBtnExit;

    @Override
    protected int getLayoutId() {
        return R.layout.account_manager_activity;
    }

    @Override
    protected void setUpView() {
        initView();


    }

    private void initView() {
        AccountBean accountBean = (AccountBean) SPUtils.getInstance(context)
                .getObjectPreferences(Constants.SP_ACCOUNTNUMBER);
        LoginLoginBean loginBean = SPUtils.getInstance(this).getLoginBean();
        if(accountBean!=null){
            mTvPhone.setText(accountBean.getUserName());
        }
        if(loginBean!=null){
            mTvName.setText(loginBean.getUsername());
        }
        mTvTitle.setText("账号管理");
    }


    @OnClick({R.id.iv_back, R.id.ll_2, R.id.ll_3,R.id.btn_exit})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.ll_2:
                //更改管理员名字
                startActivityForResult(new Intent(AccountManagerActivity.this, ChangeManagerNickNameActivity.class),100);
                break;
            case R.id.ll_3:
                //修改账号密码
                break;
            case R.id.btn_exit:
                //退出登录
                Tools.showWarnDialog(this, "退出登录", "您确定要退出登录？", "取消", "确定", new Tools.OnDialogSelectListener() {
                    @Override
                    public void onClickOk() {
                        exit();
                    }

                    @Override
                    public void onClickCancle() {
                    }
                });
                break;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode== Activity.RESULT_OK){
            Log.d("lbx", "11111111");
            String nickName = data.getStringExtra("nickName");
            mTvName.setText(nickName);
        }

    }

    private void exit() {
        NetPresenter.indexLoginOut(new ApiCallBack<IndexLoginOutBean>(this) {
            @Override
            protected void onSuccess(IndexLoginOutBean data, String msg) {
                showToast(msg);
                loginOut();
                ActivityManager.getIntence().finishAllActivity();
                startActivity(new Intent(AccountManagerActivity.this, LoginActivity.class));
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });
    }

    private void loginOut() {
        SPUtils.getInstance(context).setObjectPreferences(Constants.SP_LOGIN, null);  //清除loginBean
        SPUtils.getInstance(context).putValue(Constants.SP_TOKEN, null);//清除key
        EMClient.getInstance().logout(true);
    }

}
