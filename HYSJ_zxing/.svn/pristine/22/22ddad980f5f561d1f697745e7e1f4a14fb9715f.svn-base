package com.hanyu.hysj.ui;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.bean.UserMoneyLog;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;

// 账号变动
public class AccountInfoActivity extends BaseListActivity {
    private String user_id = "";

    @Override
    protected void setUpView() {
        super.setUpView();
        user_id = getIntent().getStringExtra("user_id");
        String title = getIntent().getStringExtra("title");
        setTitleBarTitle(title);
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.templete_list_title_view;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new AccountInfoAdapter();
        return adapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
    }

    @Override
    protected void request() {
        NetPresenter.userMoneyLog(KeyUtil.getKey(), user_id, "" + getCountInPage(), "" + getCurrentPage(), new ApiCallBack<UserMoneyLog>(this) {
            @Override
            protected void onSuccess(UserMoneyLog data, String msg) {
                if (data != null) {
                    AccountInfoActivity.this.onSucceed(data.getData());
                } else {
                    AccountInfoActivity.this.onSucceed(null);
                }
            }

            @Override
            protected void onFailure(String error) {
                AccountInfoActivity.this.onFailure(error);
            }
        });
    }

    @Override
    protected boolean enableMore() {
        return false;
    }
}
