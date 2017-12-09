package com.hanyu.hysj.ui;

import android.view.View;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.SeatIndexBean;

public class SeatManageAdapter extends BaseQuickAdapter<SeatIndexBean.DataEntity, BaseViewHolder> {
    public SeatManageAdapter() {
        super(R.layout.seat_manage_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, SeatIndexBean.DataEntity dataBean) {
        baseViewHolder.addOnClickListener(R.id.tv_reserve);
        baseViewHolder.addOnClickListener(R.id.tv_action);

        baseViewHolder.setText(R.id.tv_no, "台号：" + dataBean.getTable_number());

        //status : 0：空闲，1：预订，2：开台
        if ("0".equals(dataBean.getStatus())) {
            baseViewHolder.getView(R.id.ll_info).setVisibility(View.GONE);
            baseViewHolder.getView(R.id.tv_reserve).setVisibility(View.VISIBLE);

            baseViewHolder.getView(R.id.ll_all).setBackgroundResource(R.drawable.bg_seat_blue_edge);
            baseViewHolder.getView(R.id.ll_title).setBackgroundResource(R.drawable.bg_seat_blue);

            baseViewHolder.setText(R.id.tv_total, "均消：￥" + dataBean.getAvg_price());
            TextView tv_total = baseViewHolder.getView(R.id.tv_total);
            tv_total.setTextColor(mContext.getResources().getColor(R.color.seat_blue));
            baseViewHolder.setText(R.id.tv_action, "开台");
        } else if ("1".equals(dataBean.getStatus())) {
            baseViewHolder.getView(R.id.ll_info).setVisibility(View.VISIBLE);
            baseViewHolder.getView(R.id.tv_reserve).setVisibility(View.GONE);

            baseViewHolder.getView(R.id.ll_all).setBackgroundResource(R.drawable.bg_seat_yellow_edge);
            baseViewHolder.getView(R.id.ll_title).setBackgroundResource(R.drawable.bg_seat_yellow);

            baseViewHolder.setText(R.id.tv_time, "到店时间：" + dataBean.getDaoda_time());
            baseViewHolder.setText(R.id.tv_count, "人数：" + dataBean.getMin_person() + "人 - " + dataBean.getMax_person() + "人");
            baseViewHolder.setText(R.id.tv_total, "均消：￥" + dataBean.getAvg_price());
            TextView tv_total = baseViewHolder.getView(R.id.tv_total);
            tv_total.setTextColor(mContext.getResources().getColor(R.color.stand_yellow));

            baseViewHolder.setText(R.id.tv_action, "开台");
        } else if ("2".equals(dataBean.getStatus())) {
            baseViewHolder.getView(R.id.ll_info).setVisibility(View.VISIBLE);
            baseViewHolder.getView(R.id.tv_reserve).setVisibility(View.GONE);

            baseViewHolder.getView(R.id.ll_all).setBackgroundResource(R.drawable.bg_seat_purple_edge);
            baseViewHolder.getView(R.id.ll_title).setBackgroundResource(R.drawable.bg_seat_purple);

            baseViewHolder.setText(R.id.tv_time, "开台时间：" + dataBean.getOpen_time());
            baseViewHolder.setText(R.id.tv_count, "人数：" + dataBean.getMin_person() + "人 - " + dataBean.getMax_person() + "人");
            baseViewHolder.setText(R.id.tv_total, "总消费：￥" + dataBean.getAvg_price());
            TextView tv_total = baseViewHolder.getView(R.id.tv_total);
            tv_total.setTextColor(mContext.getResources().getColor(R.color.seat_purple));

            baseViewHolder.setText(R.id.tv_action, "清台");
        }
    }
}
