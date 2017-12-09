package com.hanyu.hysj.ui.setting;

import android.content.Context;
import android.content.Intent;
import android.text.Editable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.SpannedString;
import android.text.TextUtils;
import android.text.TextWatcher;
import android.text.style.AbsoluteSizeSpan;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.app.Constants;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.IndexManageEditBean;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.SPUtils;
import com.hanyu.hysj.util.Tools;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 修改管理员昵称
 * Created by Administrator on 2017/9/9.
 */

public class ChangeManagerNickNameActivity extends BaseActivity {

    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.tv_right)
    TextView mTvRight;
    @BindView(R.id.et_nick_name)
    EditText mEtNickName;
    @BindView(R.id.iv_clean)
    ImageView mIvClean;

    @Override
    protected int getLayoutId() {
        return R.layout.change_name_activity;
    }

    @Override
    protected void setUpView() {
        initView();
        initListener();
        mEtNickName.setFocusable(true);
        mEtNickName.requestFocus();

        //打开软键盘
        InputMethodManager imm = (InputMethodManager) this
                .getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);

    }

    private void initListener() {
        mEtNickName.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                String s1 = s.toString();
                if (s1.length() > 0) {
                    mIvClean.setVisibility(View.VISIBLE);
                } else {
                    mIvClean.setVisibility(View.GONE);
                }
            }
        });
    }

    private void initView() {
        LoginLoginBean loginBean = SPUtils.getInstance(this).getLoginBean();
        mTvRight.setVisibility(View.VISIBLE);
        mTvRight.setText("保存");
        mTvTitle.setText("修改昵称");
        SpannableString ss = new SpannableString("请您输入新的昵称");
        AbsoluteSizeSpan ass = new AbsoluteSizeSpan(14, true);//设置字体大小 true表示单位是sp
        ss.setSpan(ass, 0, ss.length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        mEtNickName.setHint(new SpannedString(ss));
        if (loginBean != null) {
            mEtNickName.setText(loginBean.getUsername());
            mEtNickName.setSelection(loginBean.getUsername().length());
            mIvClean.setVisibility(View.VISIBLE);
        }


    }

    @OnClick({R.id.tv_right, R.id.iv_clean})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.tv_right:
                Log.d("lbx", "点到了吗？");
                changeNickName();
                break;
            case R.id.iv_clean:
                mEtNickName.setText("");
                mIvClean.setVisibility(View.GONE);
                break;
        }
    }

    private void changeNickName() {
        String nickName = mEtNickName.getText().toString().trim();
        if (TextUtils.isEmpty(nickName)) {
            showToast("新的昵称不能为空");
            return;
        }
        NetPresenter.indexManageEdit(nickName, new ApiCallBack<IndexManageEditBean>(this) {
            @Override
            protected void onSuccess(IndexManageEditBean data, String msg) {
                showToast(msg);
                LoginLoginBean loginBean = SPUtils.getInstance(ChangeManagerNickNameActivity.this).getLoginBean();
                if(loginBean!=null){
                    loginBean.setUsername(nickName);
                    SPUtils.getInstance(ChangeManagerNickNameActivity.this).setObjectPreferences(Constants.SP_LOGIN, loginBean);
                }
                Intent intent = new Intent();
                intent.putExtra("nickName", nickName);
                setResult(RESULT_OK, intent);
                finish();
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });

    }

    @Override
    protected void onResume() {
        super.onResume();
        Tools.showSoftInput(this);
    }
}
