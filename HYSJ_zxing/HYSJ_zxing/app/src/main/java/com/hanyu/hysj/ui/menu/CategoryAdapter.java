package com.hanyu.hysj.ui.menu;

import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsCategoryBean;

import java.util.List;

public class CategoryAdapter extends BaseQuickAdapter<GoodsCategoryBean, BaseViewHolder> {

    public CategoryAdapter(List<GoodsCategoryBean> list) {
        super(R.layout.item_pop_item, list);
    }

    @Override
    protected void convert(BaseViewHolder helper, GoodsCategoryBean item) {
        ((TextView) helper.getView(R.id.tv_title)).setText(item.getName());
    }
}
