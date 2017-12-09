package com.hanyu.hysj.ui;

import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.google.android.flexbox.FlexboxLayout;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.CommentIndexBean;
import com.hanyu.hysj.util.DensityUtils;
import com.hanyu.hysj.util.ImageLoader;
import com.hanyu.hysj.weight.SimpleRatingBar;

import java.util.List;

public class CommentManagerAdapter extends BaseQuickAdapter<CommentIndexBean, BaseViewHolder> {
    public CommentManagerAdapter() {
        super(R.layout.comment_manager_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, CommentIndexBean dataBean) {
        baseViewHolder.addOnClickListener(R.id.tv_check);
        baseViewHolder.addOnClickListener(R.id.tv_no);
        baseViewHolder.addOnClickListener(R.id.tv_yes);

        baseViewHolder.setText(R.id.tv_time, dataBean.getAdd_time());
        TextView tv_status = baseViewHolder.getView(R.id.tv_status);
        if ("1".equals(dataBean.getIs_check())) {
            tv_status.setText("审核已通过");
            tv_status.setTextColor(mContext.getResources().getColor(R.color.seat_yellow));
        } else {
            tv_status.setText("审核不通过");
            tv_status.setTextColor(mContext.getResources().getColor(R.color.stand_red));
        }

        ImageView imageView = baseViewHolder.getView(R.id.iv_icon);
        ImageLoader.loadToUrl(mContext, imageView, dataBean.getUser().getHead_image());
        baseViewHolder.setText(R.id.tv_title, dataBean.getUser().getNickname());
        baseViewHolder.setText(R.id.tv_des, dataBean.getContent());

        SimpleRatingBar ratingBar = baseViewHolder.getView(R.id.commitStars);
        ratingBar.setRating(Float.valueOf(dataBean.getStars()));

        RecyclerView rv_imgs = baseViewHolder.getView(R.id.rv_imgs);
        rv_imgs.setHasFixedSize(true);
        rv_imgs.setLayoutManager(new GridLayoutManager(mContext, 3));
        CommentManagerImagesAdapter itemAdapter = new CommentManagerImagesAdapter();
        itemAdapter.setNewData(dataBean.getComment_img());
        rv_imgs.setAdapter(itemAdapter);

        List<CommentIndexBean.TypeEntity> types = dataBean.getType();
        if (types != null && types.size() > 0) {
            baseViewHolder.getView(R.id.ll_comment).setVisibility(View.VISIBLE);
            FlexboxLayout fl_comment = baseViewHolder.getView(R.id.fl_comment);
            fl_comment.removeAllViews();
            for (int i = 0; i < types.size(); i++) {
                FlexboxLayout.LayoutParams lp = new FlexboxLayout.LayoutParams(
                        FlexboxLayout.LayoutParams.WRAP_CONTENT, FlexboxLayout.LayoutParams.WRAP_CONTENT);
                int left = (int) DensityUtils.dipToPx(mContext, 3);
                int top = (int) DensityUtils.dipToPx(mContext, 5);
                lp.setMargins(left, top, left, top);
                LayoutInflater inflater = LayoutInflater.from(mContext);
                TextView textView = (TextView) inflater.inflate(R.layout.comment_manager_type, null);
                textView.setText(types.get(i).getName());
                textView.setLayoutParams(lp);
                fl_comment.addView(textView, lp);
            }
        } else {
            baseViewHolder.getView(R.id.ll_comment).setVisibility(View.GONE);
        }
    }
}
