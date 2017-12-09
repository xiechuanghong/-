package com.hanyu.hysj.base;

import android.support.v4.widget.SwipeRefreshLayout;
import android.text.TextUtils;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.hanyu.hysj.R;

public abstract class BaseNetFragment extends BaseFragment {
    public LoadingView loadingView;
    public boolean enableLoadingView = true;

    public SwipeRefreshLayout swipeRefreshLayout;
    public boolean enableSwipeRefreshLayout = true;


    @Override
    protected void setUpView() {
        enableLoadingView = enableLoadingView();
        if (enableLoadingView) {
            if (getLoadingViewId() != 0) {
                loadingView = (LoadingView) mView.findViewById(getLoadingViewId());
            } else {
                loadingView = (LoadingView) mView.findViewById(R.id.loadingView);
            }
        }

        enableSwipeRefreshLayout = enableSwipeRefreshLayout();
        if (enableSwipeRefreshLayout) {
            if (getSwipeRefreshLayoutId() != 0) {
                swipeRefreshLayout = (SwipeRefreshLayout) mView.findViewById(getSwipeRefreshLayoutId());
            } else {
                swipeRefreshLayout = (SwipeRefreshLayout) mView.findViewById(R.id.swipeRefreshLayout);
            }

            swipeRefreshLayout.setOnRefreshListener(() -> {
                request();
            });
        }
    }

    //第一次网络请求，这个是特殊的，因为显示的遮罩的loading
    protected void load() {
        onLoading();
        request();
    }

    //只是发网络请求
    protected abstract void request();

    public void onLoading() {
        if (enableLoadingView) {
            loadingView.showLoading();
        }
    }

    public void onSucceed() {
        if (enableLoadingView) {
            loadingView.showContent();
        }
        if (enableSwipeRefreshLayout) {
            swipeRefreshLayout.setRefreshing(false);
        }
    }

    public void onFailure(int layoutId, int imgId, String error) {
        if (enableLoadingView) {
            View errorView = loadingView.showError(layoutId);
            if (imgId != 0) {
                ImageView img = (ImageView) errorView.findViewById(R.id.iv_icon);
                img.setImageResource(imgId);
            }
            if (!TextUtils.isEmpty(error)) {
                TextView errorText = (TextView) errorView.findViewById(R.id.errorText);
                errorText.setText(error);
            }
            if (enableSwipeRefreshLayout) {
                if (swipeRefreshLayout != null) {
                    swipeRefreshLayout.setRefreshing(false);
                }
            }
            errorView.setOnClickListener(v -> load());
        }
    }

    public void onEmpty(int layoutId, int imgId, String error) {
        if (enableLoadingView) {
            View emptyView = loadingView.showEmpty(layoutId);
            ImageView img = (ImageView) emptyView.findViewById(R.id.iv_icon);
            if (imgId != 0) {
                img.setImageResource(imgId);
            } else {
                img.setVisibility(View.GONE);
            }
            if (!TextUtils.isEmpty(error)) {
                TextView errorText = (TextView) emptyView.findViewById(R.id.errorText);
                errorText.setText(error);
            }
            if (enableSwipeRefreshLayout) {
                if (swipeRefreshLayout != null) {
                    swipeRefreshLayout.setRefreshing(false);
                }
            }
            emptyView.setOnClickListener(v -> load());
        }
    }

    protected boolean enableLoadingView() {
        return true;
    }

    protected int getLoadingViewId() {
        return 0;
    }

    protected boolean enableSwipeRefreshLayout() {
        return true;
    }

    protected int getSwipeRefreshLayoutId() {
        return 0;
    }
}
