package com.hanyu.hysj.ui;

import android.widget.ImageView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.util.ImageLoader;

public class CommentManagerImagesAdapter extends BaseQuickAdapter<String, BaseViewHolder> {
    public CommentManagerImagesAdapter() {
        super(R.layout.comment_manager_images_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, String dataBean) {
        ImageView imageView = baseViewHolder.getView(R.id.iv_icon);
        ImageLoader.loadToUrl(mContext, imageView, dataBean);
    }
}
