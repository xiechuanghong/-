package com.hanyu.hysj.ui;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Point;
import android.os.Bundle;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.widget.ImageView;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.google.gson.Gson;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.bean.CartBean;
import com.hanyu.hysj.bean.GoodsCategoryBean;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.bean.OrderBuyBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.DensityUtils;
import com.hanyu.hysj.util.DialogUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

// 帮客户点单
public class OrderInfoActivity extends BaseListActivity {
    public static final int REQUEST_CODE_TABLE_ID = 100;

    @BindView(R.id.iv_cart)
    ImageView ivCart;
    @BindView(R.id.tv_cart_count)
    TextView tvCartCount;
    @BindView(R.id.tv_total)
    TextView tvTotal;

    private String table_id = "";
    private String is_on_sale = "1";
    private List<OrderInfoFragment> fragmentList = new ArrayList<>();

    private List<GoodsGoodsBean.DataEntity> cartBeanList = new LinkedList<>();

    @Override
    protected void setUpView() {
        table_id = getIntent().getStringExtra("table_id");

        super.setUpView();
        setTitleBarTitle("帮客户点单");
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.order_info_activity;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new OrderCategoryAdapter();
        adapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                showFragment(position);
                selectIndex(adapter.getData(), position);
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
        NetPresenter.goodsCategory(KeyUtil.getKey(), is_on_sale, new ApiCallBack<List<GoodsCategoryBean>>(context) {
            @Override
            protected void onSuccess(List<GoodsCategoryBean> data, String msg) {
                OrderInfoActivity.this.onSuccess(data);
            }

            @Override
            protected void onFailure(String error) {
                OrderInfoActivity.this.onFailure(error);
            }
        });
    }

    private void onSuccess(List<GoodsCategoryBean> goodsCategoryBeanList) {
        super.onSucceed(goodsCategoryBeanList);

        if (goodsCategoryBeanList != null && goodsCategoryBeanList.size() > 0) {
            FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
            for (int i = 0; i < goodsCategoryBeanList.size(); i++) {
                OrderInfoFragment orderInfoFragment = new OrderInfoFragment();
                Bundle bundle = new Bundle();
                bundle.putString("category_id", goodsCategoryBeanList.get(i).getId());
                orderInfoFragment.setArguments(bundle);
                fragmentList.add(orderInfoFragment);
                fragmentTransaction.add(R.id.fl_home, orderInfoFragment);
            }
            fragmentTransaction.commit();
            showFragment(0);
            selectIndex(goodsCategoryBeanList, 0);
        }
    }

    private void showFragment(int checkedId) {
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        for (int i = 0; i < fragmentList.size(); i++) {
            if (checkedId == i) {
                fragmentTransaction.show(fragmentList.get(i));
            } else {
                fragmentTransaction.hide(fragmentList.get(i));
            }
        }
        fragmentTransaction.commit();
    }

    private void selectIndex(List<GoodsCategoryBean> goodsCategoryBeanList, int index) {
        if (goodsCategoryBeanList != null && goodsCategoryBeanList.size() > 0) {
            int size = goodsCategoryBeanList.size();
            if (index >= 0 && index <= size - 1) {
                for (int i = 0; i < size; i++) {
                    if (i == index) {
                        goodsCategoryBeanList.get(i).setSelect(true);
                    } else {
                        goodsCategoryBeanList.get(i).setSelect(false);
                    }
                }
            }
        }
        adapter.notifyDataSetChanged();
    }

    @Override
    protected boolean enableMore() {
        return false;
    }

    @Override
    protected boolean enableSwipeRefreshLayout() {
        return false;
    }

    private GoodsGoodsBean.DataEntity inCart(GoodsGoodsBean.DataEntity item) {
        for (GoodsGoodsBean.DataEntity cartBean : cartBeanList) {
            if (item.getGoods_id().equals(cartBean.getGoods_id())) {
                return cartBean;
            }
        }
        return null;
    }

