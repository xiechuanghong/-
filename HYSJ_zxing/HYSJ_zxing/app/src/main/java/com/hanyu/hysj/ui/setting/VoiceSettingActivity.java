package com.hanyu.hysj.ui.setting;

import android.support.v7.widget.AppCompatCheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.hx.HXHelper;

import butterknife.BindView;


/**
 * Created by Administrator on 2017/9/10.
 */

public class VoiceSettingActivity extends BaseActivity {

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
    @BindView(R.id.ll)
    LinearLayout mLl;
    @BindView(R.id.view_titlebar)
    LinearLayout mViewTitlebar;
    @BindView(R.id.cb_box1)
    AppCompatCheckBox mCbBox1;
    @BindView(R.id.cb_box2)
    AppCompatCheckBox mCbBox2;
    @BindView(R.id.tv_change1)
    TextView mTvChange1;
    @BindView(R.id.ll_1)
    LinearLayout mLl1;
    @BindView(R.id.tv_change2)
    TextView mTvChange2;
    @BindView(R.id.ll_2)
    LinearLayout mLl2;
    @BindView(R.id.tv_change3)
    TextView mTvChange3;
    @BindView(R.id.ll_3)
    LinearLayout mLl3;
    @BindView(R.id.rb_music)
    RadioButton mRbMusic;
    @BindView(R.id.rb_oder_content)
    RadioButton mRbOderContent;
    @BindView(R.id.rg)
    RadioGroup mRg;

    @Override
    protected int getLayoutId() {
        return R.layout.voice_activity;
    }

    @Override
    protected void setUpView() {
        initView();


        AppCompatCheckBox viewById = (AppCompatCheckBox) this.findViewById(R.id.cb_box1);
        viewById.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    HXHelper.getInstance().setSound(true);
                } else {

                }
            }
        });
    }

    private void initView() {
        mTvTitle.setText("语音设置");

    }
}
