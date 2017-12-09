package com.hanyu.hysj.ui;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseFragment;
import com.hanyu.hysj.bean.OrderConfirmBean;
import com.hanyu.hysj.bean.OrderQtCodeBean;
import com.hanyu.hysj.bean.SeatGetOpenSeatAll;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.DialogUtils;
import com.hanyu.hysj.util.ScanUtils;
import com.socks.library.KLog;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;


// 订单管理
public class OrderManageFragment extends BaseFragment {
    @BindView(R.id.iv_back)
    ImageView ivBack;
    @BindView(R.id.iv_rigth1)
    ImageView ivRigth1;
    @BindView(R.id.tv_use)
    TextView tvUse;
    @BindView(R.id.tv_use_no)
    TextView tvUseNo;

    private List<Fragment> fragments;
    private String user_id;

    @Override
    protected void handlerArguments(Bundle arguments) {
        super.handlerArguments(arguments);
        user_id = arguments.getString("user_id");
    }

    @Override
    protected void setUpView() {
        setTitleBarTitle("订单管理");
        ivBack.setVisibility(View.GONE);
        ivRigth1.setVisibility(View.VISIBLE);
        ivRigth1.setImageResource(R.mipmap.order_icon_scan);
        initFragments();
    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.order_manage_fragment;
    }

    private void initFragments() {
        fragments = new ArrayList<>();
        OrderManageInfoFragment fragmentUsed = new OrderManageInfoFragment();
        Bundle bundleUsed = new Bundle();
        bundleUsed.putString("status", "2");
        bundleUsed.putString("user_id", user_id);
        fragmentUsed.setArguments(bundleUsed);

        OrderManageInfoFragment fragmentUsedNo = new OrderManageInfoFragment();
        Bundle bundleUsedNo = new Bundle();
        bundleUsedNo.putString("status", "1");
        bundleUsedNo.putString("user_id", user_id);
        fragmentUsedNo.setArguments(bundleUsedNo);

        fragments.add(fragmentUsed);
        fragments.add(fragmentUsedNo);

        getChildFragmentManager().beginTransaction()
                .add(R.id.fl_content, fragmentUsed)
                .add(R.id.fl_content, fragmentUsedNo)
                .commit();
        selectBtn(0);
    }

    /**
     * 控制显示Fragment
     */
    private void showFragment(int checkedId) {
        FragmentTransaction fragmentTransaction = getChildFragmentManager().beginTransaction();
        for (int i = 0; i < fragments.size(); i++) {
            if (checkedId == i) {
                fragmentTransaction.show(fragments.get(i));
            } else {
                fragmentTransaction.hide(fragments.get(i));
            }
        }
        fragmentTransaction.commit();
    }

    @OnClick({R.id.tv_use, R.id.tv_use_no, R.id.iv_rigth1})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.tv_use:
                selectBtn(0);
                break;
            case R.id.tv_use_no:
                selectBtn(1);
                break;
            case R.id.iv_rigth1:
                ScanUtils.scan(this);
                break;
        }
    }

    private void selectBtn(int index) {
        if (0 == index) {
            tvUse.setBackgroundResource(R.drawable.bg_tab_left_sel);
            tvUseNo.setBackgroundResource(R.drawable.bg_tab_right);
            tvUse.setTextColor(getResources().getColor(R.color.colorBlack));
            tvUseNo.setTextColor(getResources().getColor(R.color.colorWhite));
        } else {
            tvUse.setBackgroundResource(R.drawable.bg_tab_left);
            tvUseNo.setBackgroundResource(R.drawable.bg_tab_right_sel);
            tvUse.setTextColor(getResources().getColor(R.color.colorWhite));
            tvUseNo.setTextColor(getResources().getColor(R.color.colorBlack));
        }
        showFragment(index);
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == ScanUtils.REQUEST_CODE_SCAN) {    //二维码扫描
                String result = data.getStringExtra("result");
                KLog.d("二维码 ：" + result);

                //订单确认
                OrderQtCodeBean orderQtCodeBean = ScanUtils.parseQrCode2(result);
                if (orderQtCodeBean != null) {
                    seatGetOpenSeatAll(orderQtCodeBean);
                    return;
                }
                showToast("抱歉，暂不支持");
            }
        }
    }

    private void seatGetOpenSeatAll(OrderQtCodeBean orderQtCodeBean) {
        showLoading();
        NetPresenter.seatGetOpenSeatAll(KeyUtil.getKey(), new ApiCallBack<List<SeatGetOpenSeatAll>>(getActivity()) {
            @Override
            protected void onSuccess(List<SeatGetOpenSeatAll> data, String msg) {
                disLoading();
                DialogUtils.showSeatsDialog(getActivity(), data, new DialogUtils.OnEditDialogListener() {
                    @Override
                    public void onClickOk(String txt) {
                        orderConfirm(orderQtCodeBean, txt);
                    }

                    @Override
                    public void onClickCancle() {
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

    private void orderConfirm(OrderQtCodeBean orderQtCodeBean, String table_id) {
        showLoading();
        NetPresenter.orderConfirm(KeyUtil.getKey(), orderQtCodeBean.getO(), orderQtCodeBean.getT(), orderQtCodeBean.getU(), table_id, new ApiCallBack<OrderConfirmBean>(getActivity()) {
            @Override
            protected void onSuccess(OrderConfirmBean data, String msg) {
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
