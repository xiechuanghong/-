package com.hanyu.hysj.ui;

import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.util.AppUtils;
import com.hanyu.hysj.util.ImageLoader;
import com.hanyu.hysj.weight.NumberButton;

public class OrderInfoAdapter extends BaseQuickAdapter<GoodsGoodsBean.DataEntity, BaseViewHolder> {
    public OrderInfoAdapter() {
        super(R.layout.order_info_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, GoodsGoodsBean.DataEntity dataBean) {
        baseViewHolder.setIsRecyclable(false);

        //baseViewHolder.addOnClickListener(R.id.btn_num);

        ImageView imageView = baseViewHolder.getView(R.id.iv_icon);
        ImageLoader.loadToUrl(mContext, imageView, dataBean.getGoods_img());

        baseViewHolder.setText(R.id.tv_title, dataBean.getGoods_name());
        baseViewHolder.setText(R.id.tv_sold, "已售"+dataBean.getSales()+"份");
        baseViewHolder.setText(R.id.tv_per, "￥" + dataBean.getGoods_price() + "/份");

        NumberButton numberButton = baseViewHolder.getView(R.id.btn_num);
        numberButton.setNumber(dataBean.getCount());
        numberButton.setBuyMax(Integer.parseInt(dataBean.getGoods_number()));

        String goods_desc = dataBean.getGoods_desc();
        if (!TextUtils.isEmpty(goods_desc)) {
            baseViewHolder.getView(R.id.tv_des).setVisibility(View.VISIBLE);
            baseViewHolder.setText(R.id.tv_des, goods_desc);
        }else {
            baseViewHolder.getView(R.id.tv_des).setVisibility(View.GONE);
        }
        
        //
        OrderInfoActivity activity = (OrderInfoActivity) mContext;
        NumberButton btnNum = baseViewHolder.getView(R.id.btn_num);
        btnNum.setOnClickWhichListener(new NumberButton.OnClickWhich() {
            @Override
            public void addBtn() {
                if (AppUtils.isDoubleClick()) {
                    int number = dataBean.getCount();
                    int buyMax = Integer.parseInt(dataBean.getGoods_number());
                    if (number == buyMax) {
                        AppUtils.showToast(mContext, "库存不足！");
                        return;
                    }
                    number++;
                    dataBean.setCount(number);
                    notifyDataSetChanged();
                    calc(dataBean);
                    activity.addCart(imageView);
                }
            }

            @Override
            public void subBtn() {
                if (AppUtils.isDoubleClick()) {
                    int number = dataBean.getCount();
                    if (number == 0) {
                        return;
                    }
                    number--;
                    dataBean.setCount(number);
                    notifyDataSetChanged();
                    calc(dataBean);
                }
            }
        });
    }

    private void calc(GoodsGoodsBean.DataEntity item) {     //只是把加减后的信息同步到购物车
        if (mContext instanceof OrderInfoActivity) {
            ((OrderInfoActivity) mContext).calc(item);
            ((OrderInfoActivity) mContext).refreshCart();
            ((OrderInfoActivity) mContext).updateCart();
        }
    }
}
