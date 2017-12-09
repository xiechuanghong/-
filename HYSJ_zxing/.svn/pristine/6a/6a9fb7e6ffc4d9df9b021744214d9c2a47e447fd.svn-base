package com.hanyu.hysj.ui;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseNetActivity;
import com.hanyu.hysj.bean.OrderDetailsBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;

import java.util.List;

import butterknife.BindView;

// 订单详情
public class OrderDetailActivity extends BaseNetActivity {
    @BindView(R.id.tv_name)
    TextView tvName;
    @BindView(R.id.tv_nickname)
    TextView tvNickname;
    @BindView(R.id.tv_phone)
    TextView tvPhone;
    @BindView(R.id.tv_member)
    TextView tvMember;
    @BindView(R.id.tv_goods_count)
    TextView tvGoodsCount;
    @BindView(R.id.recyclerView)
    RecyclerView recyclerView;
    @BindView(R.id.tv_order_no)
    TextView tvOrderNo;
    @BindView(R.id.tv_type)
    TextView tvType;
    @BindView(R.id.tv_money)
    TextView tvMoney;
    @BindView(R.id.tv_favourable_quan)
    TextView tvFavourableQuan;
    @BindView(R.id.tv_favourable_user)
    TextView tvFavourableUser;
    @BindView(R.id.tv_order_pay)
    TextView tvOrderPay;

    private String order_id;

    @Override
    protected void setUpView() {
        order_id = getIntent().getStringExtra("order_id");

        super.setUpView();
        setTitleBarTitle("订单详情");
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.order_detail_activity;
    }

    @Override
    protected void request() {
        NetPresenter.orderDetails(KeyUtil.getKey(), order_id, new ApiCallBack<OrderDetailsBean>(this) {
            @Override
            protected void onSuccess(OrderDetailsBean data, String msg) {
                OrderDetailActivity.this.onSuccess(data);
            }

            @Override
            protected void onFailure(String error) {
                OrderDetailActivity.this.onFailure(R.layout.temp_loading_error_view, 0, error);
            }
        });
    }

    private void onSuccess(OrderDetailsBean data) {
        super.onSucceed();

        tvName.setText("姓名：" + data.getUser().getNickname());
        tvPhone.setText("手机号：" + data.getUser().getPhone_number());
        tvMember.setText("会员：" + data.getUser().getLevel());

        int goodsCount = 0;
        List<OrderDetailsBean.GoodsEntity> goods = data.getGoods();
        if (goods != null && goods.size() > 0) {
            goodsCount = goods.size();
            
            recyclerView.setHasFixedSize(true);
            recyclerView.setLayoutManager(new LinearLayoutManager(this));
            OrderDetailGoodsAdapter goodsAdapter = new OrderDetailGoodsAdapter();
            goodsAdapter.setNewData(data.getGoods());
            recyclerView.setAdapter(goodsAdapter);
        }
        tvGoodsCount.setText("共" + goodsCount + "个商品");

        tvOrderNo.setText(data.getOrder_sn());
        tvMoney.setText("￥"+data.getOrder_amount());
        tvFavourableQuan.setText("￥"+data.getDiscounts());
        tvFavourableUser.setText("￥"+data.getUser_discounts());
        tvOrderPay.setText("￥"+data.getReality_amount());
    }

    @Override
    protected boolean enableSwipeRefreshLayout() {
        return false;
    }
}
