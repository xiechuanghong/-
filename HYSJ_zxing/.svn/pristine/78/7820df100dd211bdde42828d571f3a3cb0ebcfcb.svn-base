package com.hanyu.hysj.ui;

import android.content.Intent;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.PopupWindow;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.hanyu.hysj.R;
import com.hanyu.hysj.base.BaseListFragment;
import com.hanyu.hysj.bean.GoodsCategoryBean;
import com.hanyu.hysj.bean.GoodsGoodsBean;
import com.hanyu.hysj.bean.GoodsGoodsDeleteBean;
import com.hanyu.hysj.bean.GoodsGoodsEditBean;
import com.hanyu.hysj.net.ApiCallBack;
import com.hanyu.hysj.net.KeyUtil;
import com.hanyu.hysj.net.NetPresenter;
import com.hanyu.hysj.ui.menu.UIUtils;
import com.hanyu.hysj.util.DialogUtils;

import java.util.List;

import butterknife.BindView;
import butterknife.OnClick;

// 商品列表
public class GoodsListFragment extends BaseListFragment {
    @BindView(R.id.tv_googs_all)
    TextView tvGoogsAll;
    @BindView(R.id.tv_goods_up)
    TextView tvGoodsUp;
    @BindView(R.id.tv_goods_down)
    TextView tvGoodsDown;
    @BindView(R.id.tv_googs_category)
    TextView tvGoogsCategory;

    private String goods_number = "0";
    private String category_id = "";
    private String is_on_sale = "";

    List<GoodsCategoryBean> goodsCategoryBeanList;

    @Override
    protected void setUpView() {
        super.setUpView();
    }

    @Override
    public void onStart() {
        super.onStart();
        goodsCategory();
        selectBtn(0);
    }

    @Override
    protected int setFragmentLayoutId() {
        return R.layout.goods_list_fragment;
    }

