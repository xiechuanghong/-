package com.hanyu.hysj.ui.property.adapter;

import android.support.annotation.LayoutRes;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.UserPapersBean;

import java.util.List;

/**
 * Created by Administrator on 2017/9/10.
 */

public class SelectAccountAdapter extends BaseQuickAdapter<UserPapersBean.DataBean,BaseViewHolder> {
    private String id;

    public SelectAccountAdapter(@LayoutRes int layoutResId, @Nullable List<UserPapersBean.DataBean> data,String id) {
        super(layoutResId, data);
        this.id = id;
    }

    @Override
    protected void convert(BaseViewHolder helper, UserPapersBean.DataBean item) {
        helper.setText(R.id.tv_name, item.getName())
                .setText(R.id.tv_number, item.getAccount());
        if(!TextUtils.isEmpty(id)&&id.equals(item.getId())){
            item.setSelected(true);
        }
        if(item.isSelected()){
            helper.getView(R.id.iv_check).setVisibility(View.VISIBLE);
        }else{
            helper.getView(R.id.iv_check).setVisibility(View.GONE);
        }



    }
}
