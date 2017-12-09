package com.hanyu.hysj.ui;

import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.OrderIndexBean;

public class OrderManageAdapter extends BaseQuickAdapter<OrderIndexBean.DataEntity, BaseViewHolder> {
    private String user_id;

    public OrderManageAdapter(String user_id) {
        super(R.layout.order_manage_adapter);
        this.user_id = user_id;
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, OrderIndexBean.DataEntity dataBean) {
        baseViewHolder.addOnClickListener(R.id.tv_manager);
        baseViewHolder.addOnClickListener(R.id.tv_status);

        baseViewHolder.setText(R.id.tv_no, dataBean.getTable_number());
        baseViewHolder.setText(R.id.tv_open_time, "开台时间：" + dataBean.getOpen_time());

        baseViewHolder.setText(R.id.tv_order_no, dataBean.getOrder_sn());
        baseViewHolder.setText(R.id.tv_phone, dataBean.getPhone_number());
        baseViewHolder.setText(R.id.tv_client, dataBean.getNickname());
        baseViewHolder.setText(R.id.tv_googs_name, dataBean.getGoods());
        baseViewHolder.setText(R.id.tv_order_type, dataBean.getType());
        baseViewHolder.setText(R.id.tv_moeny, "￥" + dataBean.getOrder_amount());

        //pay_status：支付状态:1-未支付,2-已支付,3-已退款
        if (dataBean.getPay_status() == 1) {
            baseViewHolder.setText(R.id.tv_order_status, "未支付");
        } else if (dataBean.getPay_status() == 2) {
            baseViewHolder.setText(R.id.tv_order_status, "已付款");
        } else if (dataBean.getPay_status() == 3) {
            baseViewHolder.setText(R.id.tv_order_status, "已退款");
        }

        baseViewHolder.getView(R.id.iv_open).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                LinearLayout ll_content = baseViewHolder.getView(R.id.ll_content);
                ll_content.setVisibility(ll_content.getVisibility() == View.VISIBLE ? View.GONE : View.VISIBLE);
                ImageView iv_arrow = baseViewHolder.getView(R.id.iv_open);
                iv_arrow.setImageResource(ll_content.getVisibility() == View.VISIBLE ? R.mipmap.order_icon_upward : R.mipmap.order_icon_down);
            }
        });

        LinearLayout ll_manage = baseViewHolder.getView(R.id.ll_manage);
        if (TextUtils.isEmpty(user_id)) {
            ll_manage.setVisibility(View.VISIBLE);
        } else {
            ll_manage.setVisibility(View.GONE);
        }
    }
}
