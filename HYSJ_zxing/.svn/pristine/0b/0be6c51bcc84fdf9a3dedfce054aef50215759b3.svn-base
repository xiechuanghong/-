package com.hanyu.hysj.weight.passwordkey;

import android.content.Context;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;

/**
 * 密码框
 * Created by Administrator on 2017/9/8.
 */

public class PwdView extends RelativeLayout {
    
    public TextView[] tvList;      //用数组保存6个TextView，为什么用数组？

    public ImageView[] imgList;      //用数组保存6个TextView，为什么用数组？

    public PwdView(Context context) {
        this(context,null);
    }

    public PwdView(Context context, AttributeSet attrs) {
        this(context, attrs,0);
    }

    public PwdView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    private void init() {
        View view = LayoutInflater.from(getContext()).inflate(R.layout.view_pwd, null);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT);
        view.setLayoutParams(params);

        initView(view);

        initListener();

        addView(view);


    }

    private void initListener() {
        tvList[5].addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {

                if (s.toString().length() == 1) {

                    String strPassword = "";     //每次触发都要先将strPassword置空，再重新获取，避免由于输入删除再输入造成混乱

                    for (int i = 0; i < 6; i++) {
                        strPassword += tvList[i].getText().toString().trim();
                    }
                    System.out.println("strPassword :" + strPassword);
//                    pass.inputFinish(strPassword);    //接口中要实现的方法，完成密码输入完成后的响应逻辑
                    if(mOnFinishListener!=null){
                        mOnFinishListener.onFinish(strPassword);
                    }
                }
            }
        });

    }

    private void initView(View view) {
        tvList = new TextView[6];
        imgList = new ImageView[6];
        tvList[0] = (TextView) view.findViewById(R.id.tv_pass1);
        tvList[1] = (TextView) view.findViewById(R.id.tv_pass2);
        tvList[2] = (TextView) view.findViewById(R.id.tv_pass3);
        tvList[3] = (TextView) view.findViewById(R.id.tv_pass4);
        tvList[4] = (TextView) view.findViewById(R.id.tv_pass5);
        tvList[5] = (TextView) view.findViewById(R.id.tv_pass6);

        imgList[0] = (ImageView) view.findViewById(R.id.img_pass1);
        imgList[1] = (ImageView) view.findViewById(R.id.img_pass2);
        imgList[2] = (ImageView) view.findViewById(R.id.img_pass3);
        imgList[3] = (ImageView) view.findViewById(R.id.img_pass4);
        imgList[4] = (ImageView) view.findViewById(R.id.img_pass5);
        imgList[5] = (ImageView) view.findViewById(R.id.img_pass6);


    }

    public TextView[] getTvList(){
        return tvList;
    }
    public ImageView[] getImgList(){
        return imgList;
    }

    private OnFinishListener mOnFinishListener;
    public void setOnFinishListener(OnFinishListener onFinishListener) {
        mOnFinishListener = onFinishListener;
    }

    public interface OnFinishListener{
        void onFinish(String pwd);
    }




}