    public void refreshCart() {
        for (int i = cartBeanList.size() - 1; i >= 0; i--) {
            GoodsGoodsBean.DataEntity cartBean = cartBeanList.get(i);
            if (cartBean.getCount() == 0) {
                cartBeanList.remove(i);
            }
        }
    }

    private GoodsGoodsBean.DataEntity inList(GoodsGoodsBean.DataEntity bean) {
        for (OrderInfoFragment fragment : fragmentList) {
            List<GoodsGoodsBean.DataEntity> list = fragment.getList();
            for (GoodsGoodsBean.DataEntity dataEntity : list) {
                if (bean.getGoods_id().equals(dataEntity.getGoods_id())) {
                    return dataEntity;
                }
            }
        }
        return null;
    }

    public int calcCartCount() {
        int cartCount = 0;
        for (GoodsGoodsBean.DataEntity cartBean : cartBeanList) {
            cartCount = cartCount + cartBean.getCount();
        }
        return cartCount;
    }

    public double calcTotal() {
        BigDecimal total = new BigDecimal("0");
        for (GoodsGoodsBean.DataEntity item : cartBeanList) {
            total = total.add(new BigDecimal(item.getCount()).multiply(new BigDecimal(item.getGoods_price())));
        }
        return total.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
    }

    public void updateCart() {
        int cartCount = calcCartCount();
        if (cartCount == 0) {
            tvCartCount.setText("");
            tvCartCount.setVisibility(View.INVISIBLE);
        } else {
            tvCartCount.setText("" + cartCount);
            tvCartCount.setVisibility(View.VISIBLE);
        }

        String total = "" + calcTotal();
        tvTotal.setText("￥" + total);
    }

    public void notifyDataSetChanged() {
        for (OrderInfoFragment fragment : fragmentList) {
            fragment.notifyDataSetChanged();
        }
    }

    public void clearCart() {
        cartBeanList.clear();
        for (OrderInfoFragment fragment : fragmentList) {
            List<GoodsGoodsBean.DataEntity> list = fragment.getList();
            for (GoodsGoodsBean.DataEntity dataEntity : list) {
                dataEntity.setCount(0);
            }
        }
    }

    public void calc(GoodsGoodsBean.DataEntity item) {
        GoodsGoodsBean.DataEntity cartBean = inCart(item);
        if (cartBean == null) {
            if (item.getCount() > 0) {
                GoodsGoodsBean.DataEntity cartBeanNew = new GoodsGoodsBean.DataEntity();
                cartBeanNew.setGoods_id(item.getGoods_id());
                cartBeanNew.setGoods_name(item.getGoods_name());
                cartBeanNew.setCount(item.getCount());
                cartBeanNew.setGoods_price(item.getGoods_price());
                cartBeanNew.setGoods_number(item.getGoods_number());
                cartBeanList.add(cartBeanNew);
            }
        } else {
            cartBean.setCount(item.getCount());
        }
    }

    public void calcRefresh() {
        for (int i = cartBeanList.size() - 1; i >= 0; i--) {
            GoodsGoodsBean.DataEntity cartBean = cartBeanList.get(i);
            GoodsGoodsBean.DataEntity dataEntity = inList(cartBean);
            if (dataEntity == null) {   //删除购物车中多余的项    根据需求，现在下拉刷新购物车不修改
                //cartBeanList.remove(cartBean);
            } else {     //把购物车中的项同步到list
                dataEntity.setCount(cartBean.getCount());
            }
        }
    }

    public void syncList() {
        int size = cartBeanList.size();
        if (size > 0) {
            calcRefresh();
        } else {
            clearCart();
        }
        notifyDataSetChanged();
    }

    private String toJson() {
        List<CartBean> cartList = new LinkedList<>();
        for (GoodsGoodsBean.DataEntity entity : cartBeanList) {
            if (entity.getCount() > 0) {
                CartBean cartBean = new CartBean(entity.getGoods_id(), entity.getCount());
                cartList.add(cartBean);
            }
        }
        Gson gson = new Gson();
        return gson.toJson(cartList);
    }

