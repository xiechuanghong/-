package com.hanyu.hysj.ui;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.SeatDetailsBean;

public class SeatDetailAdapter extends BaseQuickAdapter<SeatDetailsBean.OrderEntity, BaseViewHolder> {
    public SeatDetailAdapter() {
		super(R.layout.seat_detail_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, SeatDetailsBean.OrderEntity dataBean) {
        baseViewHolder.addOnClickListener(R.id.tv_print);

        baseViewHolder.setText(R.id.tv_no, dataBean.getOrder_sn());

        RecyclerView rv_order_list = baseViewHolder.getView(R.id.rv_order_list);
        rv_order_list.setHasFixedSize(true);
        rv_order_list.setLayoutManager(new LinearLayoutManager(mContext));
        SeatDetailOrderAdapter itemAdapter = new SeatDetailOrderAdapter();
        itemAdapter.setNewData(dataBean.getGoods());
        rv_order_list.setAdapter(itemAdapter);
    }
}
