package com.hanyu.hysj.ui;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.CommentIndexBean;

public class CommentManagerTypesAdapter extends BaseQuickAdapter<CommentIndexBean.TypeEntity, BaseViewHolder> {
    public CommentManagerTypesAdapter() {
        super(R.layout.comment_manager_type);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, CommentIndexBean.TypeEntity dataBean) {
        baseViewHolder.setText(R.id.tv_title, dataBean.getName());
    }
}
