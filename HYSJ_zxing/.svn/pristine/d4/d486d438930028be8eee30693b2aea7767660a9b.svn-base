package com.hanyu.hysj.ui;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemChildClickListener;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListFragment;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.AppUtils;
import com.hanyu.hysj.weight.NumberButton;

import java.util.List;

// 帮客户点单
public class OrderInfoFragment extends BaseListFragment {
    private String category_id = "";
    private String goods_number = "0";
    private String is_on_sale = "1";

    @Override
    protected void handlerArguments(Bundle arguments) {
        super.handlerArguments(arguments);
        category_id = arguments.getString("category_id");
    }

    @Override
    protected void setUpView() {
        super.setUpView();

        recyclerView.addOnItemTouchListener(new OnItemChildClickListener() {
            @Override
            public void onSimpleItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                GoodsGoodsBean.DataEntity item = (GoodsGoodsBean.DataEntity) adapter.getItem(position);
                if (view.getId() == R.id.btn_num) {//购物车加减
                    NumberButton btnNum = (NumberButton) view;
                    btnNum.setOnClickWhichListener(new NumberButton.OnClickWhich() {
                        @Override
                        public void addBtn() {
                            if (AppUtils.isDoubleClick()) {
                                int number = item.getCount();
                                int buyMax = Integer.parseInt(item.getGoods_number());
                                if (number == buyMax) {
                                    showToast("库存不足！");
                                    return;
                                }
                                number++;
                                item.setCount(number);
                                adapter.notifyDataSetChanged();
                                calc(item);
                            }
                        }

                        @Override
                        public void subBtn() {
                            if (AppUtils.isDoubleClick()) {
                                int number = item.getCount();
                                if (number == 0) {
                                    return;
                                }
                                number--;
                                item.setCount(number);
                                adapter.notifyDataSetChanged();
                                calc(item);
                            }
                        }
                    });
                }
            }
        });

        load();
    }

    private void calc(GoodsGoodsBean.DataEntity item) {     //只是把加减后的信息同步到购物车
        Activity activity = getActivity();
        if (activity instanceof OrderInfoActivity) {
            ((OrderInfoActivity) activity).calc(item);
            ((OrderInfoActivity) activity).refreshCart();
            ((OrderInfoActivity) activity).updateCart();
        }
    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.templete_list_view;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new OrderInfoAdapter();
        return adapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
    }

    @Override
    protected void request() {
        NetPresenter.goodsGoods(KeyUtil.getKey(), category_id, is_on_sale, "" + getCurrentPage(), "" + getCountInPage(), goods_number, new ApiCallBack<GoodsGoodsBean>(getActivity()) {
            @Override
            protected void onSuccess(GoodsGoodsBean data, String msg) {     //上拉更多，把购物车中的信息同步到列表
                if (data != null) {
                    OrderInfoFragment.this.onSucceed(data.getData());
                    Activity activity = getActivity();
                    if (activity instanceof OrderInfoActivity) {
                        ((OrderInfoActivity) activity).syncList();
                        ((OrderInfoActivity) activity).updateCart();
                    }
                } else {
                    OrderInfoFragment.this.onEmpty(R.layout.temp_loading_empty_view, 0, "");
                }
            }

            @Override
            protected void onFailure(String error) {
                OrderInfoFragment.this.onFailure(error);
            }
        });
    }

    public List<GoodsGoodsBean.DataEntity> getList() {
        return adapter.getData();
    }

    public void notifyDataSetChanged() {
        adapter.notifyDataSetChanged();
    }
}
