package com.hanyu.hysj.ui.menu;

import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.SeatGetOpenSeatAll;

import java.util.List;

public class SeatsAdapter extends BaseQuickAdapter<SeatGetOpenSeatAll, BaseViewHolder> {

    public SeatsAdapter(List<SeatGetOpenSeatAll> list) {
        super(R.layout.seats_adapter, list);
    }

    @Override
    protected void convert(BaseViewHolder helper, SeatGetOpenSeatAll item) {
        ((TextView) helper.getView(R.id.tv_title)).setText(item.getTable_number());
    }
}
