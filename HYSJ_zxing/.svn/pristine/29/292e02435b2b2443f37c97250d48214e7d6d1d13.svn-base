package com.hanyu.hysj.ui;

import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseNetActivity;
import com.hanyu.hysj.bean.UserDetailBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.ImageLoader;

import butterknife.BindView;
import butterknife.OnClick;

// 会员详情
public class UserDetailActivity extends BaseNetActivity {
    @BindView(R.id.iv_icon)
    ImageView ivIcon;
    @BindView(R.id.tv_name)
    TextView tvName;
    @BindView(R.id.tv_phone)
    TextView tvPhone;
    @BindView(R.id.tv_time_first)
    TextView tvTimeFirst;
    @BindView(R.id.tv_time_last)
    TextView tvTimeLast;
    @BindView(R.id.iv_goods)
    ImageView ivGoods;
    @BindView(R.id.tv_time_start)
    TextView tvTimeStart;
    @BindView(R.id.tv_time_over)
    TextView tvTimeOver;
    @BindView(R.id.ll_user)
    LinearLayout llUser;
    @BindView(R.id.ll_order_time)
    LinearLayout llOrderTime;
    @BindView(R.id.ll_order_last)
    LinearLayout llOrderLast;

    private String user_id = "";
    private String nickname;

    @Override
    protected void setUpView() {
        user_id = getIntent().getStringExtra("user_id");

        super.setUpView();
        setTitleBarTitle("会员详情");
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.user_detail_activity;
    }

    @Override
    protected void request() {
        NetPresenter.userDetail(KeyUtil.getKey(), user_id, new ApiCallBack<UserDetailBean>(this) {
            @Override
            protected void onSuccess(UserDetailBean data, String msg) {
                if (data != null) {
                    UserDetailActivity.this.onSucceed(data);
                } else {
                    UserDetailActivity.this.onFailure(R.layout.temp_loading_error_view, 0, "系统错误");
                }
            }

            @Override
            protected void onFailure(String error) {
                UserDetailActivity.this.onFailure(R.layout.temp_loading_error_view, 0, error);
            }
        });
    }

    private void onSucceed(UserDetailBean data) {
        super.onSucceed();

        UserDetailBean.UserEntity user = data.getUser();
        UserDetailBean.TimeEntity time = data.getTime();
        UserDetailBean.SetmealEntity setmeal = data.getSetmeal();
        if (user == null) {
            llUser.setVisibility(View.GONE);
        } else {
            ImageLoader.loadImage(Glide.with(this), ivIcon, user.getHead_image());
            nickname = user.getNickname();
            tvName.setText(user.getNickname());
            tvPhone.setText("手机号：" + user.getPhone_number());
        }

        if (time == null) {
            llOrderTime.setVisibility(View.GONE);
        } else {
            tvTimeFirst.setText(time.getFirst());
            tvTimeLast.setText(time.getLast());
        }

        if (setmeal == null) {
            llOrderLast.setVisibility(View.GONE);
        } else {
            ImageLoader.loadImage(Glide.with(this), ivGoods, setmeal.getThumb());
            tvTimeStart.setText("开始时间：" + setmeal.getStart_time());
            tvTimeOver.setText("结束时间：" + setmeal.getEnd_time());
        }
    }

    @Override
    protected boolean enableSwipeRefreshLayout() {
        return false;
    }

    @OnClick(R.id.tv_account_change)
    public void onViewClicked() {
        Intent intent = new Intent(this, AccountInfoActivity.class);
        String title = "账号变动";
        if (!TextUtils.isEmpty(nickname)) {
            title = "（"+nickname+"）"+title;
        }
        intent.putExtra("title", title);
        intent.putExtra("user_id", user_id);
        startActivity(intent);
    }
}
