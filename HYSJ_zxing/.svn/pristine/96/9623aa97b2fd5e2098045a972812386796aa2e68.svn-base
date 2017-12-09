package com.hanyu.hysj.ui;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.StyleRes;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.util.DialogUtils;
import com.hanyu.hysj.util.ScreenUtil;

public class OrderInfoTypeDialog extends Dialog {
    private DialogUtils.OnDialogSatausListener listener;
    private int type = -1;      //0：线下支付；1：余额；2：支付宝；3：微信

    public OrderInfoTypeDialog(@NonNull Context context) {
        super(context);
    }

    public OrderInfoTypeDialog(@NonNull Context context, @StyleRes int themeResId) {
        super(context, themeResId);
    }

    protected OrderInfoTypeDialog(@NonNull Context context, boolean cancelable, @Nullable OnCancelListener cancelListener) {
        super(context, cancelable, cancelListener);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        initView();
        configDialog();
    }

    private void configDialog() {
        int screenWidth = ScreenUtil.getScreenWidth(getContext());
        Window dialogWindow = getWindow();
        dialogWindow.setLayout((int) (screenWidth * 0.8), ViewGroup.LayoutParams.WRAP_CONTENT);
    }

    private void initView() {
        View view = LayoutInflater.from(getContext()).inflate(R.layout.view_dialog_order, null);
        setContentView(view);
//        int screenWidth = ScreenUtil.getScreenWidth(getContext());
//        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams((int) (screenWidth * 0.8),
//                ViewGroup.LayoutParams.WRAP_CONTENT);
//        setContentView(view, params);

        LinearLayout ll_zfb = (LinearLayout) view.findViewById(R.id.ll_zfb);
        ImageView iv_zfb = (ImageView) view.findViewById(R.id.iv_zfb);
        LinearLayout ll_wx = (LinearLayout) view.findViewById(R.id.ll_wx);
        ImageView iv_wx = (ImageView) view.findViewById(R.id.iv_wx);
        TextView btnLeft = (TextView) view.findViewById(R.id.btn_left);
        TextView btnRight = (TextView) view.findViewById(R.id.btn_right);

        //初始化时，默认选择第一项
        type = 2;
        iv_zfb.setImageResource(R.mipmap.payment_icon_choice);
        iv_wx.setImageResource(R.mipmap.payment_icon_nochoice);

        ll_zfb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                type = 2;
                iv_zfb.setImageResource(R.mipmap.payment_icon_choice);
                iv_wx.setImageResource(R.mipmap.payment_icon_nochoice);
            }
        });
        ll_wx.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                type = 3;
                iv_zfb.setImageResource(R.mipmap.payment_icon_nochoice);
                iv_wx.setImageResource(R.mipmap.payment_icon_choice);
            }
        });

        btnLeft.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dismiss();
            }
        });

        btnRight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (listener != null) {
                    listener.onClick(type);
                }
                dismiss();
            }
        });
    }

    public void setListener(DialogUtils.OnDialogSatausListener listener) {
        this.listener = listener;
    }
}
