package com.hanyu.hysj.ui;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsCategoryBean;

public class GoodsCategoryAdapter extends BaseQuickAdapter<GoodsCategoryBean, BaseViewHolder> {
    public GoodsCategoryAdapter() {
		super(R.layout.goods_category_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, GoodsCategoryBean dataBean) {
        baseViewHolder.addOnClickListener(R.id.tv_delete);
        baseViewHolder.addOnClickListener(R.id.tv_edit);
        baseViewHolder.addOnClickListener(R.id.tv_down);

        baseViewHolder.setText(R.id.tv_title, dataBean.getName());
        baseViewHolder.setText(R.id.tv_goods_count, "共"+dataBean.getGoods_count()+"件");
        if ("1".equals(dataBean.getIs_show())) {
            baseViewHolder.setText(R.id.tv_status, "上架中");
            baseViewHolder.setText(R.id.tv_down, "下架");
        } else {
            baseViewHolder.setText(R.id.tv_status, "已下架");
            baseViewHolder.setText(R.id.tv_down, "上架");
        }
    }
}
