package com.hanyu.hysj.ui.menu;

import android.content.Context;
import android.graphics.drawable.BitmapDrawable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupWindow;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemClickListener;
import com.hanyu.hysj.R;
import com.hanyu.hysj.bean.GoodsCategoryBean;

import java.util.List;

public class UIUtils {
    public interface CheckPlaceListener {
        void onItemClick(int position);
    }

    public static PopupWindow showCategory(Context context, List<GoodsCategoryBean> list, CheckPlaceListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_menu_list, null);

        RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.rv_list);
        LinearLayoutManager manager = new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(manager);
        recyclerView.setAdapter(new CategoryAdapter(list));

        PopupWindow popupWindow = new PopupWindow(view, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        popupWindow.setTouchable(true);
        popupWindow.setFocusable(true);
        popupWindow.setBackgroundDrawable(new BitmapDrawable());
        popupWindow.setOutsideTouchable(true);

        recyclerView.addOnItemTouchListener(new OnItemClickListener() {
            @Override
            public void onSimpleItemClick(BaseQuickAdapter adapter, View view, int position) {
                listener.onItemClick(position);
                popupWindow.dismiss();
            }
        });
        return popupWindow;
    }

    public static PopupWindow showMeun(Context context, RecyclerView.Adapter adapter, OnItemClickListener listener) {
        View view = LayoutInflater.from(context).inflate(R.layout.view_menu_list, null);

        RecyclerView recyclerView = (RecyclerView) view.findViewById(R.id.rv_list);
        LinearLayoutManager manager = new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(manager);
        recyclerView.setAdapter(adapter);

        PopupWindow popupWindow = new PopupWindow(view, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        popupWindow.setTouchable(true);
        popupWindow.setFocusable(true);
        popupWindow.setBackgroundDrawable(new BitmapDrawable());
        popupWindow.setOutsideTouchable(true);

        recyclerView.addOnItemTouchListener(listener);
        return popupWindow;
    }
}
