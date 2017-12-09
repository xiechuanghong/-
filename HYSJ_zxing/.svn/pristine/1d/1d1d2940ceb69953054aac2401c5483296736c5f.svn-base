package com.hanyu.hysj.ui.menu;

import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;

import java.util.List;

public class UserManageMenuAdapter extends BaseQuickAdapter<String, BaseViewHolder> {

    public UserManageMenuAdapter(List<String> list) {
        super(R.layout.item_pop_item, list);
    }

    @Override
    protected void convert(BaseViewHolder helper, String item) {
        ((TextView) helper.getView(R.id.tv_title)).setText(item);
    }
}
