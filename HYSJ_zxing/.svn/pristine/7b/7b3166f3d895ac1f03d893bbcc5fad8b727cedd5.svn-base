package com.hanyu.hysj.ui;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.bean.OrderPrintOrderBean;
import com.hanyu.hysj.bean.SeatDetailsBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;

import butterknife.BindView;
import butterknife.OnClick;

// 餐桌管理台
public class SeatDetailActivity extends BaseListActivity {
    @BindView(R.id.tv_no)
    TextView tvNo;
    @BindView(R.id.tv_popple_count)
    TextView tvPoppleCount;
    @BindView(R.id.tv_time)
    TextView tvTime;
    @BindView(R.id.tv_money)
    TextView tvMoney;
    @BindView(R.id.tv_name)
    TextView tvName;
    @BindView(R.id.tv_phone)
    TextView tvPhone;
    @BindView(R.id.tv_user)
    TextView tvUser;
    @BindView(R.id.ll_seat_info)
    LinearLayout llSeatInfo;
    @BindView(R.id.ll_user_info)
    LinearLayout llUserInfo;
    private String table_id = "";

    @Override
    protected void setUpView() {
        table_id = getIntent().getStringExtra("table_id");
        super.setUpView();
        setTitleBarTitle("餐桌管理台");
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.seat_detail_activity;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new SeatDetailAdapter();
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                SeatDetailsBean.OrderEntity item = (SeatDetailsBean.OrderEntity) adapter.getItem(position);
                if (view.getId() == R.id.tv_print) {
                    showLoading();
                    NetPresenter.orderPrintOrder(KeyUtil.getKey(), item.getOrder_sn(), item.getOrder_id(), new ApiCallBack<OrderPrintOrderBean>(context) {
                        @Override
                        protected void onSuccess(OrderPrintOrderBean data, String msg) {
                            disLoading();
                            showToast(msg);
                        }

                        @Override
                        protected void onFailure(String error) {
                            disLoading();
                            showToast(error);
                        }
                    });
                }
            }
        });
        return adapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
    }

    @Override
    protected void request() {
        NetPresenter.seatDetails(KeyUtil.getKey(), table_id, new ApiCallBack<SeatDetailsBean>(context) {
            @Override
            protected void onSuccess(SeatDetailsBean data, String msg) {
                SeatDetailActivity.this.onSucceed(data);
            }

            @Override
            protected void onFailure(String error) {
                SeatDetailActivity.this.onFailure(error);
            }
        });
    }

    private void onSucceed(SeatDetailsBean data) {
        super.onSucceed();
        SeatDetailsBean.SeatEntity seat = data.getSeat();
        SeatDetailsBean.UserEntity user = data.getUser();

        if (seat != null) {
            tvNo.setText(seat.getTable_number());
            tvPoppleCount.setText("人数：" + seat.getMin_person() + "人 - " + seat.getMax_person() + "人");
            tvTime.setText("就餐时间：" + seat.getOpen_time());
            tvMoney.setText("订单金额：￥" + seat.getSum());
        } else {
            llSeatInfo.setVisibility(View.GONE);
        }

        if (user != null) {
            if (!TextUtils.isEmpty(user.getNickname()))
                tvName.setText("姓名：" + user.getNickname());
            if (!TextUtils.isEmpty(user.getPhone_number()))
                tvPhone.setText("手机：" + user.getPhone_number());
            if (!TextUtils.isEmpty(user.getLevel()))
                tvUser.setText("会员：" + user.getLevel());
        } else {
            llUserInfo.setVisibility(View.GONE);
        }
        SeatDetailActivity.this.onSucceed(data.getOrder());
    }

    public void onEmptyView() {

    }

    @OnClick({R.id.tv_order_add, R.id.tv_print})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.tv_order_add:
                Intent intent = new Intent(this, OrderInfoActivity.class);
                intent.putExtra("table_id", table_id);
                startActivity(intent);
                break;
            case R.id.tv_print:
                break;
        }
    }

    @Override
    protected boolean enableSwipeRefreshLayout() {
        return false;
    }

    @Override
    protected boolean enableMore() {
        return false;
    }
}
