package com.hanyu.hysj.ui;


import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.StyleRes;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.DisplayMetrics;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemChildClickListener;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.util.AppUtils;
import com.hanyu.hysj.weight.NumberButton;

import java.util.List;

public class OrderInfoCartDialog extends Dialog {
    private OrderInfoActivity parentActivity;
    private List<GoodsGoodsBean.DataEntity> cartBeanList;

    private TextView tvCartCount;
    private TextView tvTotal;
    private TextView tvOrder;
    private RecyclerView recyclerView;
    private BaseQuickAdapter adapter;
    private LinearLayout llClear;

    public OrderInfoCartDialog(@NonNull Context context) {
        super(context);
    }

    public OrderInfoCartDialog(@NonNull Context context, @StyleRes int themeResId) {
        super(context, themeResId);
    }

    protected OrderInfoCartDialog(@NonNull Context context, boolean cancelable, @Nullable OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initView();
        configDialog();
    }

    private void configDialog() {
        Window dialogWindow = getWindow();
        dialogWindow.setLayout(WindowManager.LayoutParams.MATCH_PARENT, WindowManager.LayoutParams.WRAP_CONTENT);
        WindowManager.LayoutParams lp = dialogWindow.getAttributes();
        dialogWindow.setGravity(Gravity.BOTTOM);
        DisplayMetrics d = getContext().getResources().getDisplayMetrics();
        lp.width = (int) (d.widthPixels * 1.0);
        lp.height = (int) (d.heightPixels * 0.6);
        dialogWindow.setAttributes(lp);
    }

    private void initView() {
        View contentView = LayoutInflater.from(getContext()).inflate(R.layout.order_info_cart_dialog, null);
        setContentView(contentView);

        tvCartCount = (TextView) contentView.findViewById(R.id.tv_cart_count);
        tvTotal = (TextView) contentView.findViewById(R.id.tv_total);
        tvOrder = (TextView) contentView.findViewById(R.id.tv_order);
        tvOrder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                parentActivity.order();
            }
        });

        recyclerView = (RecyclerView) contentView.findViewById(R.id.recyclerView);
        LinearLayoutManager manager = new LinearLayoutManager(getContext(), LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(manager);
        adapter = new OrderInfoCartAdapter();
        adapter.setNewData(cartBeanList);
        recyclerView.setAdapter(adapter);
        recyclerView.addOnItemTouchListener(new OnItemChildClickListener() {
            @Override
            public void onSimpleItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                GoodsGoodsBean.DataEntity item = (GoodsGoodsBean.DataEntity) adapter.getItem(position);
                if (view.getId() == R.id.btn_num) {//购物车加减
                    NumberButton btnNum = (NumberButton) view;
                    btnNum.setOnClickWhichListener(new NumberButton.OnClickWhich() {
                        @Override
                        public void addBtn() {
                            if (AppUtils.isDoubleClick()) {
                                int number = item.getCount();
                                int buyMax = Integer.parseInt(item.getGoods_number());
                                if (number == buyMax) {
                                    AppUtils.showToast(getContext(), "库存不足！");
                                    return;
                                }
                                number++;
                                item.setCount(number);
                                adapter.notifyDataSetChanged();
                                calc(item);
                            }
                        }

                        @Override
                        public void subBtn() {
                            if (AppUtils.isDoubleClick()) {
                                int number = item.getCount();
                                if (number == 0) {
                                    return;
                                }
                                number--;
                                item.setCount(number);
                                adapter.notifyDataSetChanged();
                                calc(item);
                            }
                        }
                    });
                }
            }
        });

        llClear = (LinearLayout) contentView.findViewById(R.id.ll_clear);
        llClear.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (cartBeanList.size() > 0) {
                    clearCart();
                }
            }
        });

        updateCart();
    }

    private void clearCart(){
        parentActivity.clearCart();
        parentActivity.notifyDataSetChanged();
        parentActivity.updateCart();
        adapter.notifyDataSetChanged();
        updateCart();
    }

    private void calc(GoodsGoodsBean.DataEntity item) {
        parentActivity.calc(item);
        parentActivity.updateCart();
        parentActivity.syncList();
        parentActivity.refreshCart();
        updateCart();
    }

    public void updateCart() {
        int cartCount = parentActivity.calcCartCount();
        if (cartCount == 0) {
            tvCartCount.setText("");
            tvCartCount.setVisibility(View.INVISIBLE);
        } else {
            tvCartCount.setText("" + cartCount);
            tvCartCount.setVisibility(View.VISIBLE);
        }

        String total = "" + parentActivity.calcTotal();
        tvTotal.setText("￥" + total);
    }

    public void setInfo(OrderInfoActivity parentActivity, List<GoodsGoodsBean.DataEntity> cartBeanList) {
        this.parentActivity = parentActivity;
        this.cartBeanList = cartBeanList;
    }
}
