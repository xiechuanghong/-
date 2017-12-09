package com.hanyu.hysj.ui;

import android.widget.ImageView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.UserIndexBean;
import com.hanyu.hysj.util.ImageLoader;

public class UserManageAdapter extends BaseQuickAdapter<UserIndexBean.DataEntity, BaseViewHolder> {
    public UserManageAdapter() {
        super(R.layout.user_manage_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, UserIndexBean.DataEntity dataBean) {
        baseViewHolder.addOnClickListener(R.id.iv_menu);

        ImageView imageView = baseViewHolder.getView(R.id.iv_icon);
        ImageLoader.loadToUrl(mContext, imageView, dataBean.getHead_image());

        baseViewHolder.setText(R.id.tv_title, dataBean.getNickname());
        baseViewHolder.setText(R.id.tv_grade, "等级：" + dataBean.getLever());
        baseViewHolder.setText(R.id.tv_integral, "等级：" + dataBean.getIntegral());
        baseViewHolder.setText(R.id.tv_integral, "积分：" + dataBean.getIntegral());
    }
}
