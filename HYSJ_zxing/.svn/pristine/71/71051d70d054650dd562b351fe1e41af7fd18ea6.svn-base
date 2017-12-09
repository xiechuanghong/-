package com.hanyu.hysj.ui;

import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;

// 评价管理
public class CommentManagerActivity extends BaseActivity {
    @BindView(R.id.tab_top)
    TabLayout tab_top;

    private List<Fragment> fragments;

    @Override
    protected void setUpView() {
        setTitleBarTitle("评价管理");
        initFragments();
    }

    @Override
    protected int getLayoutId() {
        return R.layout.comment_manager_activity;
    }

    private void initFragments() {
        tab_top.addTab(tab_top.newTab().setText("全部评价"));
        tab_top.addTab(tab_top.newTab().setText("好评"));
        tab_top.addTab(tab_top.newTab().setText("中评"));
        tab_top.addTab(tab_top.newTab().setText("差评"));

        fragments = new ArrayList<>();
        CommentManagerFragment allFragment = new CommentManagerFragment();
        Bundle allBundle = new Bundle();
        allBundle.putString("grade", "0");
        allFragment.setArguments(allBundle);

        CommentManagerFragment goodFragment = new CommentManagerFragment();
        Bundle goodBundle = new Bundle();
        goodBundle.putString("grade", "1");
        goodFragment.setArguments(goodBundle);

        CommentManagerFragment midFragment = new CommentManagerFragment();
        Bundle midBundle = new Bundle();
        midBundle.putString("grade", "2");
        midFragment.setArguments(midBundle);

        CommentManagerFragment badFragment = new CommentManagerFragment();
        Bundle badBundle = new Bundle();
        badBundle.putString("grade", "3");
        badFragment.setArguments(badBundle);

        fragments.add(allFragment);
        fragments.add(goodFragment);
        fragments.add(midFragment);
        fragments.add(badFragment);

        getSupportFragmentManager().beginTransaction()
                .add(R.id.fl_home, allFragment)
                .add(R.id.fl_home, goodFragment)
                .add(R.id.fl_home, midFragment)
                .add(R.id.fl_home, badFragment)
                .commit();
        showFragment(0);

        tab_top.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                setTabSelection((String) tab.getText());
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
            }
        });
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

    public void setTabSelection(String tabName) {
        switch (tabName) {
            case "全部评价":
                showFragment(0);
                break;
            case "好评":
                showFragment(1);
                break;
            case "中评":
                showFragment(2);
                break;
            case "差评":
                showFragment(3);
                break;
        }
    }
}
