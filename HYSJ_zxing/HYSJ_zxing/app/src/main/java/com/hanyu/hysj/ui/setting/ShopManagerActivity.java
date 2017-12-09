package com.hanyu.hysj.ui.setting;

import android.support.v7.widget.AppCompatCheckBox;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.bean.ShopOnOffBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.ImageLoader;
import com.hanyu.hysj.util.SPUtils;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 店铺管理
 * Created by Administrator on 2017/9/9.
 */

public class ShopManagerActivity extends BaseActivity {
    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.iv_icon)
    ImageView mIvIcon;
    @BindView(R.id.tv_address)
    TextView mTvAddress;
    @BindView(R.id.rl_1)
    RelativeLayout mRl1;
    @BindView(R.id.cb_box)
    AppCompatCheckBox mCbBox;

    @Override
    protected int getLayoutId() {
        return R.layout.shop_manager_activity;
    }

    @Override
    protected void setUpView() {
        initView();

    }

    private void initView() {
        LoginLoginBean loginBean = SPUtils.getInstance(this).getLoginBean();
        if(loginBean!=null){
            mTvAddress.setText(loginBean.getHotel_name());
            ImageLoader.loadToUrl(this,mIvIcon,loginBean.getHead_img());
            if("0".equals(loginBean.getIs_valid())){
                mCbBox.setChecked(false);
            }else{
                mCbBox.setChecked(true);
            }
        }
        mTvTitle.setText("店铺管理");

    }

    @OnClick({R.id.iv_back, R.id.cb_box})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.cb_box:
                toggleChangeBar();
                break;
        }
    }

    private void toggleChangeBar() {
        if(mCbBox.isChecked()){
           NetPresenter.shopOnOff(KeyUtil.getKey(), "1", new ApiCallBack<ShopOnOffBean>(this) {
            @Override
            protected void onSuccess(ShopOnOffBean data, String msg) {
                showToast(msg);
                mCbBox.setChecked(true);
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
                mCbBox.setChecked(false);
            }
        });
        }else{
            NetPresenter.shopOnOff(KeyUtil.getKey(), "0", new ApiCallBack<ShopOnOffBean>(this) {
                @Override
                protected void onSuccess(ShopOnOffBean data, String msg) {
                    showToast(msg);
                    mCbBox.setChecked(false);
                }

                @Override
                protected void onFailure(String error) {
                    showToast(error);
                    mCbBox.setChecked(true);
                }
            });
        }

    }
}
