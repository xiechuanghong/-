package com.hanyu.hysj.ui.menu;

import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.SeatIndexBean;

import java.util.List;

public class FloorAdapter extends BaseQuickAdapter<SeatIndexBean.FloorIdEntity, BaseViewHolder> {

    public FloorAdapter(List<SeatIndexBean.FloorIdEntity> list) {
        super(R.layout.item_pop_item, list);
    }

    @Override
    protected void convert(BaseViewHolder helper, SeatIndexBean.FloorIdEntity item) {
        ((TextView) helper.getView(R.id.tv_title)).setText(item.getTitle());
    }
}
