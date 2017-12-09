package com.hanyu.hysj.ui.property;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.text.Editable;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.AssetWithdrawBean;
import com.hanyu.hysj.bean.UserPapersBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.setting.ForgetWithdrawPwdActivity;
import com.hanyu.hysj.util.Md5Utils;
import com.hanyu.hysj.util.Tools;

import butterknife.BindView;
import butterknife.OnClick;


/**
 * 提现申请
 * Created by Administrator on 2017/9/7.
 */

public class ApplyForWithdrawActivity extends BaseActivity {

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
    @BindView(R.id.tv_text)
    TextView mTvText;
    @BindView(R.id.tv_nickname)
    TextView mTvNickname;
    @BindView(R.id.tv_number)
    TextView mTvNumber;
    @BindView(R.id.ll_user)
    LinearLayout mLlUser;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;
    @BindView(R.id.et_money)
    EditText mEtMoney;
    @BindView(R.id.tv_balance_money)
    TextView mTvBalanceMoney;
    @BindView(R.id.tv_withdraw_money_all)
    TextView mTvWithdrawMoneyAll;
    @BindView(R.id.btn_withdraw_money_all)
    Button mBtnWithdrawMoneyAll;
    @BindView(R.id.iv_clean)
    ImageView mIvClean;
    private String mBalance = "";
    private String id = "";
    private double mixBalace = 10.00;

    @Override
    protected int getLayoutId() {
        return R.layout.apply_for_withdraw_activity;
    }

    @Override
    protected void setUpView() {
//        mBalance = getIntent().getStringExtra("money");
        initView();
        getAccountMessage();
        initListener();

    }

    private void initView() {
        mBtnWithdrawMoneyAll.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
        mBtnWithdrawMoneyAll.setEnabled(false);
        mTvTitle.setText("提现申请");
    }

    private void initListener() {
        mEtMoney.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                if (s.toString().contains(".")) {
                    if (s.length() - 1 - s.toString().indexOf(".") > 2) {
                        s = s.toString().subSequence(0,
                                s.toString().indexOf(".") + 3);
                        mEtMoney.setText(s);
                        mEtMoney.setSelection(s.length());
                    }
                }
                if (s.toString().trim().substring(0).equals(".")) {
                    s = "0" + s;
                    mEtMoney.setText(s);
                    mEtMoney.setSelection(2);
                }

                if (s.toString().startsWith("0")
                        && s.toString().trim().length() > 1) {
                    if (!s.toString().substring(1, 2).equals(".")) {
                        mEtMoney.setText(s.subSequence(0, 1));
                        mEtMoney.setSelection(1);
                        return;
                    }
                }
            }

            @Override
            public void afterTextChanged(Editable s) {
                String trim = s.toString().trim();
                if(!TextUtils.isEmpty(trim)){
                    mIvClean.setVisibility(View.VISIBLE);
                    if(!TextUtils.isEmpty(id)){
                        mBtnWithdrawMoneyAll.setBackgroundDrawable(getResources().getDrawable(R.drawable.selector_btn));
                        mBtnWithdrawMoneyAll.setEnabled(true);
                    }
                }else{
                    mIvClean.setVisibility(View.GONE);
                    mBtnWithdrawMoneyAll.setBackgroundDrawable(getResources().getDrawable(R.mipmap.login_color1));
                    mBtnWithdrawMoneyAll.setEnabled(false);
                }
            }
        });

    }

    @OnClick({R.id.iv_back, R.id.ll_1, R.id.tv_withdraw_money_all, R.id.btn_withdraw_money_all,R.id.iv_clean})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.ll_1:
                //如果没有绑定支付宝则跳转绑定支付宝
                startActivityForResult(new Intent(ApplyForWithdrawActivity.this, SelectAccountActivity.class).putExtra("id",id),100);
                break;
            case R.id.tv_withdraw_money_all:
                //全部提现
                mEtMoney.setText(mBalance);
                break;
            case R.id.btn_withdraw_money_all:
                //提现
                if(Double.valueOf(mEtMoney.getText().toString().trim())<mixBalace){
                    showToast("最低提现金额不能低于10元，请您重新输入");
                    return;
                }
                if(Double.valueOf(mEtMoney.getText().toString().trim())>Double.valueOf(mBalance)){
                    showToast("您的提现金额大于您的余额，请您重新输入");
                    return;
                }

                Tools.showPwdDialog(this, new Tools.OnPwdDialogSelectListener() {

                    @Override
                    public void onClick(Dialog dialog) {
                        dialog.dismiss();
                        startActivity(new Intent(ApplyForWithdrawActivity.this,ForgetWithdrawPwdActivity.class));
                    }

                    @Override
                    public void onFinish(String pwd, Dialog dialog) {
                        applyWithdraw(pwd,dialog);
                    }
                });
                break;
            case R.id.iv_clean:
                //清除
                mEtMoney.setText("");
                break;

        }
    }

    private void applyWithdraw(String pd, Dialog dialog) {
        String money = mEtMoney.getText().toString().trim();
//        String pd = (String) SPUtils.getInstance(this).getValue(Constants.SP_PD, String.class);
        pd = Md5Utils.encode(pd);
        NetPresenter.assetWithdraw(KeyUtil.getKey(), money, id, pd, new ApiCallBack<AssetWithdrawBean>(this) {
            @Override
            protected void onSuccess(AssetWithdrawBean data, String msg) {
                showToast(msg);
                dialog.dismiss();
                setResult(RESULT_OK,new Intent().putExtra("money",data.getMoney()));
                finish();
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
//                dialog.dismiss();
            }
        });


    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode== Activity.RESULT_OK){
            UserPapersBean.DataBean dataBean = (UserPapersBean.DataBean) data.getSerializableExtra("dataBean");
            Log.d("lbx", "name :"+dataBean.getName());
            Log.d("lbx", "number :"+dataBean.getAccount());
            mTvNickname.setText(dataBean.getName());
            mTvNumber.setText("("+dataBean.getAccount()+")");
            id = dataBean.getId();
        }
    }

    public void getAccountMessage() {
        //assetWithdraw
        NetPresenter.assetWithdraw(new ApiCallBack<AssetWithdrawBean>(this) {
            @Override
            protected void onSuccess(AssetWithdrawBean data, String msg) {
                if(data!=null){
                    mBalance = data.getMoney();
                    mTvBalanceMoney.setText("帐户可用余额 "+mBalance+" 元");
                    if(TextUtils.isEmpty(data.getName())&&TextUtils.isEmpty(data.getAccount())){
                        mLlUser.setVisibility(View.GONE);
                    }else{
                        mTvNickname.setText(data.getName());
                        mTvNumber.setText("("+data.getAccount()+")");
                        id = data.getId();
                    }
                }
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });

    }
}
