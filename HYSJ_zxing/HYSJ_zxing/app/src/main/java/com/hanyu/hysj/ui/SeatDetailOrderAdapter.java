package com.hanyu.hysj.ui;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.SeatDetailsBean;

public class SeatDetailOrderAdapter extends BaseQuickAdapter<SeatDetailsBean.OrderEntity.GoodsEntity, BaseViewHolder> {
    public SeatDetailOrderAdapter() {
		super(R.layout.seat_detail_order_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, SeatDetailsBean.OrderEntity.GoodsEntity dataBean) {
        baseViewHolder.setText(R.id.tv_title, dataBean.getGoods_name());
        baseViewHolder.setText(R.id.tv_money, "￥"+dataBean.getGoods_price());
        baseViewHolder.setText(R.id.tv_count, dataBean.getGoods_number()+"份");
    }
}
