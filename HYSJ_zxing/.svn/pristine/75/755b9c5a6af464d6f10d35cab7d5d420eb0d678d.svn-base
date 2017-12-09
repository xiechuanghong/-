package com.hanyu.hysj.ui;

import android.support.design.widget.TabLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.view.View;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListFragment;
import com.hanyu.hysj.bean.GoodsCategoryBean;
import com.hanyu.hysj.bean.GoodsCategoryDeleteBean;
import com.hanyu.hysj.bean.GoodsCategoryEditBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.util.DialogUtils;

import java.util.List;

import butterknife.BindView;

// 商品分类
public class GoodsCategoryFragment extends BaseListFragment {
    @BindView(R.id.tab_top)
    TabLayout tab_top;

    private String is_show = "";

    @Override
    protected void setUpView() {
        super.setUpView();
        initTab();
        load();
    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.goods_category_fragment;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new GoodsCategoryAdapter();
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                GoodsCategoryBean item = (GoodsCategoryBean) adapter.getItem(position);
                if (view.getId() == R.id.tv_delete) {
                    DialogUtils.showWarnDialog(context, "温馨提示", "确定删除该分类？", "取消", "确定", new DialogUtils.OnDialogSelectListener() {
                        @Override
                        public void onClickOk() {
                            showLoading();
                            NetPresenter.goodsCategoryDelete(KeyUtil.getKey(), item.getId(), new ApiCallBack<GoodsCategoryDeleteBean>(getActivity()) {
                                @Override
                                protected void onSuccess(GoodsCategoryDeleteBean data, String msg) {
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

                        @Override
                        public void onClickCancle() {
                        }
                    });
                } else if (view.getId() == R.id.tv_edit) {
                    DialogUtils.showEditDialog(context, "设置分类名称", "取消", "确定", new DialogUtils.OnEditDialogListener() {
                        @Override
                        public void onClickOk(String txt) {
                            if (TextUtils.isEmpty(txt)) {
                                showToast("请输入分类名称！");
                                return;
                            }

                            showLoading();
                            NetPresenter.goodsCategoryEdit(KeyUtil.getKey(), item.getId(), "", txt, new ApiCallBack<GoodsCategoryEditBean>(getActivity()) {
                                @Override
                                protected void onSuccess(GoodsCategoryEditBean data, String msg) {
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

                        @Override
                        public void onClickCancle() {
                        }
                    });
                } else if (view.getId() == R.id.tv_down) {
                    String content = "";
                    String is_on_sale = "0";
                    if ("1".equals(item.getIs_show())) {
                        content = "确定下架该分类？";
                        is_on_sale = "0";
                    } else {
                        content = "确定上架该分类？";
                        is_on_sale = "1";
                    }
                    String finalIs_on_sale = is_on_sale;
                    DialogUtils.showWarnDialog(context, "温馨提示", content, "取消", "确定", new DialogUtils.OnDialogSelectListener() {
                        @Override
                        public void onClickOk() {
                            showLoading();
                            NetPresenter.goodsCategoryEdit(KeyUtil.getKey(), item.getId(), finalIs_on_sale, "", new ApiCallBack<GoodsCategoryEditBean>(getActivity()) {
                                @Override
                                protected void onSuccess(GoodsCategoryEditBean data, String msg) {
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

                        @Override
                        public void onClickCancle() {
                        }
                    });
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
        NetPresenter.goodsCategory(KeyUtil.getKey(), is_show, new ApiCallBack<List<GoodsCategoryBean>>(getActivity()) {
            @Override
            protected void onSuccess(List<GoodsCategoryBean> data, String msg) {
                GoodsCategoryFragment.this.onSucceed(data);
            }

            @Override
            protected void onFailure(String error) {
                GoodsCategoryFragment.this.onFailure(error);
            }
        });
    }

    private void initTab() {
        tab_top.addTab(tab_top.newTab().setText("所有分组"));
        tab_top.addTab(tab_top.newTab().setText("上架中"));
        tab_top.addTab(tab_top.newTab().setText("已下架"));

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

    public void setTabSelection(String tabName) {
        switch (tabName) {
            case "所有分组": {
                is_show = "";
                load();
            }
            break;
            case "上架中": {
                is_show = "1";
                load();
            }
            break;
            case "已下架": {
                is_show = "0";
                load();
            }
            break;
        }
    }

    @Override
    protected boolean enableMore() {
        return false;
    }
}
