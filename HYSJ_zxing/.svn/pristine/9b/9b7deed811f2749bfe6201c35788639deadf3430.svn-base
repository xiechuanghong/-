package com.hanyu.hysj.ui;

import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.UserMoneyLog;

public class AccountInfoAdapter extends BaseQuickAdapter<UserMoneyLog.DataEntity, BaseViewHolder> {
    public AccountInfoAdapter() {
        super(R.layout.account_info_adapter);
    }

    @Override
    protected void convert(BaseViewHolder baseViewHolder, UserMoneyLog.DataEntity dataBean) {
        baseViewHolder.setText(R.id.tv_title, dataBean.getTitle());
        baseViewHolder.setText(R.id.tv_des, dataBean.getAdd_time());

        TextView tv_money = baseViewHolder.getView(R.id.tv_money);
        double pay_amount = dataBean.getPay_amount();
        if (pay_amount < 0) {
            tv_money.setText("" + pay_amount);
            tv_money.setTextColor(mContext.getResources().getColor(R.color.stand_red));
        } else {
            tv_money.setText("+" + pay_amount);
            tv_money.setTextColor(mContext.getResources().getColor(R.color.stand_text_des2));
        }
    }
}
