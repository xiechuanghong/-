package com.hanyu.hysj.ui.property.adapter;

import android.graphics.Color;
import android.support.annotation.LayoutRes;
import android.support.annotation.Nullable;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.AssetLogBean;

import java.util.List;

/**
 * Created by Administrator on 2017/9/10.
 */

public class AllAdapter extends BaseQuickAdapter<AssetLogBean.DataBean,BaseViewHolder> {

    public AllAdapter(@LayoutRes int layoutResId, @Nullable List<AssetLogBean.DataBean> data) {
        super(layoutResId, data);
    }

    @Override
    protected void convert(BaseViewHolder helper, AssetLogBean.DataBean item) {
        if(item!=null){
            helper.setText(R.id.tv_title, item.getTitle())
                    .setText(R.id.tv_time, item.getCreated_at())
                    .setText(R.id.money2, "￥"+item.getBefore_hotel_price());
            TextView tvMoney = (TextView)helper.getView(R.id.money1);
            if("0".equals(item.getStatus())){
                //优惠订单，点单
                tvMoney.setText("+"+item.getHotel_price());
                tvMoney.setTextColor(Color.BLACK);
            }else{
                //stand_red
                tvMoney.setText(item.getHotel_price());
                tvMoney.setTextColor(Color.parseColor("#C90000"));
            }
        }

    }
}
