package com.hanyu.hysj.ui;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListFragment;
import com.hanyu.hysj.bean.CommentEditBean;
import com.hanyu.hysj.bean.CommentIndexBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;

import java.util.List;

// 评价管理
public class CommentManagerFragment extends BaseListFragment {
    private String grade;

    @Override
    protected void handlerArguments(Bundle arguments) {
        super.handlerArguments(arguments);
        grade = arguments.getString("grade");
    }

    @Override
    protected void setUpView() {
        super.setUpView();
        load();
    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.templete_list_view;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new CommentManagerAdapter();
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
              CommentIndexBean item = (CommentIndexBean) adapter.getItem(position);
                if (view.getId() == R.id.tv_check) {
                    Intent intent = new Intent(context, OrderDetailActivity.class);
                    intent.putExtra("order_id", item.getOrder_id());
                    startActivity(intent);
                }else if (view.getId() == R.id.tv_no) {
                    commentEdit("2", item.getComment_id());
                }else if (view.getId() == R.id.tv_yes) {
                    commentEdit("1", item.getComment_id());
                }
            }
        });
        return adapter;
    }

    @Override
    protected RecyclerView.LayoutManager getLayoutManager() {
        return new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
    }

    @Override
    protected void request() {
        NetPresenter.commentIndex(KeyUtil.getKey(), "" + getCurrentPage(), "" + getCountInPage(), grade, new ApiCallBack<List<CommentIndexBean>>(getActivity()) {
            @Override
            protected void onSuccess(List<CommentIndexBean> data, String msg) {
                CommentManagerFragment.this.onSucceed(data);
            }

            @Override
            protected void onFailure(String error) {
                CommentManagerFragment.this.onFailure(error);
            }
        });
    }

    private void commentEdit(String is_check, String id){
        showLoading();
        NetPresenter.commentEdit(KeyUtil.getKey(), is_check, id, new ApiCallBack<CommentEditBean>(getActivity()) {
            @Override
            protected void onSuccess(CommentEditBean data, String msg) {
                disLoading();
                showToast(msg);
                load();
            }

            @Override
            protected void onFailure(String error) {
                disLoading();
                showToast(error);
            }
        });
    }
}
