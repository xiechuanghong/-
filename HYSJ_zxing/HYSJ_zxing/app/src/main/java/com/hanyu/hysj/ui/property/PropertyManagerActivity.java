package com.hanyu.hysj.ui.property;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.AssetIndexBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.NetPresenter;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 资产管理
 * Created by Administrator on 2017/9/7.
 */

public class PropertyManagerActivity extends BaseActivity {

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
    @BindView(R.id.tv_balance)
    TextView mTvBalance;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;
    @BindView(R.id.ll_2)
    LinearLayout mLl2;
    @BindView(R.id.view_line)
    View mViewLine;

    @Override
    protected int getLayoutId() {
        return R.layout.property_manager_activity;
    }

    @Override
    protected void setUpView() {
        initView(); //
        getBalance();


    }

    private void initView() {
        mTvTitle.setText("资产管理");
    }


    @OnClick({R.id.iv_back, R.id.ll_1, R.id.ll_2})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.ll_1:
                //账户明细
                startActivity(new Intent(PropertyManagerActivity.this,AccountDetailedStatementActivity.class));
                break;
            case R.id.ll_2:
                //提现申请
                startActivityForResult(new Intent(PropertyManagerActivity.this,ApplyForWithdrawActivity.class),100);
                break;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode== Activity.RESULT_OK){
            String money = data.getStringExtra("money");
            mTvBalance.setText(money);
        }
    }

    public void getBalance() {
        NetPresenter.assetIndex(new ApiCallBack<AssetIndexBean>(this) {
            @Override
            protected void onSuccess(AssetIndexBean data, String msg) {
                if(data!=null){
                    mTvBalance.setText(data.getMoney());
                }
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });
    }
}
