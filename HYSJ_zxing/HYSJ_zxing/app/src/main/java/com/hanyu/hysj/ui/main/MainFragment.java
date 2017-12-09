package com.hanyu.hysj.ui.main;

import android.app.Activity;
import android.content.Intent;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseFragment;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.bean.OrderConfirmBean;
import com.hanyu.hysj.bean.OrderQtCodeBean;
import com.hanyu.hysj.bean.SeatGetOpenSeatAll;
import com.hanyu.hysj.hx.ChatActivity;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.CommentManagerActivity;
import com.hanyu.hysj.ui.GoodsManageActivity;
import com.hanyu.hysj.ui.OrderInfoActivity;
import com.hanyu.hysj.ui.SeatManageActivity;
import com.hanyu.hysj.ui.UserManageActivity;
import com.hanyu.hysj.ui.property.PropertyManagerActivity;
import com.hanyu.hysj.ui.setting.SettingActivity;
import com.hanyu.hysj.util.DialogUtils;
import com.hanyu.hysj.util.SPUtils;
import com.hanyu.hysj.util.ScanUtils;
import com.socks.library.KLog;

import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

import static com.hanyu.hysj.R.id.tv_pay_orders;

public class MainFragment extends BaseFragment {
    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.tv_right)
    TextView mTvRight;
    @BindView(R.id.iv_rigth1)
    ImageView mIvRigth1;
    @BindView(R.id.iv_rigth2)
    ImageView mIvRigth2;
    @BindView(R.id.view_titlebar)
    LinearLayout mViewTitlebar;
    @BindView(R.id.tv_today_money)
    TextView mTvTodayMoney;
    @BindView(tv_pay_orders)
    TextView mTvPayOrders;
    @BindView(R.id.tv_looked)
    TextView mTvLooked;
    @BindView(R.id.textView2)
    TextView mTextView2;
    @BindView(R.id.ll_shangping)
    LinearLayout mLlShangping;
    @BindView(R.id.textView3)
    TextView mTextView3;
    @BindView(R.id.ll_zichan)
    LinearLayout mLlZichan;
    @BindView(R.id.ll_shezhi)
    LinearLayout mLlShezhi;
    @BindView(R.id.ll_huiyuan)
    LinearLayout mLlHuiyuan;
    @BindView(R.id.ll_zhuotai)
    LinearLayout mLlZhuotai;
    @BindView(R.id.ll_diandan)
    LinearLayout mLlDiandan;
    @BindView(R.id.ll_pinglun)
    LinearLayout mLlPinglun;
    @BindView(R.id.ll_saoma)
    LinearLayout mLlSaoma;
    @BindView(R.id.ll_baping)
    LinearLayout mLlBaping;
    @BindView(R.id.ll)
    LinearLayout mLl;

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.main_fragment;
    }

    @Override
    protected void setUpView() {
        initView();
    }

    private void initView() {
        LoginLoginBean loginBean = SPUtils.getInstance(getContext()).getLoginBean();
        if (loginBean != null) {
            mTvTitle.setText(loginBean.getHotel_name());
            mTvTitle.setTextColor(getResources().getColor(R.color.colorWhite));
        }
        mViewTitlebar.setBackgroundColor(getResources().getColor(R.color.stand_title_bg));
        mLl.setVisibility(View.GONE);
        mIvBack.setVisibility(View.GONE);
    }

    private void initIndex() {
//        NetPresenter.indexIndex(new ApiCallBack<IndexIndexBean>(getActivity()) {
//            @Override
//            protected void onSuccess(IndexIndexBean data, String msg) {
//                if (data != null) {
//                    if (!TextUtils.isEmpty(data.getSum())) {
//                        mTvTodayMoney.setText(data.getSum());
//                    }
//                    if (!TextUtils.isEmpty(data.getCount())) {
//                        mTvPayOrders.setText(data.getCount());
//                    }
//                    mTvLooked.setText(data.getVisit() + "");
//                }
//            }
//
//            @Override
//            protected void onFailure(String error) {
//
//            }
//        });
    }

    @Override
    public void onResume() {
        super.onResume();
        initIndex();
    }

    @Override
    public void onHiddenChanged(boolean hidden) {
        super.onHiddenChanged(hidden);
        if (!hidden) {
            initIndex();
        }
    }

    @OnClick({R.id.iv_back, R.id.ll_shangping, R.id.ll_zichan, R.id.ll_shezhi, R.id.ll_huiyuan, R.id.ll_zhuotai, R.id.ll_diandan, R.id.ll_pinglun, R.id.ll_saoma, R.id.ll_baping})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                break;
            case R.id.ll_shangping:
                startActivity(new Intent(getActivity(), GoodsManageActivity.class));
                break;
            case R.id.ll_zichan:
                //资产
                startActivity(new Intent(getActivity(), PropertyManagerActivity.class));
                break;
            case R.id.ll_shezhi:
                //设置
                startActivity(new Intent(getActivity(), SettingActivity.class));
                break;
            case R.id.ll_huiyuan:
                startActivity(new Intent(getActivity(), UserManageActivity.class));
                break;
            case R.id.ll_zhuotai:
                startActivity(new Intent(getActivity(), SeatManageActivity.class));
                break;
            case R.id.ll_diandan:
                startActivity(new Intent(getActivity(), OrderInfoActivity.class));
                break;
            case R.id.ll_pinglun:
                startActivity(new Intent(getActivity(), CommentManagerActivity.class));
                break;
            case R.id.ll_saoma:
                ScanUtils.scan(this);
                break;
            case R.id.ll_baping:
                //霸屏
                startActivity(new Intent(getContext(), ChatActivity.class));
                break;
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == ScanUtils.REQUEST_CODE_SCAN) {    //二维码扫描
            if (resultCode == Activity.RESULT_OK) {
                String result = data.getStringExtra("result");
                KLog.d("二维码 ：" + result);
                showToast("二维码 ：" + result);

//                //订单确认
//                OrderQtCodeBean orderQtCodeBean = ScanUtils.parseQrCode2(result);
//                if (orderQtCodeBean != null) {
//                    seatGetOpenSeatAll(orderQtCodeBean);
//                    return;
//                }
//                showToast("抱歉，暂不支持");
            } else {
                showToast("解析失败");
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