    @OnClick({R.id.tv_order, R.id.iv_cart})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_cart:
                if (cartBeanList != null && cartBeanList.size() > 0) {
                    OrderInfoCartDialog dialog = new OrderInfoCartDialog(this, R.style.MyDialog);
                    dialog.setCanceledOnTouchOutside(true);
                    dialog.setInfo(this, cartBeanList);
                    dialog.show();
                } else {
                    showToast("购物车中暂无数据");
                }
                break;
            case R.id.tv_order:
                order();
                break;
        }
    }

    public void order() {
        if (cartBeanList != null && cartBeanList.size() > 0) {
            if (TextUtils.isEmpty(table_id)) {
                Intent intent = new Intent(this, SeatManageActivity.class);
                intent.putExtra("table_id_need", true);
                startActivityForResult(intent, REQUEST_CODE_TABLE_ID);
            } else {
                OrderInfoTypeDialog dialog = new OrderInfoTypeDialog(this, R.style.MyDialog);
                dialog.setCanceledOnTouchOutside(true);
                dialog.setListener(new DialogUtils.OnDialogSatausListener() {
                    @Override
                    public void onClick(int status) {   //0：线下支付；1：余额；2：支付宝；3：微信
                        orderRequest("" + status);
                    }
                });
                dialog.show();
            }
        } else {
            showToast("购物车中暂无数据");
        }
    }

    public void orderRequest(String pay_type) {
        showLoading();
        NetPresenter.orderBuy(KeyUtil.getKey(), table_id, toJson(), pay_type, new ApiCallBack<OrderBuyBean>(this) {
            @Override
            protected void onSuccess(OrderBuyBean data, String msg) {
                disLoading();
                showToast(msg);
                String type = "";
                if ("0".equals(pay_type)) {
                    type = "线下支付";
                }else if ("1".equals(pay_type)) {
                    type = "余额";
                }else if ("2".equals(pay_type)) {
                    type = "支付宝";
                }else if ("3".equals(pay_type)) {
                    type = "微信";
                }
                DialogUtils.showQrCodeDialog(OrderInfoActivity.this, type, data.getImg(), new DialogUtils.OnDialogSatausListener() {
                    @Override
                    public void onClick(int status) {
                        if(status == 0){
                            finish();
                        }
                    }
                });
            }

            @Override
            protected void onFailure(String error) {
                disLoading();
                showToast(error);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_TABLE_ID && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                table_id = data.getStringExtra("table_id");
            }
        }
    }

    public void addCart(ImageView imageView){
        final ImageView goods = new ImageView(this);
        goods.setImageDrawable(imageView.getDrawable());
        ViewGroup rootView = (ViewGroup) this.getWindow().getDecorView();
        rootView.addView(goods, new ViewGroup.LayoutParams((int)(DensityUtils.dipToPx(this, 40)), (int)(DensityUtils.dipToPx(this, 40))));

        int position[] = new int[2];
        imageView.getLocationInWindow(position);
        Point startPosition = new Point(position[0], position[1]);

        int position2[] = new int[2];
        ivCart.getLocationInWindow(position2);
        Point endPosition = new Point(position2[0], position2[1]);

        int pointX = (startPosition.x + endPosition.x) / 2;
        int pointY = (int) (startPosition.y - DensityUtils.dipToPx(this, 100));
        Point controllPoint = new Point(pointX, pointY);

        BezierEvaluator bezierEvaluator = new BezierEvaluator(controllPoint);
        ValueAnimator anim = ValueAnimator.ofObject(bezierEvaluator, startPosition, endPosition);
        anim.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
            @Override
            public void onAnimationUpdate(ValueAnimator animation) {
                Point point = (Point) animation.getAnimatedValue();
                goods.setTranslationX(point.x);
                goods.setTranslationY(point.y);
            }
        });
        anim.setDuration(800);
        anim.addListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
                super.onAnimationEnd(animation);
                ViewGroup viewGroup = (ViewGroup) getWindow().getDecorView();
                viewGroup.removeView(goods);
            }
        });
        anim.setInterpolator(new AccelerateDecelerateInterpolator());
        anim.start();
    }
}
