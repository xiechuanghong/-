package com.hanyu.hysj.ui;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.View;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

// 商品管理
public class GoodsManageActivity extends BaseActivity {
    @BindView(R.id.tv_googs_list)
    TextView tvGoogsList;
    @BindView(R.id.tv_googs_category)
    TextView tvGoogsCategory;
    private List<Fragment> fragments;

    @Override
    protected void setUpView() {
        setTitleBarTitle("商品管理");
        initFragments();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.goods_manage_activity;
    }

    private void initFragments() {
        fragments = new ArrayList<>();
        GoodsListFragment goodsListFragment = new GoodsListFragment();
        Bundle allBundle = new Bundle();
        goodsListFragment.setArguments(allBundle);

        GoodsCategoryFragment goodsCategoryFragment = new GoodsCategoryFragment();
        Bundle ingBundle = new Bundle();
        goodsCategoryFragment.setArguments(ingBundle);

        fragments.add(goodsListFragment);
        fragments.add(goodsCategoryFragment);

        getSupportFragmentManager().beginTransaction()
                .add(R.id.fl_content, goodsListFragment)
                .add(R.id.fl_content, goodsCategoryFragment)
                .commit();
        showFragment(0);
    }

    /**
     * 控制显示Fragment
     */
    private void showFragment(int checkedId) {
        FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        for (int i = 0; i < fragments.size(); i++) {
            if (checkedId == i) {
                fragmentTransaction.show(fragments.get(i));
            } else {
                fragmentTransaction.hide(fragments.get(i));
            }
        }
        fragmentTransaction.commit();
    }

    @OnClick({R.id.tv_googs_list, R.id.tv_googs_category})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.tv_googs_list:
                selectBtn(0);
                break;
            case R.id.tv_googs_category:
                selectBtn(1);
                break;
        }
    }

    private void selectBtn(int index) {
        if (0 == index) {
            tvGoogsList.setBackgroundResource(R.drawable.bg_tab_left_sel);
            tvGoogsCategory.setBackgroundResource(R.drawable.bg_tab_right);
            tvGoogsList.setTextColor(getResources().getColor(R.color.colorBlack));
            tvGoogsCategory.setTextColor(getResources().getColor(R.color.colorWhite));
        } else {
            tvGoogsList.setBackgroundResource(R.drawable.bg_tab_left);
            tvGoogsCategory.setBackgroundResource(R.drawable.bg_tab_right_sel);
            tvGoogsList.setTextColor(getResources().getColor(R.color.colorWhite));
            tvGoogsCategory.setTextColor(getResources().getColor(R.color.colorBlack));
        }
        showFragment(index);
    }
}
