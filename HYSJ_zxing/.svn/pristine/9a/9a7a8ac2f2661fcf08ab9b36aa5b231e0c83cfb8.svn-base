package com.hanyu.hysj.ui;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemClickListener;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.bean.OrderConfirmBean;
import com.hanyu.hysj.bean.OrderQtCodeBean;
import com.hanyu.hysj.bean.SeatBookingBean;
import com.hanyu.hysj.bean.SeatClearBean;
import com.hanyu.hysj.bean.SeatIndexBean;
import com.hanyu.hysj.bean.SeatOpenBean;
import com.hanyu.hysj.hx.EventEntity;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.menu.FloorAdapter;
import com.hanyu.hysj.ui.menu.UIUtils;
import com.hanyu.hysj.util.DialogUtils;
import com.hanyu.hysj.util.ScanUtils;
import com.hanyu.hysj.weight.ActionSheetDialog;
import com.hanyu.hysj.weight.ClearEditText;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

// 台桌管理
public class SeatManageActivity extends BaseListActivity {
    @BindView(R.id.tv_right)
    TextView tvRight;
    @BindView(R.id.searchView)
    ClearEditText searchView;
    @BindView(R.id.searchButton)
    TextView searchButton;

    private PopupWindow popupWindow;
    private String floor_id = "0";
    private List<SeatIndexBean.FloorIdEntity> floorList;

    private String table_name = "";
    private String table_id = "";
    private boolean table_id_need = false;

    @Override
    protected void setUpView() {
        EventBus.getDefault().register(this);
        table_id_need = getIntent().getBooleanExtra("table_id_need", false);

        super.setUpView();
        setTitleBarTitle("台桌管理");
        tvRight.setText("楼层");
        initEditText();
        load();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }

