package com.hanyu.hysj.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseActivity;
import com.hanyu.hysj.ui.OrderManageFragment;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import butterknife.BindView;

public class MainActivity extends BaseActivity {
    @BindView(R.id.view_main_btn)
    LinearLayout viewMainBtn;

    public static final String INDEX_TYPE = "INDEX_TYPE";
    public static final int INDEX_MSG = 1;
    private List<Fragment> fragments;

    @Override
    protected int getLayoutId() {
        return R.layout.main_activity;
    }

    @Override
    protected void setUpView() {
        //进入首页,设置状态为非首次使用应用
        initMainButton();
        initFragments();
        initStatus();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        initStatus();
    }

    /**
     * 初始化主页控制按键
     */
    private void initMainButton() {
        for (int i = 0; i < viewMainBtn.getChildCount(); i++) {
            viewMainBtn.getChildAt(i).setId(i);
            viewMainBtn.getChildAt(i).setOnClickListener(v -> {
                checkBtn(v.getId());
                showFragment(v.getId());
            });
        }
    }

    /**
     * 设置按钮选中状态
     */
    private void checkBtn(int position) {
        for (int i = 0; i < viewMainBtn.getChildCount(); i++) {
            ViewGroup viewGroup = (ViewGroup) viewMainBtn.getChildAt(i);
            for (int j = 0; j < viewGroup.getChildCount(); j++) {
                viewGroup.getChildAt(j).setSelected(position == i);
            }
        }
    }

    /**
     * 初始页面状态
     */
    private void initStatus() {
        Intent i = getIntent();
        if (null != i) {
            int showIndex = i.getIntExtra(INDEX_TYPE, 0);
            checkBtn(showIndex);
            showFragment(showIndex);
            return;
        }
        checkBtn(0);
        showFragment(0);
    }


    /**
     * 设置Fragments
     */
    private void initFragments() {
        fragments = new ArrayList<>();
        MainFragment mainFragment = new MainFragment();
        OrderManageFragment orderManageFragment = new OrderManageFragment();

        fragments.add(mainFragment);
        fragments.add(orderManageFragment);

        getSupportFragmentManager().beginTransaction()
                .add(R.id.frame_main, mainFragment)
                .add(R.id.frame_main, orderManageFragment)
                .commit();
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

    public void showIndex(int index){
        checkBtn(index);
        showFragment(index);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            press2Back();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    /**
     * 双击返回退出程序
     */
    private boolean isExit;
    private void press2Back() {
        if (isExit) {
            finish();
        } else {
            isExit = true;
            showToast("再按一次返回桌面");
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    isExit = false;
                }
            }, 2000);
        }
    }
}
