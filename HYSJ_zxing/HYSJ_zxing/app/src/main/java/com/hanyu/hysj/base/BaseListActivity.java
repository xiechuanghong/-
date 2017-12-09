package com.hanyu.hysj.base;

import android.support.v7.widget.RecyclerView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;

import java.util.List;

public abstract class BaseListActivity extends BaseNetActivity {
    public RecyclerView recyclerView;
    public BaseQuickAdapter adapter;
    private int currentPage = 1;
    private int countInPage = 10;   //一页请求多少条
    private boolean hasMore = false;
    private boolean enableMore = true;

    protected abstract BaseQuickAdapter createAdapter();

    protected abstract RecyclerView.LayoutManager getLayoutManager();

    protected int getRecyclerViewId() {
        return 0;
    }

    protected boolean enableMore() {
        return true;
    }

    protected void load() {
        onLoading();
        refresh();
    }

    protected synchronized void refresh(){
        setCurrentPage(1);
        request();
    }

    @Override
    protected void setUpView() {
        super.setUpView();
        if (enableSwipeRefreshLayout) {
            swipeRefreshLayout.setOnRefreshListener(() -> {
                refresh();
            });
        }
        if (getRecyclerViewId() != 0) {
            recyclerView = (RecyclerView) findViewById(getRecyclerViewId());
        } else {
            recyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        }

        adapter = createAdapter();
        enableMore = enableMore();
        if (enableMore) {
            adapter.setOnLoadMoreListener(() -> {
                request();
            });
        }
        recyclerView.setLayoutManager(getLayoutManager());
        recyclerView.setAdapter(adapter);
    }

    public <T> void onSucceed(List<T> list) {
        super.onSucceed();
        if (getCurrentPage() == 1) {
            if (enableLoadingView) {
                if (list == null || list.size() == 0) {
                    onEmptyView();
                } else {
                    adapter.setNewData(list);
                    setCurrentPage(getCurrentPage() + 1);
                }
            } else {
                adapter.addData(list);
                setCurrentPage(getCurrentPage() + 1);
            }
        } else {
            if (list != null) {
                adapter.addData(list);
                setCurrentPage(getCurrentPage() + 1);
            }
        }
        if (enableMore) {
            if (list == null || list.size() == 0) {
                hasMore = false;
            } else {
                hasMore = true;
            }
            if (hasMore) {
                adapter.loadMoreComplete();
            } else {
                adapter.loadMoreEnd();
            }
        }
        adapter.notifyDataSetChanged();
    }

    public void onEmptyView() {
        super.onEmpty(R.layout.temp_loading_empty_view, 0, "");
    }

    public void onFailureView(String error) {
        super.onFailure(R.layout.temp_loading_error_view, 0, error);
    }

    public void onFailure(String error) {
        if (getCurrentPage() == 1) {
            if (enableLoadingView) {
                onFailureView(error);
            } else {
                showToast(error);
            }
        } else {
            showToast(error);
        }
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getCurrentPage() {
        return this.currentPage;
    }

    public int getCountInPage() {
        return countInPage;
    }

    public void setCountInPage(int countInPage) {
        this.countInPage = countInPage;
    }

    public boolean isHasMore() {
        return hasMore;
    }

    public void setHasMore(boolean hasMore) {
        this.hasMore = hasMore;
    }
}
