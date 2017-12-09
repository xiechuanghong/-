package com.hanyu.hysj.ui;

import android.widget.ImageView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.util.ImageLoader;

public class GoodsListAdapter extends BaseQuickAdapter<GoodsGoodsBean.DataEntity, BaseViewHolder> {
    public GoodsListAdapter() {
        super(R.layout.goods_list_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, GoodsGoodsBean.DataEntity dataBean) {
        baseViewHolder.addOnClickListener(R.id.tv_delete);
        baseViewHolder.addOnClickListener(R.id.tv_clear);
        baseViewHolder.addOnClickListener(R.id.tv_up);

        ImageView imageView = baseViewHolder.getView(R.id.iv_icon);
        ImageLoader.loadToUrl(mContext, imageView, dataBean.getGoods_img());

        baseViewHolder.setText(R.id.tv_title, dataBean.getGoods_name());
        baseViewHolder.setText(R.id.tv_money, "￥" + dataBean.getGoods_price());
        baseViewHolder.setText(R.id.tv_repertory, "库存：" + dataBean.getGoods_number());
        baseViewHolder.setText(R.id.tv_sales_count, "销量：" + dataBean.getSales());
        if ("1".equals(dataBean.getIs_on_sale())) {
            baseViewHolder.setText(R.id.tv_up, "下架");
        } else {
            baseViewHolder.setText(R.id.tv_up, "上架");
        }
    }
}
