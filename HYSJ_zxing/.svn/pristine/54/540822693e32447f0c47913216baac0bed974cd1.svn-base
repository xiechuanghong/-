package com.hanyu.hysj.base;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.hanyu.hysj.R;
import com.hanyu.hysj.weight.AppProgressDialog;
import com.socks.library.KLog;

import butterknife.ButterKnife;

public abstract class BaseFragment extends Fragment{

    /**
     * 视图是否已经初初始化
     */
    protected boolean isInit = false;
    protected boolean isLoad = false;

    protected Context context;
    private AppProgressDialog progressDialog;

    public View mView;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        Bundle arguments = getArguments();
        if (arguments != null) {
            handlerArguments(arguments);
        }
        KLog.d("fragment=","onAttach");
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        mView  = inflater.inflate(setFragmentLayoutId(), container, false);
        ButterKnife.bind(this, mView);
        context = getContext();

        isInit = true;
        isCanLoadData();
        KLog.d("fragment=","onCreateView");
        return mView;
    }


    /**
     * 视图是否已经对用户可见，系统的方法，setUserVisibleHint在onCreate之前调用
     * 1.第一次创建Fragment时，加载数据会报空指针异常，所以要加个判断是否已经初始化
     * 2.当Fragment已经初始化，再次可见时会直接调用此方法，此时可以直接加载数据
     * 所以要在两个地方调用加载数据
     */
    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        isCanLoadData();
    }

    /**
     * 是否可以加载数据
     * 可以加载数据的条件：
     * 1.视图已经初始化
     * 2.视图对用户可见
     */
    private void isCanLoadData() {
        if (!isInit) {
            return;
        }

        if (getUserVisibleHint()) {
            setUpView();
            isLoad = true;
        } else {
            if (isLoad) {
                stopLoad();
            }
        }
    }

    /**
     * 设置Fragment布局Id
     */
    protected abstract int setFragmentLayoutId();

    /**
     * 当视图初始化并且对用户可见的时候去真正的加载数据
     */
    protected abstract void setUpView();

    /**
     * 当视图已经对用户不可见并且加载过数据，如果需要在切换到其他页面时停止加载数据，可以调用此方法
     */
    protected void stopLoad() {}

    /**
     * 处理从Activity传过来的参数
     * @param arguments
     */
    protected void handlerArguments(Bundle arguments) {}

    /**
     * 视图销毁的时候讲Fragment是否初始化的状态变为false
     */
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        isInit = false;
        isLoad = false;
        KLog.d("fragment=","onDestroyView");
    }

    public void showLoading(String message) {
        if (progressDialog == null) {
            progressDialog = new AppProgressDialog(context, R.style.Custom_Progress);
            if (!TextUtils.isEmpty(message)) {
                progressDialog.setMessage(message);
            }
        }
        progressDialog.show();
    }

    public void showLoading() {
        if (progressDialog == null) {
            progressDialog = new AppProgressDialog(context, R.style.Custom_Progress);
        }
        progressDialog.show();
    }

    public void disLoading() {
        if (progressDialog != null && progressDialog.isShowing()) {
            progressDialog.dismiss();
            progressDialog = null;
        }
    }

    public void showToast(String msg) {
        Toast toast = null;
        if (TextUtils.isEmpty(msg)) {
            return;
        }
        if(toast==null){
            toast=Toast.makeText(context,msg, Toast.LENGTH_SHORT);
        }
        toast.setText(msg);
        toast.show();
    }

    public void setUpBack() {
        ImageView ivBack = (ImageView) mView.findViewById(R.id.iv_back);
        if (ivBack != null) {
            ivBack.setOnClickListener(v -> getActivity().finish());
        }
    }

    /**
     * 设置标题栏标题
     *
     * @param title
     */
    public void setTitleBarTitle(String title) {
        TextView tvTitle = (TextView) mView.findViewById(R.id.tv_title);
        if (tvTitle != null) {
            tvTitle.setText(title);
        }
    }

    /**
     * 隐藏标题返回键
     */
    public void setBackIconGone() {
        ImageView iv_back = (ImageView) mView.findViewById(R.id.iv_back);
        if (iv_back != null) {
            iv_back.setVisibility(View.GONE);
        }
    }
}
