package com.hanyu.hysj.ui;

import android.os.Bundle;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;

// 会员订单列表
public class OrderManageInfoActivity extends BaseActivity {
    private String user_id;
    private OrderManageInfoFragment fragment;

    @Override
    protected void setUpView() {
        user_id = getIntent().getStringExtra("user_id");
        setTitleBarTitle("会员订单列表");

        fragment = new OrderManageInfoFragment();
        Bundle bundle = new Bundle();
        bundle.putString("user_id", getIntent().getStringExtra("user_id"));
        bundle.putString("status", "0");
        fragment.setArguments(bundle);

        getSupportFragmentManager().beginTransaction()
                .add(R.id.fl_content, fragment)
                .commit();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.order_manage_info_activity;
    }
}
