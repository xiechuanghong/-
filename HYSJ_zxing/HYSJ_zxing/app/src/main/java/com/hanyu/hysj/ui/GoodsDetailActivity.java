package com.hanyu.hysj.ui;

import android.app.Activity;
import android.content.Intent;
import android.text.TextUtils;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseNetActivity;
import com.hanyu.hysj.bean.GoodsDetailsBean;
import com.hanyu.hysj.bean.GoodsGoodsEditBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.ImageLoader;
import com.hanyu.hysj.weight.CashierTextWatcher;

import butterknife.BindView;
import butterknife.OnClick;

// 商品详情
public class GoodsDetailActivity extends BaseNetActivity {
    @BindView(R.id.iv_icon)
    ImageView ivIcon;
    @BindView(R.id.et_name)
    EditText etName;
    @BindView(R.id.tv_googs_category)
    TextView tvGoogsCategory;
    @BindView(R.id.et_price)
    EditText etPrice;
    @BindView(R.id.cb_up)
    CheckBox cbUp;
    @BindView(R.id.et_des)
    EditText etDes;
    @BindView(R.id.et_repertory)
    EditText etRepertory;
    @BindView(R.id.tv_sold_count)
    TextView tvSoldCount;
    @BindView(R.id.tv_sort)
    TextView tvSort;

    public static final int REQUEST_CODE_CATEGORY = 100;
    private String goods_id = "";
    private String category_id = "";

    @Override
    protected void setUpView() {
        goods_id = getIntent().getStringExtra("goods_id");
        etPrice.addTextChangedListener(new CashierTextWatcher(etPrice));

        super.setUpView();
        setTitleBarTitle("商品详情");
        load();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.goods_detail_activity;
    }

    @Override
    protected void request() {
        NetPresenter.goodsDetails(KeyUtil.getKey(), goods_id, new ApiCallBack<GoodsDetailsBean>(this) {
            @Override
            protected void onSuccess(GoodsDetailsBean data, String msg) {
                if (data != null) {
                    GoodsDetailActivity.this.onSucceed(data);
                } else {
                    GoodsDetailActivity.this.onFailure(R.layout.temp_loading_error_view, 0, "系统错误");
                }
            }

            @Override
            protected void onFailure(String error) {
                GoodsDetailActivity.this.onFailure(R.layout.temp_loading_error_view, 0, error);
            }
        });
    }

    private void onSucceed(GoodsDetailsBean data) {
        super.onSucceed();

        ImageLoader.loadImage(Glide.with(this), ivIcon, data.getGoods_img());

        etName.setText(data.getGoods_name());
        tvGoogsCategory.setText(data.getCategory());
        etPrice.setText(data.getGoods_price());
        etDes.setText(data.getGoods_desc());
        etRepertory.setText("" + data.getGoods_number());
        tvSoldCount.setText("" + data.getSales());
        tvSort.setText("" + data.getSort());

        if (1 == data.getIs_on_sale()) {
            cbUp.setChecked(true);
        } else {
            cbUp.setChecked(false);
        }
    }

    @Override
    protected boolean enableSwipeRefreshLayout() {
        return false;
    }

    @OnClick({R.id.tv_submit, R.id.ll_googs_category})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.tv_submit: {
                String is_on_sale = cbUp.isChecked() ? "1" : "0";
                String goods_number = etRepertory.getText().toString();
                String goods_name = etName.getText().toString();
                String goods_price = etPrice.getText().toString();
                String goods_desc = etDes.getText().toString();

                if (TextUtils.isEmpty(goods_name)) {
                    showToast("请输入名称！");
                    return;
                }
                if (TextUtils.isEmpty(goods_name)) {
                    showToast("请输入库存！");
                    return;
                }
                if (TextUtils.isEmpty(goods_price)) {
                    showToast("请输入价格！");
                    return;
                }

                showLoading();
                NetPresenter.goodsGoodsEdit(KeyUtil.getKey(), goods_id, is_on_sale, goods_number, goods_name, category_id, goods_price, goods_desc, new ApiCallBack<GoodsGoodsEditBean>(this) {
                    @Override
                    protected void onSuccess(GoodsGoodsEditBean data, String msg) {
                        disLoading();
                        showToast(msg);
                        finish();
                    }

                    @Override
                    protected void onFailure(String error) {
                        disLoading();
                        showToast(error);
                    }
                });
            }
            break;
            case R.id.ll_googs_category: {
                Intent intent = new Intent(this, GoodsCategoryActivity.class);
                startActivityForResult(intent, REQUEST_CODE_CATEGORY);
            }
            break;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_CATEGORY && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                category_id = data.getStringExtra("category_id");
                String name = data.getStringExtra("name");
                tvGoogsCategory.setText(name);
            }
        }
    }
}
