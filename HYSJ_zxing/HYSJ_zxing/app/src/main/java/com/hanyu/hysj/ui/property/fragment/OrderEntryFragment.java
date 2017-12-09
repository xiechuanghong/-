package com.hanyu.hysj.ui.property.fragment;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListFragment;
import com.hanyu.hysj.base.LoadingView;
import com.hanyu.hysj.bean.AssetLogBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.property.AccountDetailedActivity;
import com.hanyu.hysj.ui.property.adapter.AllAdapter;

import butterknife.BindView;

/**
 * 订单入账fragment
 * Created by Administrator on 2017/9/10.
 */

public class OrderEntryFragment extends BaseListFragment {

    @BindView(R.id.loadingView)
    LoadingView mLoadingView;
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;
    @BindView(R.id.swipeRefreshLayout)
    SwipeRefreshLayout mSwipeRefreshLayout;

    @Override
    protected BaseQuickAdapter createAdapter() {
        AllAdapter allAdapter = new AllAdapter(R.layout.account_list_item, null);
        allAdapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                AssetLogBean.DataBean item = (AssetLogBean.DataBean) adapter.getItem(position);
                Bundle bundle = new Bundle();
                Intent intent = new Intent(getContext(),AccountDetailedActivity.class);
                bundle.putSerializable("item",item);
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });
        return allAdapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(getContext());
    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.all_fragment;
    }

    @Override
    protected void setUpView() {
        super.setUpView();
        load();
    }

    @Override
    protected void request() {
        NetPresenter.assetLog(KeyUtil.getKey(), getCurrentPage() + "", getCountInPage() + "", "1", new ApiCallBack<AssetLogBean>(getActivity()) {
            @Override
            protected void onSuccess(AssetLogBean data, String msg) {
                onSucceed(data.getData());

            }

            @Override
            protected void onFailure(String error) {
                showToast(error);

            }
        });

    }

}
