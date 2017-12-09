package com.hanyu.hysj.ui;

import android.view.View;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsCategoryBean;

public class OrderCategoryAdapter extends BaseQuickAdapter<GoodsCategoryBean, BaseViewHolder> {
    public OrderCategoryAdapter() {
		super(R.layout.order_category_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, GoodsCategoryBean dataBean) {
        baseViewHolder.setText(R.id.tv_name, dataBean.getName());
        if (dataBean.isSelect()) {
            baseViewHolder.getView(R.id.ll_item).setBackgroundResource(R.color.colorWhite);
            baseViewHolder.getView(R.id.v_sel).setVisibility(View.VISIBLE);
            TextView tv_name = baseViewHolder.getView(R.id.tv_name);
            tv_name.setTextColor(mContext.getResources().getColor(R.color.stand_text_title2));
        }else {
            baseViewHolder.getView(R.id.ll_item).setBackgroundResource(R.color.stand_bg_light);
            baseViewHolder.getView(R.id.v_sel).setVisibility(View.INVISIBLE);
            TextView tv_name = baseViewHolder.getView(R.id.tv_name);
            tv_name.setTextColor(mContext.getResources().getColor(R.color.colorBlack));
        }
    }
}
