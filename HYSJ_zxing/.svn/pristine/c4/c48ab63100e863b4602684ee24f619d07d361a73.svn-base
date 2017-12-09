package com.hanyu.hysj.util;


import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.SeatGetOpenSeatAll;
import com.hanyu.hysj.ui.menu.SeatsAdapter;
import com.hanyu.hysj.weight.time.CustomDatePicker;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class DialogUtils {
    public interface OnDialogSelectListener {
        void onClickOk();

        void onClickCancle();
    }

    public interface OnEditDialogListener {
        void onClickOk(String txt);

        void onClickCancle();
    }

    public interface OnReserveDialogListener {
        void onClickOk(String name, String phone, String time);

        void onClickCancle();
    }

    public interface OnDialogSatausListener {
        void onClick(int status);   //0,left;1,middle,2,right
    }

    public static void showWarnDialog(Context context, String title, String content, String left, String right, OnDialogSelectListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_dialog_warn, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
                ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.setContentView(view, params);

        TextView tvTitle = (TextView) view.findViewById(R.id.tv_title);
        TextView tvContent = (TextView) view.findViewById(R.id.tv_content);
        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);
        tvTitle.setText(title);
        tvContent.setText(content);
        btnLeft.setText(left);
        btnRight.setText(right);
        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickCancle();
                }
                dialog.dismiss();
            }
        });

        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickOk();
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }

    public static void showClearDialog(Context context, String content, String left, String right, OnDialogSelectListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_dialog_clear, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
                ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.setContentView(view, params);

        TextView tvTitle = (TextView) view.findViewById(R.id.tv_title);
        TextView tvContent = (TextView) view.findViewById(R.id.tv_content);
        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);
        tvContent.setText(content);
        btnLeft.setText(left);
        btnRight.setText(right);
        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickCancle();
                }
                dialog.dismiss();
            }
        });

        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickOk();
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }

    public static void showTimePick(Context context, String selTime, CustomDatePicker.ResultHandler resultHandler) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm", Locale.CHINA);
        String now = sdf.format(new Date());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.YEAR, 2);
        Date nextYear = calendar.getTime();
        String sNextYear = sdf.format(nextYear);

        CustomDatePicker customDatePicker2 = new CustomDatePicker(context, resultHandler, "2017-01-01 00:01", sNextYear); // 初始化日期格式请用：yyyy-MM-dd HH:mm，否则不能正常运行
        customDatePicker2.showSpecificTime(true); // 显示时和分
        customDatePicker2.setIsLoop(false); // 允许循环滚动
        if (!TextUtils.isEmpty(selTime)) {
            customDatePicker2.show(selTime);
        } else {
            customDatePicker2.show(now);
        }
    }

    public static void showReserveDialog(Activity context, String seat, OnReserveDialogListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_dialog_reserve, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
                ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.setContentView(view, params);

        TextView tv_seat = (TextView) view.findViewById(R.id.tv_seat);
        EditText et_name = (EditText) view.findViewById(R.id.et_name);
        EditText et_phone = (EditText) view.findViewById(R.id.et_phone);
        TextView tv_time = (TextView) view.findViewById(R.id.tv_time);
        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);
        tv_seat.setText(seat);

        tv_time.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showTimePick(context, tv_time.getText().toString(), new CustomDatePicker.ResultHandler() {
                    @Override
                    public void handle(String time) {
                        AppUtils.hideSoftInput(context);
                        tv_time.setText(time);
                    }
                });
            }
        });

        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickCancle();
                }
                dialog.dismiss();
            }
        });

        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    String name = et_name.getText().toString();
                    String phone = et_phone.getText().toString();
                    String time = tv_time.getText().toString();
                    if (TextUtils.isEmpty(name)) {
                        AppUtils.showToast(context, "请填写姓名！");
                        return;
                    }
                    if (TextUtils.isEmpty(phone)) {
                        AppUtils.showToast(context, "请填写手机号！");
                        return;
                    }

                    if (!Validator.isMobile(phone)) {
                        AppUtils.showToast(context, "手机号格式错误！");
                        return;
                    }

                    if (TextUtils.isEmpty(time)) {
                        AppUtils.showToast(context, "请选择时间！");
                        return;
                    }

                    listener.onClickOk(name, phone, time);
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }

    public static void showEditDialog(Context context, String title, String left, String right, OnEditDialogListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_edit_dialog, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
                ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.setContentView(view, params);

        TextView tvTitle = (TextView) view.findViewById(R.id.tv_title);
        EditText etContent = (EditText) view.findViewById(R.id.et_content);
        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);
        tvTitle.setText(title);
        btnLeft.setText(left);
        btnRight.setText(right);
        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickCancle();
                }
                dialog.dismiss();
            }
        });

        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickOk(etContent.getText().toString());
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }

    public static void showStatusDialog(Context context, String seat, OnDialogSatausListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_dialog_status, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
                ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.setContentView(view, params);

        TextView tvContent = (TextView) view.findViewById(R.id.tv_content);
        tvContent.setText("将" + seat + "号台设置为以下状态");
        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnMid = (TextView) view.findViewById(R.id.btn_mid);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);
        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClick(0);
                }
                dialog.dismiss();
            }
        });
        btnMid.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClick(1);
                }
                dialog.dismiss();
            }
        });
        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClick(2);
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }

    public static void showSeatsDialog(Context context, List<SeatGetOpenSeatAll> list, OnEditDialogListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_dialog_seats, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        int screenHeight = ScreenUtil.getScreenHeight(context);
        dialog.setContentView(view);

        Window dialogWindow = dialog.getWindow();
        dialogWindow.setLayout((int) (screenWidth * 0.8), (int) (screenHeight * 0.65));

        RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.recyclerView);
        LinearLayoutManager manager = new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(manager);
        SeatsAdapter adapter = new SeatsAdapter(list);
        adapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                SeatGetOpenSeatAll item = (SeatGetOpenSeatAll) adapter.getItem(position);
                if (listener != null) {
                    listener.onClickOk(item.getId());
                }
                dialog.dismiss();
            }
        });
        recyclerView.setAdapter(adapter);

        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClickCancle();
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }

    public static void showQrCodeDialog(Context context, String type, String qrCode, OnDialogSatausListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_dialog_qrcode, null);
        Dialog dialog = new Dialog(context, R.style.MyDialog);
        dialog.setCanceledOnTouchOutside(false);
        int screenWidth = ScreenUtil.getScreenWidth(context);
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
                ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.setContentView(view, params);

        TextView tv_order_info = (TextView) view.findViewById(R.id.tv_order_info);
        tv_order_info.setText("（" + type + "）二维码收款");

        ImageView iv_qr_code = (ImageView) view.findViewById(R.id.iv_qr_code);
        iv_qr_code.setImageBitmap(QRImageUtils.createQRImage(context, qrCode, null));

        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);
        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClick(0);
                }
                dialog.dismiss();
            }
        });
        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClick(1);
                }
                dialog.dismiss();
            }
        });
        dialog.show();
    }
}