    @Override
    protected int getLayoutId() {
        return R.layout.seat_manage_activity;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new SeatManageAdapter();
        adapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                SeatIndexBean.DataEntity item = (SeatIndexBean.DataEntity) adapter.getItem(position);
                table_id = item.getId();
                if (table_id_need) {        //status : 0：空闲，1：预订，2：开台
                    if ("2".equals(item.getStatus())) {
                        Intent intent = getIntent();
                        intent.putExtra("table_id", item.getId());
                        setResult(Activity.RESULT_OK, intent);
                        finish();
                    }
                } else {
                    if ("2".equals(item.getStatus())) {
                        new ActionSheetDialog(SeatManageActivity.this)
                                .builder()
                                .setCancelable(true)
                                .setCanceledOnTouchOutside(true)
                                .addSheetItem("点单/加单", ActionSheetDialog.SheetItemColor.Black,
                                        new ActionSheetDialog.OnSheetItemClickListener() {
                                            @Override
                                            public void onClick(int which) {
                                                Intent intent = new Intent(SeatManageActivity.this, OrderInfoActivity.class);
                                                intent.putExtra("table_id", item.getId());
                                                startActivity(intent);
                                            }
                                        })
                                .addSheetItem("切换状态", ActionSheetDialog.SheetItemColor.Black,
                                        new ActionSheetDialog.OnSheetItemClickListener() {
                                            @Override
                                            public void onClick(int which) {
                                                DialogUtils.showStatusDialog(context, item.getTable_number(), new DialogUtils.OnDialogSatausListener() {
                                                    @Override
                                                    public void onClick(int status) {
                                                        if (status == 1) {     //0,left;1,middle,2,right
                                                            showLoading();
                                                            NetPresenter.seatClear(KeyUtil.getKey(), item.getId(), item.getBook_id(), new ApiCallBack<SeatClearBean>(context) {
                                                                @Override
                                                                protected void onSuccess(SeatClearBean data, String msg) {
                                                                    disLoading();
                                                                    showToast(msg);
                                                                    load();
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
                                            }
                                        })
                                .addSheetItem("管理台", ActionSheetDialog.SheetItemColor.Black,
                                        new ActionSheetDialog.OnSheetItemClickListener() {
                                            @Override
                                            public void onClick(int which) {
                                                Intent intent = new Intent(context, SeatDetailActivity.class);
                                                intent.putExtra("table_id", item.getId());
                                                startActivity(intent);
                                            }
                                        })
                                .addSheetItem("扫描用户订单确认", ActionSheetDialog.SheetItemColor.Black,
                                        new ActionSheetDialog.OnSheetItemClickListener() {
                                            @Override
                                            public void onClick(int which) {
                                                ScanUtils.scan(SeatManageActivity.this);
                                            }
                                        })
                                .show();
                    }
                }
            }
        });
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                SeatIndexBean.DataEntity item = (SeatIndexBean.DataEntity) adapter.getItem(position);
                if (view.getId() == R.id.tv_reserve) {
                    seatBookingDlg(item);
                } else if (view.getId() == R.id.tv_action) {
                    //status : 0：空闲，1：预订，2：开台
                    if ("0".equals(item.getStatus())) {
                        DialogUtils.showReserveDialog(context, item.getTable_number(), new DialogUtils.OnReserveDialogListener() {
                            @Override
                            public void onClickOk(String name, String phone, String time) {
                                seatOpen(item.getId(), "", name, phone, time);
                            }

                            @Override
                            public void onClickCancle() {
                            }
                        });
                    }else if ("1".equals(item.getStatus())) {
                        new ActionSheetDialog(SeatManageActivity.this)
                                .builder()
                                .setCancelable(true)
                                .setCanceledOnTouchOutside(true)
                                .addSheetItem("开台", ActionSheetDialog.SheetItemColor.Red,
                                        new ActionSheetDialog.OnSheetItemClickListener() {
                                            @Override
                                            public void onClick(int which) {
                                                seatOpen(item.getId(), item.getBook_id(), "", "", "");
                                            }
                                        }).show();
                    } else if ("2".equals(item.getStatus())) {
                        DialogUtils.showClearDialog(context, "是否要清除该台位？", "取消", "清台", new DialogUtils.OnDialogSelectListener() {
                            @Override
                            public void onClickOk() {
                                showLoading();
                                NetPresenter.seatClear(KeyUtil.getKey(), item.getId(), item.getBook_id(), new ApiCallBack<SeatClearBean>(context) {
                                    @Override
                                    protected void onSuccess(SeatClearBean data, String msg) {
                                        disLoading();
                                        showToast(msg);
                                        load();
                                    }

                                    @Override
                                    protected void onFailure(String error) {
                                        disLoading();
                                        showToast(error);
                                    }
                                });
                            }

                            @Override
                            public void onClickCancle() {
                            }
                        });
                    }
                }
            }
        });
        return adapter;
    }

    private void seatOpen(String id, String book_id, String username, String phone, String time) {
        showLoading();
        NetPresenter.seatOpen(KeyUtil.getKey(), id, book_id, username, phone, time, new ApiCallBack<SeatOpenBean>(context) {
            @Override
            protected void onSuccess(SeatOpenBean data, String msg) {
                disLoading();
                showToast(msg);
                load();
            }

            @Override
            protected void onFailure(String error) {
                disLoading();
                showToast(error);
            }
        });
    }

    private void seatBookingDlg(final SeatIndexBean.DataEntity item) {
        DialogUtils.showReserveDialog(context, item.getTable_number(), new DialogUtils.OnReserveDialogListener() {
            @Override
            public void onClickOk(String name, String phone, String time) {
                showLoading();
                NetPresenter.seatBooking(KeyUtil.getKey(), item.getId(), name, phone, time, new ApiCallBack<SeatBookingBean>(context) {
                    @Override
                    protected void onSuccess(SeatBookingBean data, String msg) {
                        disLoading();
                        showToast(msg);
                        load();
                    }

                    @Override
                    protected void onFailure(String error) {
                        disLoading();
                        showToast(error);
                    }
                });
            }

            @Override
            public void onClickCancle() {
            }
        });
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new GridLayoutManager(context, 2);
    }

    @Override
    protected void request() {
        NetPresenter.seatIndex(KeyUtil.getKey(), floor_id, "" + getCurrentPage(), "" + getCountInPage(), table_name, new ApiCallBack<SeatIndexBean>(this) {
            @Override
            protected void onSuccess(SeatIndexBean data, String msg) {
                SeatManageActivity.this.onSucceed(data);
            }

            @Override
            protected void onFailure(String error) {
                SeatManageActivity.this.onFailure(error);
            }
        });
    }

    private void onSucceed(SeatIndexBean data) {
        super.onSucceed();
        SeatManageActivity.this.onSucceed(data.getData());

        floorList = data.getFloor_id();
        if (floorList != null && floorList.size() > 0) {
            tvRight.setVisibility(View.VISIBLE);
        }
    }

    private void initEditText() {
        searchView.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                String text = s.toString().trim();
                if (!text.isEmpty()) {
                    searchButton.setVisibility(View.VISIBLE);//内容不为空时显示搜索按键
                } else {
                    searchButton.setVisibility(View.GONE);//隐藏
                    search();
                }
            }
        });
    }

    @OnClick({R.id.searchButton, R.id.tv_right})
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.searchButton:
                search();
                break;
            case R.id.tv_right:
                showFloor();
                break;
        }
    }

    private void search() {
        table_name = searchView.getText().toString();
        load();
    }

    private void showFloor() {
        popupWindow = UIUtils.showMeun(context, new FloorAdapter(floorList), new OnItemClickListener() {
            @Override
            public void onSimpleItemClick(BaseQuickAdapter adapter, View view, int position) {
                popupWindow.dismiss();
                SeatIndexBean.FloorIdEntity item = (SeatIndexBean.FloorIdEntity) adapter.getItem(position);
                tvRight.setText(item.getTitle());
                floor_id = item.getTitle();
                load();
            }
        });
        popupWindow.showAsDropDown(tvRight);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == ScanUtils.REQUEST_CODE_SCAN) {    //二维码扫描
                String result = data.getStringExtra("result");

                //订单确认
                OrderQtCodeBean orderQtCodeBean = ScanUtils.parseQrCode2(result);
                if (orderQtCodeBean != null) {
                    orderConfirm(orderQtCodeBean, table_id);
                    return;
                }
                showToast("抱歉，暂不支持");
            }
        }
    }

    private void orderConfirm(OrderQtCodeBean orderQtCodeBean, String table_id) {
        showLoading();
        NetPresenter.orderConfirm(KeyUtil.getKey(), orderQtCodeBean.getO(), orderQtCodeBean.getT(), orderQtCodeBean.getU(), table_id, new ApiCallBack<OrderConfirmBean>(this) {
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

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void seatChanged(EventEntity.SeatEvent seatEvent) {
        if (seatEvent != null) {
            List<SeatIndexBean.DataEntity> list = adapter.getData();
            for (SeatIndexBean.DataEntity dataEntity : list) {
                if (seatEvent.getId().equals(dataEntity.getId())) {
                    String status = seatEvent.getStatus();
                    dataEntity.setStatus(status);
                    if ("0".equals(status)) {        //status : 0：空闲，1：预订，2：开台
                    } else if ("1".equals(status)) {
                        String daoda_time = seatEvent.getDaoda_time();
                        dataEntity.setDaoda_time(daoda_time);
                    } else if ("2".equals(status)) {
                        String open_time = seatEvent.getOpen_time();
                        dataEntity.setOpen_time(open_time);
                    }
                    adapter.notifyDataSetChanged();
                    break;
                }
            }
        }
    }
}
