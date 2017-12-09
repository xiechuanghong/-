package com.hanyu.hysj.base;

import android.content.Context;
import android.support.transition.TransitionManager;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.hanyu.hysj.R;


public class LoadingView extends RelativeLayout {
    private Context context;

    public LoadingView(Context context) {
        super(context);
        this.context = context;
        setVisibility(GONE);
        setGravity(Gravity.CENTER);
    }

    public LoadingView(Context context, AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
        setVisibility(GONE);
        setGravity(Gravity.CENTER);
    }

    public View showView(int resid) {
        setVisibility(VISIBLE);
        removeAllViews();
        View view = LayoutInflater.from(context).inflate(resid, null);
        addView(view, -1, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        postInvalidate();
        return view;
    }

    public View showLoading() {
        return showView(R.layout.loading_view);
    }

    public View showLoading(int resid) {
        return showView(resid);
    }

    public View showError(int resid) {
        return showView(resid);
    }

    public View showEmpty(int resid) {
        return showView(resid);
    }

    public void showContent(ViewGroup view) {
        if (view != null) {
            TransitionManager.beginDelayedTransition(view);
        }
        setVisibility(GONE);
        postInvalidate();
    }

    public void showContent() {
        setVisibility(GONE);
        postInvalidate();
    }
}
