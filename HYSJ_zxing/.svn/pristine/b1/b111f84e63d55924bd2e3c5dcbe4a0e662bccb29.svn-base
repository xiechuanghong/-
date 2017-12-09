package com.hanyu.hysj.ui.property;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.bean.UserPapersEditBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.Validator;

import butterknife.BindView;
import butterknife.OnClick;


/**
 * 添加支付宝账号
 * Created by Administrator on 2017/9/10.
 */

public class AddAccountActivity extends BaseActivity {
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
    @BindView(R.id.et_name)
    EditText mEtName;
    @BindView(R.id.et_papers)
    EditText mEtPapers;
    @BindView(R.id.et_number)
    EditText mEtNumber;
    @BindView(R.id.btn_ok)
    Button mBtnOk;



    @Override
    protected int getLayoutId() {
        return R.layout.add_account_activity;
    }

    @Override
    protected void setUpView() {
        initView();

    }

    private void initView() {
        mTvTitle.setText("添加支付宝账号");
    }

    @OnClick({R.id.iv_back, R.id.btn_ok})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.btn_ok:
                addNumber();
                break;
        }
    }

    private void addNumber() {
        String name = mEtName.getText().toString().trim();
        String papers = mEtPapers.getText().toString().trim();
        String contact = mEtNumber.getText().toString().trim();
        if (TextUtils.isEmpty(name)) {
            showToast("姓名不能为空");
            return;
        }
        if (TextUtils.isEmpty(papers)) {
            showToast("证件内容不能为空");
            return;
        }
        if (TextUtils.isEmpty(contact)) {
            showToast("支付宝账号不能为空");
            return;
        }
        if(!Validator.isEmail(contact)){
            showToast("格式不正确");
            return;
        }
        if(!Validator.isIDCard(papers)){
            showToast("格式不正确");
            return;
        }
        NetPresenter.userPapersEdit(KeyUtil.getKey(), contact, name, "1",papers,contact,"",new ApiCallBack<UserPapersEditBean>(this){

            @Override
            protected void onSuccess(UserPapersEditBean data, String msg) {
                showToast(msg);
                Intent intent = new Intent();
                intent.putExtra("msg", msg);
                setResult(RESULT_OK,intent);
                finish();
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
            }
        });
    }
}
