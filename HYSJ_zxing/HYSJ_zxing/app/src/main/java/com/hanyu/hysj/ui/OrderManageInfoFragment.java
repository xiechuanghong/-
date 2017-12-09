package com.hanyu.hysj.ui;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListFragment;
import com.hanyu.hysj.bean.OrderIndexBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;

// 订单管理内的fragment
public class OrderManageInfoFragment extends BaseListFragment {
    private String status;
    private String user_id;     //会员管理--订单时传入

    @Override
    protected void handlerArguments(Bundle arguments) {
        super.handlerArguments(arguments);
        status = arguments.getString("status");
        user_id = arguments.getString("user_id");
    }

    @Override
    protected void setUpView() {
        super.setUpView();
    }

    @Override
    public void onResume() {
        super.onResume();
        load();
    }

//    @Override
//    public void onHiddenChanged(boolean hidden) {
//        super.onHiddenChanged(hidden);
//        if(!hidden){
//            load();
//        }
//    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.templete_list_view;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new OrderManageAdapter(user_id);
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                OrderIndexBean.DataEntity item = (OrderIndexBean.DataEntity) adapter.getItem(position);
                if (view.getId() == R.id.tv_manager) {
                    Intent intent = new Intent(context, SeatDetailActivity.class);
                    intent.putExtra("table_id", item.getTable_id());
                    startActivity(intent);
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
        NetPresenter.orderIndex(KeyUtil.getKey(), "" + getCurrentPage(), status, "" + getCountInPage(), user_id, new ApiCallBack<OrderIndexBean>(getActivity()) {
            @Override
            protected void onSuccess(OrderIndexBean data, String msg) {
                if (data != null) {
                    OrderManageInfoFragment.this.onSucceed(data.getData());
                } else {
                    onEmptyView();
                }
            }

            @Override
            protected void onFailure(String error) {
                OrderManageInfoFragment.this.onFailure(error);
            }
        });
    }

    public void onEmptyView() {
        super.onEmpty(R.layout.temp_loading_empty_view, 0, "---- 未找到相关订单 ----");
    }
}
