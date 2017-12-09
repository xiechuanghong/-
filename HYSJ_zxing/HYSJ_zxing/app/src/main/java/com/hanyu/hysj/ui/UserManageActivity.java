package com.hanyu.hysj.ui;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemClickListener;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.bean.UserIndexBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.menu.UIUtils;
import com.hanyu.hysj.ui.menu.UserManageMenuAdapter;
import com.hanyu.hysj.weight.ClearEditText;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

// 会员管理
public class UserManageActivity extends BaseListActivity {
    @BindView(R.id.searchView)
    ClearEditText searchView;
    @BindView(R.id.searchButton)
    TextView searchButton;

    private PopupWindow popupWindow;
    private String nickname = "";

    @Override
    protected void setUpView() {
        super.setUpView();
        setTitleBarTitle("会员管理");
        initEditText();
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.user_manage_activity;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new UserManageAdapter();
        adapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                UserIndexBean.DataEntity item = (UserIndexBean.DataEntity) adapter.getItem(position);
                Intent intent = new Intent(context, UserDetailActivity.class);
                intent.putExtra("user_id", item.getUser_id());
                startActivity(intent);
            }
        });
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                UserIndexBean.DataEntity item = (UserIndexBean.DataEntity) adapter.getItem(position);
                if (view.getId() == R.id.iv_menu) {
                    List<String> list = new ArrayList<String>();
                    list.add("查看");
                    list.add("订单");
                    popupWindow = UIUtils.showMeun(UserManageActivity.this, new UserManageMenuAdapter(list), new OnItemClickListener() {
                        @Override
                        public void onSimpleItemClick(BaseQuickAdapter adapter, View view, int position) {
                            popupWindow.dismiss();
                            if (position == 0) {
                                Intent intent = new Intent(context, UserDetailActivity.class);
                                intent.putExtra("user_id", item.getUser_id());
                                startActivity(intent);
                            } else if (position == 1) {
                                Intent intent = new Intent(context, OrderManageInfoActivity.class);
                                intent.putExtra("user_id", item.getUser_id());
                                startActivity(intent);
                            }
                        }
                    });
                    popupWindow.showAsDropDown(view);
                }
            }
        });
        return adapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
    }

    @Override
    protected void request() {
        NetPresenter.userIndex(KeyUtil.getKey(), "" + getCurrentPage(), "" + getCountInPage(), nickname, new ApiCallBack<UserIndexBean>(this) {
            @Override
            protected void onSuccess(UserIndexBean data, String msg) {
                UserManageActivity.this.onSucceed(data.getData());
            }

            @Override
            protected void onFailure(String error) {
                UserManageActivity.this.onFailure(error);
            }
        });
    }

    private void initEditText() {
        searchView.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                String text = s.toString().trim();
                if (!text.isEmpty()) {
                    searchButton.setVisibility(View.VISIBLE);//内容不为空时显示搜索按键
                } else {
                    searchButton.setVisibility(View.GONE);//隐藏
                    search();
                }
            }
        });
    }

    @OnClick({R.id.searchButton})
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.searchButton:
                search();
                break;
        }
    }

    private void search(){
        nickname = searchView.getText().toString();
        load();
    }
}
