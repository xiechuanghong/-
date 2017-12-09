package com.hanyu.hysj.ui.property;

import android.graphics.Color;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.AssetLogBean;

import butterknife.BindView;


/**
 * 交易详情
 * Created by Administrator on 2017/9/13.
 */

public class AccountDetailedActivity extends BaseActivity {
    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.tv_type)
    TextView mTvType;
    @BindView(R.id.tv_money_change)
    TextView mTvMoneyChange;
    @BindView(R.id.tv_money_change_after)
    TextView mTvMoneyChangeAfter;
    @BindView(R.id.tv_time_change)
    TextView mTvTimeChange;
    @BindView(R.id.tv_remark)
    TextView mTvRemark;
    private AssetLogBean.DataBean mItem;

    @Override
    protected int getLayoutId() {
        return R.layout.account_detailed_activity;
    }

    @Override
    protected void setUpView() {
        Log.d("lbx", "11111111");
        mItem = (AssetLogBean.DataBean) getIntent().getSerializableExtra("item");
        initView();

    }

    private void initView() {
        mTvTitle.setText("交易详情");
        if(mItem!=null){
            mTvType.setText(mItem.getTitle());
            mTvMoneyChangeAfter.setText("￥" + (Double.valueOf(mItem.getBefore_hotel_price())
                    + Double.valueOf(mItem.getHotel_price())));
            mTvTimeChange.setText(mItem.getCreated_at());
            mTvRemark.setText(mItem.getContent());
            if("0".equals(mItem.getStatus())){
                mTvMoneyChange.setText("+"+mItem.getHotel_price());
                mTvMoneyChange.setTextColor(Color.parseColor("#000000"));
            }else{
                mTvMoneyChange.setText(mItem.getHotel_price());
                mTvMoneyChange.setTextColor(Color.parseColor("#C90000"));
            }
        }
    }
}
