package com.hanyu.hysj.ui;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.bean.GoodsCategoryBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;

import java.util.List;


// 商品类型
public class GoodsCategoryActivity extends BaseListActivity {
    @Override
    protected void setUpView() {
        super.setUpView();
        setTitleBarTitle("商品类型");
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.templete_list_title_view_white;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new GoodsCategory2Adapter();
        adapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                GoodsCategoryBean item = (GoodsCategoryBean) adapter.getItem(position);
                Intent intent = getIntent();
                intent.putExtra("category_id", item.getId());
                intent.putExtra("name", item.getName());
                setResult(Activity.RESULT_OK, intent);
                finish();
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
        NetPresenter.goodsCategory(KeyUtil.getKey(), "", new ApiCallBack<List<GoodsCategoryBean>>(this) {
            @Override
            protected void onSuccess(List<GoodsCategoryBean> data, String msg) {
                GoodsCategoryActivity.this.onSucceed(data);
            }

            @Override
            protected void onFailure(String error) {
                GoodsCategoryActivity.this.onFailure(error);
            }
        });
    }

    @Override
    protected boolean enableMore() {
        return false;
    }
}
