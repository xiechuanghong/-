package com.hanyu.hysj.weight;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import com.hanyu.hysj.R;

public class AppProgressDialog extends Dialog {
    private CharSequence message;

    public AppProgressDialog(Context context) {
        super(context);
    }

    public AppProgressDialog(Context context, int theme) {
        super(context, theme);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
    }

    private void init() {
        setCancelable(false);
        setCanceledOnTouchOutside(false);

        View view = LayoutInflater.from(getContext()).inflate(R.layout.loading_view, null);
        TextView tv_message = (TextView) view.findViewById(R.id.tv_message);
        if (!TextUtils.isEmpty(message)) {
            tv_message.setText(message);
        }
        setContentView(view);
    }

    public void setMessage(CharSequence message) {
        this.message = message;
    }
}