    @Override
    protected BaseQuickAdapter createAdapter() {
        BaseQuickAdapter adapter = new GoodsListAdapter();
        adapter.setOnItemClickListener(new BaseQuickAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(BaseQuickAdapter adapter, View view, int position) {
                GoodsGoodsBean.DataEntity item = (GoodsGoodsBean.DataEntity) adapter.getItem(position);
                Intent intent = new Intent(context, GoodsDetailActivity.class);
                intent.putExtra("goods_id", item.getGoods_id());
                startActivity(intent);
            }
        });
        adapter.setOnItemChildClickListener(new BaseQuickAdapter.OnItemChildClickListener() {
            @Override
            public void onItemChildClick(BaseQuickAdapter adapter, View view, int position) {
                GoodsGoodsBean.DataEntity item = (GoodsGoodsBean.DataEntity) adapter.getItem(position);
                if (view.getId() == R.id.tv_delete) {
                    DialogUtils.showWarnDialog(context, "温馨提示", "确定删除该商品？", "取消", "确定", new DialogUtils.OnDialogSelectListener() {
                        @Override
                        public void onClickOk() {
                            showLoading();
                            NetPresenter.goodsGoodsDelete(KeyUtil.getKey(), item.getGoods_id(), new ApiCallBack<GoodsGoodsDeleteBean>(getActivity()) {
                                @Override
                                protected void onSuccess(GoodsGoodsDeleteBean data, String msg) {
                                    disLoading();
                                    showToast("删除成功");
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
                } else if (view.getId() == R.id.tv_clear) {
                    DialogUtils.showWarnDialog(context, "温馨提示", "确定清零该商品库存？", "取消", "确定", new DialogUtils.OnDialogSelectListener() {
                        @Override
                        public void onClickOk() {
                            showLoading();
                            NetPresenter.goodsGoodsEdit(KeyUtil.getKey(), item.getGoods_id(), is_on_sale, "0", "", "", "", "", new ApiCallBack<GoodsGoodsEditBean>(getActivity()) {
                                @Override
                                protected void onSuccess(GoodsGoodsEditBean data, String msg) {
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
                } else if (view.getId() == R.id.tv_up) {
                    String content = "";
                    String is_on_sale = "0";
                    if ("1".equals(item.getIs_on_sale())) {
                        content = "确定下架该商品？";
                        is_on_sale = "0";
                    } else {
                        content = "确定上架该商品？";
                        is_on_sale = "1";
                    }
                    String finalIs_on_sale = is_on_sale;
                    DialogUtils.showWarnDialog(context, "温馨提示", content, "取消", "确定", new DialogUtils.OnDialogSelectListener() {
                        @Override
                        public void onClickOk() {
                            showLoading();
                            NetPresenter.goodsGoodsEdit(KeyUtil.getKey(), item.getGoods_id(), finalIs_on_sale, "", "", "", "", "", new ApiCallBack<GoodsGoodsEditBean>(getActivity()) {
                                @Override
                                protected void onSuccess(GoodsGoodsEditBean data, String msg) {
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
        NetPresenter.goodsGoods(KeyUtil.getKey(), category_id, is_on_sale, "" + getCurrentPage(), "" + getCountInPage(), goods_number, new ApiCallBack<GoodsGoodsBean>(getActivity()) {
            @Override
            protected void onSuccess(GoodsGoodsBean data, String msg) {
                if (data != null) {
                    GoodsListFragment.this.onSucceed(data.getData());
                } else {
                    GoodsListFragment.this.onSucceed(null);
                }
            }

            @Override
            protected void onFailure(String error) {
                GoodsListFragment.this.onFailure(error);
            }
        });
    }

    private void goodsCategory() {
        NetPresenter.goodsCategory(KeyUtil.getKey(), "", new ApiCallBack<List<GoodsCategoryBean>>(getActivity()) {
            @Override
            protected void onSuccess(List<GoodsCategoryBean> data, String msg) {
                goodsCategoryBeanList = data;
            }

            @Override
            protected void onFailure(String error) {
            }
        });
    }

    @OnClick({R.id.tv_googs_all, R.id.tv_goods_up, R.id.tv_goods_down, R.id.tv_googs_category})
    public void onViewClicked(View view) {
        switch (view.getId()) {
            case R.id.tv_googs_all:
                selectBtn(0);
                break;
            case R.id.tv_goods_up:
                selectBtn(1);
                break;
            case R.id.tv_goods_down:
                selectBtn(2);
                break;
            case R.id.tv_googs_category:
                selectBtn(3);
                PopupWindow popupWindow = UIUtils.showCategory(getActivity(), goodsCategoryBeanList, new UIUtils.CheckPlaceListener() {
                    @Override
                    public void onItemClick(int position) {
                        GoodsCategoryBean goodsCategoryBean = goodsCategoryBeanList.get(position);
                        tvGoogsCategory.setText(goodsCategoryBean.getName());
                        category_id = goodsCategoryBean.getId();
                        load();
                    }
                });
                popupWindow.showAsDropDown(tvGoogsCategory);
                break;
        }
    }

    private void selectBtn(int index) {
        tvGoogsAll.setTextColor(getResources().getColor(R.color.stand_text_des));
        tvGoodsUp.setTextColor(getResources().getColor(R.color.stand_text_des));
        tvGoodsDown.setTextColor(getResources().getColor(R.color.stand_text_des));
        tvGoogsCategory.setTextColor(getResources().getColor(R.color.stand_text_des));
        if (0 == index) {
            tvGoogsAll.setTextColor(getResources().getColor(R.color.colorBlack));
            category_id = "";
            is_on_sale = "";
            load();
        } else if (1 == index) {
            tvGoodsUp.setTextColor(getResources().getColor(R.color.colorBlack));
            category_id = "";
            is_on_sale = "1";
            load();
        } else if (2 == index) {
            tvGoodsDown.setTextColor(getResources().getColor(R.color.colorBlack));
            category_id = "";
            is_on_sale = "0";
            load();
        } else {
            tvGoogsCategory.setTextColor(getResources().getColor(R.color.colorBlack));
        }
    }
}
