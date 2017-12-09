package com.hanyu.hysj.weight.passwordkey;

import android.content.Context;
import android.util.AttributeSet;
import android.view.View;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.RelativeLayout;

import com.hanyu.hysj.R;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * 虚拟键盘
 */
public class VirtualKeyboardView extends RelativeLayout {
    Context context;
    //因为就6个输入框不会变了，用数组内存申请固定空间，比List省空间（自己认为）
    private GridView gridView;    //用GrideView布局键盘，其实并不是真正的键盘，只是模拟键盘的功能

    private ArrayList<Map<String, String>> valueList;    //有人可能有疑问，为何这里不用数组了？
    //因为要用Adapter中适配，用数组不能往adapter中填充
    private int currentIndex = -1;    //用于记录当前输入密码格位置

//    private RelativeLayout layoutBack;

    public VirtualKeyboardView(Context context) {
        this(context, null);
    }

    public VirtualKeyboardView(Context context, AttributeSet attrs) {
        super(context, attrs);

        this.context = context;

        View view = View.inflate(context, R.layout.layout_virtual_keyboard, null);

        valueList = new ArrayList<>();

//        layoutBack = (RelativeLayout) view.findViewById(R.id.layoutBack);

        gridView = (GridView) view.findViewById(R.id.gv_keybord);

        initValueList();

        setupView();

        addView(view);      //必须要，不然不显示控件
    }

//    public RelativeLayout getLayoutBack() {
//        return layoutBack;
//    }

    public ArrayList<Map<String, String>> getValueList() {
        return valueList;
    }

    private void initValueList() {

        // 初始化按钮上应该显示的数字
        for (int i = 1; i < 13; i++) {
            Map<String, String> map = new HashMap<>();
            if (i < 10) {
                map.put("name", String.valueOf(i));
            } else if (i == 10) {
                map.put("name", "");
            } else if (i == 11) {
                map.put("name", String.valueOf(0));
            } else if (i == 12) {
                map.put("name", "");
            }
            valueList.add(map);
        }
    }

    public GridView getGridView() {
        return gridView;
    }

    public void setCurrentIndex(int index) {
        this.currentIndex = index;
    }

    public ArrayList<Map<String, String>> getList() {
        return valueList;
    }

    private void setupView() {
        KeyBoardAdapter keyBoardAdapter = new KeyBoardAdapter(context, valueList);
        gridView.setAdapter(keyBoardAdapter);
        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                if (position < 11 && position != 9) {    //点击0~9按钮
                    if (currentIndex >= -1 && currentIndex < 5) {      //判断输入位置————要小心数组越界
                        ++currentIndex;
                        if (mOnClickNumberListener != null) {
                            mOnClickNumberListener.onClickNumber(currentIndex, position);
                        }
                    }
                } else {
                    if (position == 11) {      //点击退格键
                        if (currentIndex - 1 >= -1) {      //判断是否删除完毕————要小心数组越界
                            if (mOnClickNumberListener != null) {
                                mOnClickNumberListener.onClickDelete(currentIndex);
                            }

                            currentIndex--;
                        }
                    }
                }
            }
        });

    }

    private OnClickNumberListener mOnClickNumberListener;

    public void setOnClickNumberListener(OnClickNumberListener onClickNumberListener) {
        mOnClickNumberListener = onClickNumberListener;
    }

    public interface OnClickNumberListener {
        void onClickNumber(int currentIndex, int position);

        void onClickDelete(int currentIndex);

    }
}
