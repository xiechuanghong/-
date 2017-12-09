package com.hanyu.hysj.ui;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.util.AppUtils;
import com.hanyu.hysj.weight.NumberButton;

public class OrderInfoCartAdapter extends BaseQuickAdapter<GoodsGoodsBean.DataEntity, BaseViewHolder> {
    public OrderInfoCartAdapter() {
		super(R.layout.cart_info_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, GoodsGoodsBean.DataEntity dataBean) {
        baseViewHolder.setIsRecyclable(false);

        baseViewHolder.addOnClickListener(R.id.btn_num);

        baseViewHolder.setText(R.id.tv_title, dataBean.getGoods_name());
        baseViewHolder.setText(R.id.tv_per, "￥" + AppUtils.multiply(dataBean.getGoods_price(), dataBean.getCount()));

        NumberButton numberButton = baseViewHolder.getView(R.id.btn_num);
        numberButton.setNumber(dataBean.getCount());
        numberButton.setBuyMax(Integer.parseInt(dataBean.getGoods_number()));
    }
}
