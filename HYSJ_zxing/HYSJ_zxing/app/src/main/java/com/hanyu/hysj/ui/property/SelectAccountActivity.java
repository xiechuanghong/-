package com.hanyu.hysj.ui.property;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemClickListener;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListActivity;
import com.hanyu.hysj.base.LoadingView;
import com.hanyu.hysj.bean.LoginLoginBean;
import com.hanyu.hysj.bean.UserPapersBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.property.adapter.SelectAccountAdapter;
import com.hanyu.hysj.ui.setting.SettingWithdrawPwdActivity;
import com.hanyu.hysj.util.SPUtils;
import com.hanyu.hysj.util.Tools;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 选择支付宝账户
 * Created by Administrator on 2017/9/8.
 */


public class SelectAccountActivity extends BaseListActivity {

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
    @BindView(R.id.loadingView)
    LoadingView mLoadingView;
    @BindView(R.id.recyclerView)
    RecyclerView mRecyclerView;
    @BindView(R.id.swipeRefreshLayout)
    SwipeRefreshLayout mSwipeRefreshLayout;
    private String pass = "";
    private SelectAccountAdapter adapter;
    private String id;
    @Override
    protected int getLayoutId() {
        return R.layout.select_account_activity;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        adapter = new SelectAccountAdapter(R.layout.select_account_list_item, null,id);
        return adapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(this);
    }

    @Override
    protected void setUpView() {
        id = getIntent().getStringExtra("id");
        super.setUpView();
        initView();
        load();
        initListener();


    }

    private void initListener() {
        mRecyclerView.addOnItemTouchListener(new OnItemClickListener() {
            @Override
            public void onSimpleItemClick(BaseQuickAdapter adapter, View view, int position) {
                LoginLoginBean loginBean = SPUtils.getInstance(SelectAccountActivity.this).getLoginBean();
                if(loginBean!=null){
                    pass = loginBean.getPass();
                }

                if(TextUtils.isEmpty(pass)){
                    //未设置提现密码
                    Tools.showWarnDialog(SelectAccountActivity.this, "温馨设置", "没有设置提现密码，" +
                            "不能添加支付宝账号，请前往设置", "取消", "前往", new Tools.OnDialogSelectListener() {
                        @Override
                        public void onClickOk() {
                            //去设置提现密码
                            startActivity(new Intent(SelectAccountActivity.this, SettingWithdrawPwdActivity.class));
                        }

                        @Override
                        public void onClickCancle() {
                            //取消
                        }
                    });
                }else{
                    //已设置提现密码
                    UserPapersBean.DataBean item = (UserPapersBean.DataBean) adapter.getItem(position);
                    Log.d("lbx", "111name:"+item.getName());
                    Log.d("lbx", "111Number:"+item.getAccount());
                    id = item.getId();
                    item.setSelected(true);
                    adapter.notifyItemChanged(position);
                    Intent intent = new Intent();
                    Bundle bundle = new Bundle();
                    bundle.putSerializable("dataBean",item);
                    intent.putExtras(bundle);
                    setResult(RESULT_OK,intent);
                    finish();
                }

            }
        });

    }

    private void initView() {
        mTvTitle.setText("选择支付宝账号");
        mIvRigth2.setVisibility(View.VISIBLE);
        mIvRigth2.setImageDrawable(getResources().getDrawable(R.mipmap.alipay_icon_zengjia));

    }

    @Override
    protected void request() {
        NetPresenter.userPapers(KeyUtil.getKey(), getCurrentPage()+"", getCountInPage()+"", new ApiCallBack<UserPapersBean>(this) {
            @Override
            protected void onSuccess(UserPapersBean data, String msg) {
                onSucceed(data.getData());
            }

            @Override
            protected void onFailure(String error) {
                showToast(error);
                onFailureView(error);

            }
        });
    }

    @OnClick({R.id.iv_back, R.id.iv_rigth2})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.iv_back:
                finish();
                break;
            case R.id.iv_rigth2:
                //添加支付宝账号
                startActivityForResult(new Intent(SelectAccountActivity.this, AddAccountActivity.class),100);
//                startActivity(new Intent(SelectAccountActivity.this, AddAccountActivity.class));
                break;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(resultCode== Activity.RESULT_OK){
            setCurrentPage(1);
            request();
        }
    }
}
