package com.hanyu.hysj.ui;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsCategoryBean;

public class GoodsCategory2Adapter extends BaseQuickAdapter<GoodsCategoryBean, BaseViewHolder> {
    public GoodsCategory2Adapter() {
		super(R.layout.goods_category2_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, GoodsCategoryBean dataBean) {
        baseViewHolder.setText(R.id.tv_title, dataBean.getName());
    }
}
