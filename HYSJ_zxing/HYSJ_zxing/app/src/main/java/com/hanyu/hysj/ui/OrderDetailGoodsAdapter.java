package com.hanyu.hysj.ui;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.OrderDetailsBean;

public class OrderDetailGoodsAdapter extends BaseQuickAdapter<OrderDetailsBean.GoodsEntity, BaseViewHolder> {
    public OrderDetailGoodsAdapter() {
        super(R.layout.order_detail_goods_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, OrderDetailsBean.GoodsEntity dataBean) {
        baseViewHolder.setText(R.id.tv_name, dataBean.getGoods_name());
        baseViewHolder.setText(R.id.tv_money, "￥" + dataBean.getGoods_price());
        baseViewHolder.setText(R.id.tv_count, dataBean.getGoods_number() + "份");
    }
}
