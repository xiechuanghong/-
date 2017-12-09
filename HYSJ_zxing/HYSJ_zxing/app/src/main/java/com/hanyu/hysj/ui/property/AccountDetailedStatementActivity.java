package com.hanyu.hysj.ui.property;

import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.ui.property.fragment.AllFragment;
import com.hanyu.hysj.ui.property.fragment.ApplyWithdrawFragment;
import com.hanyu.hysj.ui.property.fragment.OrderEntryFragment;
import com.hanyu.hysj.weight.MyViewPager;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

/**
 * 帐户明细
 * Created by Administrator on 2017/9/10.
 */

public class AccountDetailedStatementActivity extends BaseActivity {

    @BindView(R.id.iv_back)
    ImageView mIvBack;
    @BindView(R.id.tv_title)
    TextView mTvTitle;
    @BindView(R.id.tl_table)
    TabLayout mTlTable;
    @BindView(R.id.vp_pager)
    MyViewPager mVpPager;
    private List<Fragment> list = new ArrayList<>();
    private String[] titles = {"全部", "订单入账","申请提现"};
    private MyFragmentPagerAdapter mAdapter;


    @Override
    protected int getLayoutId() {
        return R.layout.account_detailed_statement_activity;
    }

    @Override
    protected void setUpView() {
        initView();
        initPager();

    }

    private void initView() {
        mTvTitle.setText("帐户明细");

    }


    private void initPager() {
        AllFragment allFragment = new AllFragment();
        OrderEntryFragment orderEntryFragment = new OrderEntryFragment();
        ApplyWithdrawFragment applyWithdrawFragment = new ApplyWithdrawFragment();
        list.add(allFragment);
        list.add(orderEntryFragment);
        list.add(applyWithdrawFragment);
        mAdapter = new MyFragmentPagerAdapter(getSupportFragmentManager(), list);
        mVpPager.setAdapter(mAdapter);
        mTlTable.setupWithViewPager(mVpPager);

    }


    @OnClick(R.id.iv_back)
    public void onViewClicked() {
        finish();
    }

    public class MyFragmentPagerAdapter extends FragmentPagerAdapter {
        private List<Fragment> datas = new ArrayList<>();



        public MyFragmentPagerAdapter(FragmentManager fm, List<Fragment> data) {
            super(fm);
            this.datas = data;
        }

        @Override
        public Fragment getItem(int position) {
            return datas.get(position);
        }

        @Override
        public int getCount() {
            return datas == null ? 0 : datas.size();
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return titles[position];
        }
    }
}
